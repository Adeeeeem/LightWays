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