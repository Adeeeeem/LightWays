<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Room Received ID */
	$room = $_POST["room"];
	/* Avoid any XSS or SQL Injection */
	$room = Security($room);

	/* Return False for Error */
	$response = array("result" => true);

	if ( isset($room) && !empty($room) )
	{
		if (is_numeric($room))
		{
			/* Turn OFF All Room's Lights */
			/* Preparing Request */
			$request = "UPDATE DEVICES NATURAL JOIN ROOMS SET DEVICE_STATUS = 'OFF' WHERE ROOM_ID = :room;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':room', $room, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			
			/* Delete Room */
			/* Preparing Request */
			$request = "DELETE FROM ROOMS WHERE ROOM_ID = :room;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':room', $room, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			/* If Room Deleted */
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