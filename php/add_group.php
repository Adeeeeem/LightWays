<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Group NAME */
	$group = $_POST["group"];
	/* Get Group COLOR */
	$color = $_POST["color"];
	/* Get Group's Room */
	$room = $_POST["room"];
	/* Get Devices Array */
	$devices = json_decode(stripslashes($_POST["devices"]));
	/* Avoid any XSS or SQL Injection */
	$group = Security($group);
	$color = Security($color);
	$room = Security($room);

	if ( isset($group) && !empty($group) && isset($color) && !empty($color) && isset($room) && !empty($room) )
	{
		if ( (is_string($group)) && (is_string($color)) && (is_numeric($room)) )
		{
			/* Insert New Group */
			/* Preparing Request */
			$request = "INSERT INTO GROUPS (GROUP_NAME, GROUP_COLOR, GROUP_STATUS, ROOM_ID) VALUES (:group, :color, 'OFF', :room);";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':group', $group, PDO::PARAM_STR, 30);
			$statement->bindParam(':color', $color, PDO::PARAM_STR, 7);
			$statement->bindParam(':room', $room, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount()) // If Group Added Successfully, Add Devices to it
			{
				/* Get Last Added Group ID */
				$id = $DB_CONNECTION->lastInsertId();

				/* Go Through Each Device Selected */
				foreach ($devices as $device)
				{
					/* Add Device to Group */
					/* Preparing Request */
					$request = "UPDATE DEVICES SET GROUP_ID = :group WHERE DEVICE_ID = :device;";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':group', $id, PDO::PARAM_INT);
					$statement->bindParam(':device', $device, PDO::PARAM_INT);
					/* Execute Query */
					$statement->execute();
				}

				/* Return Added Group */
				/* Preparing Request */
				$request = "SELECT GROUPS.GROUP_ID AS id, GROUP_NAME AS name, GROUP_COLOR AS color, GROUP_STATUS AS status, COUNT(DEVICES.GROUP_ID) AS devices, GROUPS.ROOM_ID AS room FROM GROUPS LEFT JOIN DEVICES ON GROUPS.GROUP_ID = DEVICES.GROUP_ID WHERE GROUPS.GROUP_ID = $id GROUP BY GROUPS.GROUP_ID, GROUP_NAME, GROUP_COLOR, GROUP_STATUS LIMIT 1;";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Execute Query */
				$statement->execute();
				/* Fetch Result */
				$response = $statement->fetch();

				if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
				{
					/* Add to History */
					/* Preparing Request */
					$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, 'ADD', :group, 'GROUP', CURRENT_DATE, CURRENT_TIME, :name);";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
					$statement->bindParam(':group', $id, PDO::PARAM_STR, 30);
					$statement->bindParam(':name', $group, PDO::PARAM_STR, 100);
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