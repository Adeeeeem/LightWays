<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT HISTORY_USER AS user, HISTORY_TYPE AS type, HISTORY_DATA_ID AS id, HISTORY_DATA AS data, HISTORY_DATE AS date, HISTORY_TIME AS time, HISTORY_OPTION AS opt FROM HISTORY WHERE HISTORY_BOSS = :user ORDER BY HISTORY_DATE DESC, HISTORY_TIME DESC LIMIT 25;";
	/* Preparing Statement */
	$statement = $DB_CONNECTION->prepare($request);
	/* Binding Parameter */
	$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
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