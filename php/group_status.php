<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");
	require_once("toggleLight.php");

	header("Content-Type: application/json");

	/* Get Group Received ID */
	$group = $_POST["group"];
	/* Get Group STATUS */
	$status = $_POST["status"];
	/* Avoid any XSS or SQL Injection */
	$group = Security($group);
	$status = Security($status);
	/* Set Check to True */
	$check = "true";

	if ( isset($group) && !empty($group) && isset($status) && !empty($status) )
	{
		if ( (is_numeric($group)) && ( ($status == "ON") || ($status == "OFF") ) )
		{
			$request = "SELECT DEVICE_ID AS id, DEVICE_PIN AS pin, GROUP_NAME AS name, CARD_IP AS ip FROM DEVICES NATURAL JOIN GROUPS NATURAL JOIN CARDS WHERE GROUP_ID = :group;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':group', $group, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$result = $statement->fetchAll();

			foreach ($result as $row)
			{
				$pin = $row["pin"];
				$ip = $row["ip"];

				$check = toggleL($pin, $status, $ip);
			}

			if ($check == "true")
			{
				if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
				{
					/* Add to History */
					foreach($result as $row)
					{
						$pin = $row["pin"];
						$name = $row["name"];
						$option = "G".$pin.":".$name;
						$id = $row["id"];

						/* Change Devices Status */
						/* Preparing Request */
						$request = "UPDATE DEVICES SET DEVICE_STATUS = :status WHERE DEVICE_ID = :id AND GROUP_ID = :group;";
						/* Preparing Statement */
						$statement = $DB_CONNECTION->prepare($request);
						/* Binding Parameter */
						$statement->bindParam(':group', $group, PDO::PARAM_INT);
						$statement->bindParam(':id', $id, PDO::PARAM_INT);
						$statement->bindParam(':status', $status, PDO::PARAM_STR, 3);
						/* Execute Query */
						$statement->execute();

						/* If Devices Status Updated */
						if ($statement->rowCount())
						{
							/* Preparing Request */
							$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, :status, :id, 'DEVICE', CURRENT_DATE, CURRENT_TIME, :option);";
							/* Preparing Statement */
							$statement = $DB_CONNECTION->prepare($request);
							/* Binding Parameter */
							$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
							$statement->bindParam(':id', $id, PDO::PARAM_STR, 30);
							$statement->bindParam(':status', $status, PDO::PARAM_STR, 3);
							$statement->bindParam(':option', $option, PDO::PARAM_STR, 100);
							/* Execute Query */
							$statement->execute();
						}
					}
				}

				/* Change Group Status */
				/* Preparing Request */
				$request = "UPDATE GROUPS SET GROUP_STATUS = :status WHERE GROUP_ID = :group;";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':group', $group, PDO::PARAM_INT);
				$statement->bindParam(':status', $status, PDO::PARAM_STR, 3);
				/* Execute Query */
				$statement->execute();

				/* Get Card Name for Hisotry */
				$request = "SELECT GROUP_NAME AS name, ROOM_NAME AS room FROM GROUPS NATURAL JOIN ROOMS WHERE GROUP_ID = :group LIMIT 1;";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':group', $group, PDO::PARAM_INT);
				/* Execute Query */
				$statement->execute();
				/* Fetch Result */
				$result = $statement->fetch();

				$name = $result["name"];
				$room = $result["room"];
				$option = $name.":".$room;

				/* Return Updated Devices */
				/* Preparing Request */
				$request = "SELECT DEVICE_ID AS id, GROUP_COLOR AS color FROM DEVICES NATURAL JOIN GROUPS WHERE GROUP_ID = :group;";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':group', $group, PDO::PARAM_INT);
				/* Execute Query */
				$statement->execute();
				/* Fetch Result */
				$response = $statement->fetchAll();

				if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
				{
					/* Add to History */
					/* Preparing Request */
					$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, :status, :group, 'GROUP', CURRENT_DATE, CURRENT_TIME, :option);";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
					$statement->bindParam(':status', $status, PDO::PARAM_STR, 3);
					$statement->bindParam(':group', $group, PDO::PARAM_STR, 30);
					$statement->bindParam(':option', $option, PDO::PARAM_STR, 100);
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
