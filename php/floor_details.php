<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Floor Received ID */
	$floor = $_POST["floor"];
	/* Avoid any XSS or SQL Injection */
	$floor = Security($floor);

	if ( isset($floor) && !empty($floor) )
	{
		if (is_numeric($floor))
		{
			/* Select Floor Details and its Related Rooms, Devices, Groups */
			/* Preparing Request */
			$request = "SELECT FLOORS.FLOOR_ID as id, FLOOR_NAME as floor, (SELECT COUNT(ROOM_ID) FROM ROOMS WHERE FLOOR_ID = id) AS rooms, (SELECT COUNT(DEVICE_ID) FROM ROOMS NATURAL JOIN DEVICES WHERE ROOMS.FLOOR_ID = id) AS devices, (SELECT COUNT(GROUP_ID) FROM ROOMS NATURAL JOIN GROUPS WHERE ROOMS.FLOOR_ID = id) AS groups, ROOMS.ROOM_ID AS roomid, ROOM_NAME AS roomname, (SELECT COUNT(DEVICE_ID) FROM ROOMS LEFT JOIN DEVICES ON ROOMS.ROOM_ID = DEVICES.ROOM_ID WHERE DEVICES.ROOM_ID = roomid) AS roomdevices, (SELECT COUNT(GROUP_ID) FROM ROOMS LEFT JOIN GROUPS ON ROOMS.ROOM_ID = GROUPS.ROOM_ID WHERE GROUPS.ROOM_ID = roomid) AS roomgroups, GROUPS.GROUP_ID AS groupid, GROUP_NAME AS groupname, (SELECT COUNT(DEVICE_ID) FROM GROUPS LEFT JOIN DEVICES ON GROUPS.GROUP_ID = DEVICES.GROUP_ID WHERE DEVICES.GROUP_ID = groupid) AS groupdevices FROM ROOMS RIGHT JOIN FLOORS ON FLOORS.FLOOR_ID = ROOMS.FLOOR_ID LEFT JOIN GROUPS ON GROUPS.ROOM_ID = ROOMS.ROOM_ID WHERE FLOORS.FLOOR_ID = :floor GROUP BY ROOMS.ROOM_ID, GROUPS.GROUP_ID;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(":floor", $floor, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$response = $statement->fetchAll();
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>