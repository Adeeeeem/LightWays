<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	$sunday = date("Y-m-d", strtotime("last sunday"));
	$saturday = date("Y-m-d", strtotime("saturday this week"));

	/* Preparing Request */
	$request = "SELECT HISTORY_TYPE AS type, HISTORY_DATA_ID AS id, HISTORY_DATA AS data, HISTORY_DATE AS date, HISTORY_TIME AS time FROM HISTORY WHERE HISTORY_TYPE IN ('ON', 'OFF') AND HISTORY_DATA = 'DEVICE' AND HISTORY_DATE BETWEEN '$sunday' AND '$saturday';";
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