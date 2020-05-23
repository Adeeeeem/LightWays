<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Group Received ID */
	$group = $_POST["group"];
	/* Avoid any XSS or SQL Injection */
	$group = Security($group);

	if ( isset($group) && !empty($group) )
	{
		if (is_numeric($group))
		{
			/* Select Group Details and its Related Devices */
			/* Preparing Request */
			$request = "SELECT GROUP_NAME AS name, GROUP_COLOR AS color, GROUPS.ROOM_ID AS room, ROOMS.FLOOR_ID AS floor, DEVICE_ID AS devices FROM GROUPS NATURAL JOIN ROOMS LEFT JOIN DEVICES USING(GROUP_ID) WHERE GROUPS.GROUP_ID = :group;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(":group", $group, PDO::PARAM_INT);
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