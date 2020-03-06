<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Floor Received ID */
	$floor = $_POST["floor"];
	/* Avoid any XSS or SQL Injection */
	$floor = Security($floor);

	/* Return False for Error */
	$response = array("result" => true);

	if ( isset($floor) && !empty($floor) )
	{
		if (is_numeric($floor))
		{
			/* Turn OFF All Floor's Lights */
			/* Preparing Request */
			$request = "UPDATE DEVICES NATURAL JOIN ROOMS SET DEVICE_STATUS = 'OFF' WHERE FLOOR_ID = :floor;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			
			/* Delete Floor */
			/* Preparing Request */
			$request = "DELETE FROM FLOORS WHERE FLOOR_ID = :floor;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			/* If Floor Deleted */
			if ($statement->rowCount())
			{
				/* Return True */
				$response["result"] = true;
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