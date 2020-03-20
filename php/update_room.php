<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Room ID */
	$room = $_POST["room"];
	/* Get Room NAME */
	$name = $_POST["name"];
	/* Get Room's Floor */
	$floor = $_POST["floor"];
	/* Get Devices ID Array */
	$devices_id = json_decode(stripslashes($_POST["devices_id"]));
	/* Get Devices Type Array */
	$device_type = json_decode(stripslashes($_POST["devices_type"]));
	/* Get Devices Card Array */
	$device_card = json_decode(stripslashes($_POST["devices_card"]));
	/* Get Devices Pin Array */
	$device_pin = json_decode(stripslashes($_POST["devices_pin"]));
	/* Avoid any XSS or SQL Injection */
	$room = Security($room);
	$name = Security($name);
	$floor = Security($floor);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($room) && !empty($room) && isset($name) && !empty($name) && isset($floor) && !empty($floor) )
	{
		if ( (is_numeric($room)) && (is_string($name)) && (is_numeric($floor)) )
		{
			/* Update Room */
			/* Preparing Request */
			$request = "UPDATE ROOMS SET ROOM_NAME = :name, FLOOR_ID = :floor WHERE ROOM_ID = :room;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':name', $name, PDO::PARAM_STR, 30);
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
			$statement->bindParam(':room', $room, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			/* Go Through Each Device Selected */
			for ($i = 0; $i < count($devices_id); $i++)
			{
				/* Update Device in Room */
				$request = "UPDATE DEVICES SET DEVICE_PIN = :pin, DEVICE_TYPE = :type, CARD_ID = :card WHERE DEVICE_ID = :id;";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':pin', $device_pin[$i], PDO::PARAM_INT);
				$statement->bindParam(':type', $device_type[$i], PDO::PARAM_STR, 20);
				$statement->bindParam(':card', $device_card[$i], PDO::PARAM_INT);
				$statement->bindParam(':id', $devices_id[$i], PDO::PARAM_INT);
				/* Execute Query */
				$statement->execute();
			}

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