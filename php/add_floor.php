<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Floor NAME */
	$floor = $_POST["floor"];
	/* Avoid any XSS or SQL Injection */
	$floor = Security($floor);

	if ( isset($floor) && !empty($floor) )
	{
		if (is_string($floor))
		{
			/* Insert New Floor */
			/* Preparing Request */
			$request = "INSERT INTO FLOORS (FLOOR_NAME, USER_LOGIN) VALUES (:floor, :user);";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':floor', $floor, PDO::PARAM_STR, 30);
			$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount()) // If Floor Added Successfully, Add Devices to it
			{
				/* Get Last Added Floor ID */
				$id = $DB_CONNECTION->lastInsertId();

				$response = array("floor" => $id, "name" => $floor);

				/* Add to History */
				/* Preparing Request */
				$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION, HISTORY_BOSS) VALUES (:user, 'ADD', :floor, 'FLOOR', CURRENT_DATE, CURRENT_TIME, :name, :boss);";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
				$statement->bindParam(':floor', $id, PDO::PARAM_STR, 30);
				$statement->bindParam(':name', $floor, PDO::PARAM_STR, 100);
				$statement->bindParam(':boss', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
				/* Execute Query */
				$statement->execute();
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