<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Group Received ID */
	$floor = $_POST["floor"];
	/* Get Group Received NAME */
	$name = $_POST["name"];
	/* Avoid any XSS or SQL Injection */
	$floor = Security($floor);
	$name = Security($name);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($floor) && !empty($floor) && isset($name) && !empty($name) )
	{
		if ( (is_numeric($floor)) && (is_string($name)) )
		{
			/* Update Group */
			/* Preparing Request */
			$request = "UPDATE FLOORS SET FLOOR_NAME = :name WHERE FLOOR_ID = :floor;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
			$statement->bindParam(':name', $name, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			/* Return True */
			$response["result"] = true;
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>