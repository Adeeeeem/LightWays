<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Card Received ID */
	$card = $_POST["card"];
	/* Get Card Received NAME */
	$name = $_POST["name"];
	/* Get Card Received IP */
	$ip = $_POST["ip"];
	/* Avoid any XSS or SQL Injection */
	$card = Security($card);
	$name = Security($name);
	$ip = Security($ip);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($card) && !empty($card) && isset($name) && !empty($name) && isset($ip) && !empty($ip) )
	{
		if ( (is_numeric($card)) && (is_string($name)) && (is_string($ip)) )
		{
			/* Update Card */
			/* Preparing Request */
			$request = "UPDATE CARDS SET CARD_NAME = :name, CARD_IP = :ip WHERE CARD_ID = :card;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':card', $card, PDO::PARAM_INT);
			$statement->bindParam(':name', $name, PDO::PARAM_STR, 30);
			$statement->bindParam(':ip', $ip, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			/* Return True */
			$response["result"] = true;
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>