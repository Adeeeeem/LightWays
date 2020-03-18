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

			/* Get Card Name for Hisotry */
			$request = "SELECT CARD_NAME AS name FROM CARDS WHERE CARD_ID = :card LIMIT 1;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':card', $card, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$result = $statement->fetch();

			$name = $result["name"];
			
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

				if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
				{
					/* Add to History */
					/* Preparing Request */
					$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, 'DELETE', :card, 'CARD', CURRENT_DATE, CURRENT_TIME, :name);";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
					$statement->bindParam(':card', $card, PDO::PARAM_STR, 30);
					$statement->bindParam(':name', $name, PDO::PARAM_STR, 100);
					/* Execute Query */
					$statement->execute();
				}
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