<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Group Received ID */
	$group = $_POST["group"];
	/* Get Group Received NAME */
	$name = $_POST["name"];
	/* Get Group COLOR */
	$color = $_POST["color"];
	/* Get Group ROOM */
	$room = $_POST["room"];
	/* Get Devices Array */
	$devices = json_decode(stripslashes($_POST["devices"]));
	/* Avoid any XSS or SQL Injection */
	$group = Security($group);
	$name = Security($name);
	$color = Security($color);
	$room = Security($room);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($group) && !empty($group) && isset($name) && !empty($name) && isset($color) && !empty($color) && isset($room) && !empty($room) )
	{
		if ( (is_numeric($group)) && (is_string($name)) && (is_string($color)) && (is_numeric($room)) )
		{
			/* Update Group */
			/* Preparing Request */
			$request = "UPDATE GROUPS SET GROUP_NAME = :name, GROUP_COLOR = :color, ROOM_ID = :room WHERE GROUP_ID = :group;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':group', $group, PDO::PARAM_INT);
			$statement->bindParam(':name', $name, PDO::PARAM_STR, 30);
			$statement->bindParam(':color', $color, PDO::PARAM_STR, 7);
			$statement->bindParam(':room', $room, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			/* Delete Devices From Group */
			/* Preparing Request */
			$request = "UPDATE DEVICES SET GROUP_ID = NULL WHERE GROUP_ID = :group;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':group', $group, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			/* Go Through Each Device Selected */
			foreach ($devices as $device)
			{
				/* Add Device to Group */
				/* Preparing Request */
				$request = "UPDATE DEVICES SET GROUP_ID = :group WHERE DEVICE_ID = :device;";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':group', $group, PDO::PARAM_INT);
				$statement->bindParam(':device', $device, PDO::PARAM_INT);
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