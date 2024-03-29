<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Room Received ID */
	$room = $_POST["room"];
	/* Avoid any XSS or SQL Injection */
	$room = Security($room);

	if ( isset($room) && !empty($room) )
	{
		if (is_numeric($room))
		{
			/* Select Room Details and its Related Devices, Groups */
			/* Preparing Request */
			$request = "SELECT FLOOR_ID AS floor, ROOMS.ROOM_ID AS room, ROOM_NAME AS name, ROOM_WIDTH AS width, ROOM_HEIGHT AS height, DEVICE_ID AS device, DEVICE_PIN as pin, DEVICE_TYPE AS type, DEVICE_POWER AS power, CARD_ID AS card, DEVICE_LINE AS lin, DEVICE_COLUMN AS col, (SELECT GROUP_COLOR FROM GROUPS NATURAL JOIN DEVICES WHERE DEVICE_ID = device) AS color FROM ROOMS LEFT JOIN DEVICES USING(ROOM_ID) WHERE ROOMS.ROOM_ID = :room;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(":room", $room, PDO::PARAM_INT);
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