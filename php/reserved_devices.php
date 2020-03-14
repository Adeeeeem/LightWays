<?php
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
			/* Preparing Request */
			$request = "SELECT DEVICE_ID AS id, GROUP_COLOR AS color FROM DEVICES NATURAL JOIN GROUPS WHERE ROOM_ID = :room;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':room', $room, PDO::PARAM_INT);
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