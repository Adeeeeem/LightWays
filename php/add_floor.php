<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Floor NAME */
	$floor = $_POST["floor"];
	/* Avoid any XSS or SQL Injection */
	$floor = Security($floor);

	if ( isset($floor) && !empty($floor) )
	{
		if (is_string($floor))
		{
			/* Insert New Floor */
			/* Preparing Request */
			$request = "INSERT INTO FLOORS (FLOOR_NAME) VALUES (:floor);";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount()) // If Floor Added Successfully, Add Devices to it
			{
				/* Get Last Added Floor ID */
				$id = $DB_CONNECTION->lastInsertId();

				$response = array("floor" => $id, "name" => $floor);
			}
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>