<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Room NAME */
	$name = $_POST["name"];
	/* Get Room WIDTH */
	$width = $_POST["width"];
	/* Get Room HEIGHT */
	$height = $_POST["height"];
	/* Get Room's Floor */
	$floor = $_POST["floor"];
	/* Get Devices Coords Array */
	$device_coords = json_decode(stripslashes($_POST["devices_coords"]));
	/* Get Devices Type Array */
	$device_type = json_decode(stripslashes($_POST["devices_type"]));
	/* Get Devices Card Array */
	$device_card = json_decode(stripslashes($_POST["devices_card"]));
	/* Get Devices Pin Array */
	$device_pin = json_decode(stripslashes($_POST["devices_pin"]));
	/* Avoid any XSS or SQL Injection */
	$name = Security($name);
	$width = Security($width);
	$height = Security($height);
	$floor = Security($floor);

	if ( isset($name) && !empty($name) && isset($width) && !empty($width) && isset($height) && !empty($height) && isset($floor) && !empty($floor) )
	{
		if ( (is_string($name)) && (is_numeric($width)) && (is_numeric($height)) && (is_numeric($floor)) )
		{
			/* Insert New Room */
			/* Preparing Request */
			$request = "INSERT INTO ROOMS (ROOM_NAME, ROOM_WIDTH, ROOM_HEIGHT, FLOOR_ID) VALUES (:name, :width, :height, :floor);";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':name', $name, PDO::PARAM_STR, 30);
			$statement->bindParam(':width', $width, PDO::PARAM_INT);
			$statement->bindParam(':height', $height, PDO::PARAM_INT);
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount()) // If Room Added Successfully, Add Devices to it
			{
				/* Get Last Added Room ID */
				$room = $DB_CONNECTION->lastInsertId();

				/* Go Through Each Device Selected */
				for ($i = 0; $i < count($device_coords); $i++)
				{
					$lin = substr($device_coords[$i], 0, strrpos($device_coords[$i], "-", 0)); // Get Device Line
					$col = substr($device_coords[$i], strrpos($device_coords[$i], "-", 0) + 1, strlen($device_coords[$i])); // Get Device Column

					/* Add Device to Room */
					$request = "INSERT INTO DEVICES (DEVICE_PIN, DEVICE_TYPE, DEVICE_LINE, DEVICE_COLUMN, DEVICE_STATUS, CARD_ID, ROOM_ID) VALUES (:pin, :type, :lin, :col, 'OFF', :card, :room);";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':pin', $device_pin[$i], PDO::PARAM_INT);
					$statement->bindParam(':type', $device_type[$i], PDO::PARAM_STR, 20);
					$statement->bindParam(':lin', $lin, PDO::PARAM_INT);
					$statement->bindParam(':col', $col, PDO::PARAM_INT);
					$statement->bindParam(':card', $device_card[$i], PDO::PARAM_INT);
					$statement->bindParam(':room', $room, PDO::PARAM_INT);
					/* Execute Query */
					$statement->execute();
				}

				/* Return Added Room */
				/* Preparing Request */
				$request = "SELECT ROOMS.ROOM_ID AS id, ROOM_NAME AS name, COUNT(DEVICES.DEVICE_ID) AS devices, (SELECT COUNT(GROUP_ID) FROM ROOMS LEFT JOIN GROUPS ON ROOMS.ROOM_ID = GROUPS.ROOM_ID WHERE GROUPS.ROOM_ID = id) AS groups FROM ROOMS LEFT JOIN DEVICES ON DEVICES.ROOM_ID = ROOMS.ROOM_ID WHERE ROOMS.ROOM_ID = $room LIMIT 1;";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Execute Query */
				$statement->execute();
				/* Fetch Result */
				$response = $statement->fetch();

				/* Add to History */
				/* Preparing Request */
				$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION, HISTORY_BOSS) VALUES (:user, 'ADD', :room, 'ROOM', CURRENT_DATE, CURRENT_TIME, :name, :boss);";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
				$statement->bindParam(':room', $room, PDO::PARAM_STR, 30);
				$statement->bindParam(':name', $name, PDO::PARAM_STR, 100);
				$statement->bindParam(':boss', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
				/* Execute Query */
				$statement->execute();
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