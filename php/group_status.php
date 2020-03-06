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
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>