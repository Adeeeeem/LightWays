<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT GROUPS.GROUP_ID AS id, GROUP_NAME AS name, GROUP_STATUS AS status, COUNT(DEVICES.DEVICE_ID) AS devices FROM GROUPS LEFT JOIN DEVICES ON GROUPS.GROUP_ID = DEVICES.GROUP_ID GROUP BY GROUPS.GROUP_ID, GROUP_NAME, GROUP_STATUS ORDER BY GROUPS.GROUP_ID DESC;";
	/* Preparing Statement */
	$statement = $DB_CONNECTION->prepare($request);
	/* Execute Query */
	$statement->execute();
	/* Fetch Result */
	$response = $statement->fetchAll();
	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>