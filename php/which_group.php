<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Floor Received ID */
	$device = $_POST["device"];
	/* Avoid any XSS or SQL Injection */
	$device = Security($device);

	if ( isset($device) && !empty($device) )
	{
		if (is_numeric($device))
		{
			/* Preparing Request */
			$request = "SELECT GROUP_ID AS id, GROUP_NAME AS name FROM DEVICES NATURAL JOIN GROUPS WHERE DEVICE_ID = :device LIMIT 1;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':device', $device, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$response = $statement->fetch();
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>