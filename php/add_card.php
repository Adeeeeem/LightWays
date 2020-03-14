<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Card NAME */
	$card = $_POST["card"];
	/* Get Card IP */
	$ip = $_POST["ip"];
	/* Avoid any XSS or SQL Injection */
	$card = Security($card);
	$ip = Security($ip);

	if ( isset($card) && !empty($card) && isset($ip) && !empty($ip) )
	{
		if ( is_string($card) && is_string($ip) )
		{
			/* Insert New Card */
			/* Preparing Request */
			$request = "INSERT INTO CARDS (CARD_NAME, CARD_IP, USER_LOGIN) VALUES (:card, :ip, :user);";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':card', $card, PDO::PARAM_STR, 30);
			$statement->bindParam(':ip', $ip, PDO::PARAM_STR, 30);
			$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount()) // If Card Added Successfully, Add Devices to it
			{
				/* Get Last Added Card ID */
				$id = $DB_CONNECTION->lastInsertId();

				$response = array("card" => $id, "name" => $card);
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