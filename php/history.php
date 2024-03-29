<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT HISTORY_USER AS user, HISTORY_TYPE AS type, HISTORY_DATA_ID AS id, HISTORY_DATA AS data, HISTORY_DATE AS date, HISTORY_TIME AS time, HISTORY_OPTION AS opt FROM HISTORY WHERE HISTORY_DATE = (SELECT MAX(HISTORY_DATE) FROM HISTORY) AND HISTORY_USER != 'SYSTEM' ORDER BY HISTORY_DATE DESC, HISTORY_TIME DESC;";
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