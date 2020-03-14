<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Card Received ID */
	$card = $_POST["card"];
	/* Avoid any XSS or SQL Injection */
	$card = Security($card);

	if ( isset($card) && !empty($card) )
	{
		if (is_numeric($card))
		{
			/* Select Card Details and its Related Rooms, Devices, Groups */
			/* Preparing Request */
			$request = "SELECT CARD_NAME AS name, CARD_IP AS ip, COUNT(DEVICE_ID) AS devices FROM CARDS LEFT JOIN DEVICES ON CARDS.CARD_ID = DEVICES.CARD_ID WHERE CARDS.CARD_ID = :card LIMIT 1;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(":card", $card, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$response = $statement->fetch();
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>