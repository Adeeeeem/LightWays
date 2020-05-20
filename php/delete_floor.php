<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");
	require_once("toggleLight.php");

	header("Content-Type: application/json");

	/* Get Floor Received ID */
	$floor = $_POST["floor"];
	/* Avoid any XSS or SQL Injection */
	$floor = Security($floor);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($floor) && !empty($floor) )
	{
		if (is_numeric($floor))
		{
			/* Turn OFF All Floor's Lights */
			/* Preparing Request */
			$request = "SELECT DEVICE_ID AS id, DEVICE_PIN AS pin, ROOM_NAME AS name, CARD_IP AS ip FROM DEVICES NATURAL JOIN ROOMS NATURAL JOIN CARDS WHERE FLOOR_ID = :floor;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$result = $statement->fetchAll();

			foreach($result as $row)
			{
				$pin = $row["pin"];
				$ip = $row["ip"];

				toggleL($pin, 'OFF', $ip);
			}

			/* Preparing Request */
			$request = "UPDATE DEVICES NATURAL JOIN ROOMS SET DEVICE_STATUS = 'OFF' WHERE FLOOR_ID = :floor;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			/* If Devices Status Updated */
			if ($statement->rowCount())
			{
				if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
				{
					/* Add to History */
					foreach($result as $row)
					{
						$pin = $row["pin"];
						$name = $row["name"];
						$option = $pin.":".$name;
						$id = $row["id"];

						/* Preparing Request */
						$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, 'OFF', :id, 'DEVICE', CURRENT_DATE, CURRENT_TIME, :option);";
						/* Preparing Statement */
						$statement = $DB_CONNECTION->prepare($request);
						/* Binding Parameter */
						$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
						$statement->bindParam(':id', $id, PDO::PARAM_STR, 30);
						$statement->bindParam(':option', $option, PDO::PARAM_STR, 100);
						/* Execute Query */
						$statement->execute();
					}
				}
			}

			/* Get Floor Name for Hisotry */
			$request = "SELECT FLOOR_NAME AS name FROM FLOORS WHERE FLOOR_ID = :floor LIMIT 1;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$result = $statement->fetch();

			$name = $result["name"];
				
			/* Delete Floor */
			/* Preparing Request */
			$request = "DELETE FROM FLOORS WHERE FLOOR_ID = :floor;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_INT);
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
					$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, 'DELETE', :floor, 'FLOOR', CURRENT_DATE, CURRENT_TIME, :name);";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
					$statement->bindParam(':floor', $floor, PDO::PARAM_STR, 30);
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