<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Device Received ID */
	$device = $_POST["device"];
	/* Get Device Received STATUS */
	$status = $_POST["status"];
	/* Avoid any XSS or SQL Injection */
	$device = Security($device);
	$status = Security($status);

	/* Return False for Error */
	$response = array("result" => false);

	if ($status == "ON")
		$status = "OFF";
	else
		$status = "ON";

	if ( isset($device) && !empty($device) && isset($status) && !empty($status) )
	{
		if ( (is_numeric($device)) && (is_string($status)) )
		{
			/* Preparing Request */
			$request = "UPDATE DEVICES SET DEVICE_STATUS = :status WHERE DEVICE_ID = :device;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':device', $device, PDO::PARAM_INT);
			$statement->bindParam(':status', $status, PDO::PARAM_STR, 3);
			/* Execute Query */
			$statement->execute();

			/* If Device Status Updated */
			if ($statement->rowCount())
			{
				/* Return True */
				$response["result"] = true;

				/* Get User Name for Hisotry */
				$request = "SELECT ROOM_NAME AS name FROM DEVICES NATURAL JOIN ROOMS WHERE DEVICE_ID = :device LIMIT 1;";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':device', $device, PDO::PARAM_INT);
				/* Execute Query */
				$statement->execute();
				/* Fetch Result */
				$result = $statement->fetch();

				$name = $result["name"];

				if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
				{
					/* Add to History */
					/* Preparing Request */
					$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, :status, :device, 'DEVICE', CURRENT_DATE, CURRENT_TIME, :name);";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
					$statement->bindParam(':status', $status, PDO::PARAM_STR, 3);
					$statement->bindParam(':device', $device, PDO::PARAM_STR, 30);
					$statement->bindParam(':name', $name, PDO::PARAM_STR, 100);
					/* Execute Query */
					$statement->execute();
				}
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