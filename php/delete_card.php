<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Card Received ID */
	$card = $_POST["card"];
	/* Avoid any XSS or SQL Injection */
	$card = Security($card);

	/* Return False for Error */
	$response = array("result" => true);

	if ( isset($card) && !empty($card) )
	{
		if (is_numeric($card))
		{
			/* Turn OFF All Card's Lights */
			/* Preparing Request */
			$request = "UPDATE DEVICES SET DEVICE_STATUS = 'OFF' WHERE CARD_ID = :card;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':card', $card, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			
			/* Delete Floor */
			/* Preparing Request */
			$request = "DELETE FROM CARDS WHERE CARD_ID = :card;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':card', $card, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			/* If Floor Deleted */
			if ($statement->rowCount())
			{
				/* Return True */
				$response["result"] = true;
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