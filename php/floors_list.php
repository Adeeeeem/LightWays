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
	$request = "SELECT FLOORS.FLOOR_ID AS id, FLOOR_NAME AS floor, COUNT(ROOMS.ROOM_ID) AS rooms, (SELECT COUNT(DEVICE_ID) FROM ROOMS NATURAL JOIN DEVICES WHERE ROOMS.FLOOR_ID = id) AS devices, (SELECT COUNT(GROUP_ID) FROM ROOMS NATURAL JOIN GROUPS WHERE ROOMS.FLOOR_ID = id) AS groups FROM ROOMS RIGHT JOIN FLOORS ON ROOMS.FLOOR_ID = FLOORS.FLOOR_ID GROUP BY FLOORS.FLOOR_ID;";
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