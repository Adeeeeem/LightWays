<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT CARDS.CARD_ID AS id, CARD_NAME AS name, CARD_IP AS ip, COUNT(DEVICE_ID) AS devices FROM CARDS LEFT JOIN DEVICES ON CARDS.CARD_ID = DEVICES.CARD_ID WHERE USER_LOGIN = :user GROUP BY CARDS.CARD_ID;";
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