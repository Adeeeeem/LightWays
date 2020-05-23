<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT FLOORS.FLOOR_ID as floorid, FLOOR_NAME as floor, (SELECT COUNT(ROOM_ID) FROM ROOMS WHERE FLOOR_ID = floorid) AS rooms, ROOMS.ROOM_ID AS roomid, ROOM_NAME AS room, COUNT(DEVICES.DEVICE_ID) AS devices, (SELECT COUNT(GROUP_ID) FROM ROOMS LEFT JOIN GROUPS USING(ROOM_ID) WHERE GROUPS.ROOM_ID = roomid) AS groups FROM ROOMS LEFT JOIN DEVICES USING(ROOM_ID) RIGHT JOIN FLOORS USING(FLOOR_ID) GROUP BY ROOMS.ROOM_ID, FLOORS.FLOOR_ID ORDER BY FLOORS.FLOOR_ID, ROOMS.ROOM_ID;";
	/* Preparing Statement */
	$statement = $DB_CONNECTION->prepare($request);
	/* Execute Query */
	$statement->execute();
	/* Fetch Result */
	$response = $statement->fetchAll();
	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>