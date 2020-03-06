<?php
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
			/* Preparing Request */
			$request = "SELECT ROOM_ID AS id, ROOM_NAME AS name FROM ROOMS NATURAL JOIN FLOORS WHERE FLOOR_ID = :floor;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
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