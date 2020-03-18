<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Group Received ID */
	$group = $_POST["group"];
	/* Get Group STATUS */
	$status = $_POST["status"];
	/* Avoid any XSS or SQL Injection */
	$group = Security($group);
	$status = Security($status);

	if ( isset($group) && !empty($group) && isset($status) && !empty($status) )
	{
		if ( (is_numeric($group)) && ( ($status == "ON") || ($status == "OFF") ) )
		{
			/* Change Devices Status */
			/* Preparing Request */
			$request = "UPDATE DEVICES SET DEVICE_STATUS = :status WHERE GROUP_ID = :group;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':group', $group, PDO::PARAM_INT);
			$statement->bindParam(':status', $status, PDO::PARAM_STR, 3);
			/* Execute Query */
			$statement->execute();

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
			$request = "SELECT GROUP_NAME AS name FROM GROUPS WHERE GROUP_ID = :group LIMIT 1;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':group', $group, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$result = $statement->fetch();

			$name = $result["name"];

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
				$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, :status, :group, 'GROUP', CURRENT_DATE, CURRENT_TIME, :name);";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
				$statement->bindParam(':status', $status, PDO::PARAM_STR, 3);
				$statement->bindParam(':group', $group, PDO::PARAM_STR, 30);
				$statement->bindParam(':name', $name, PDO::PARAM_STR, 100);
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