<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get User Received LOGIN */
	$login = $_POST["login"];
	/* Avoid any XSS or SQL Injection */
	$login = Security($login);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($login) && !empty($login) )
	{
		if (is_string($login))
		{
			/* Get User Name for Hisotry */
			$request = "SELECT CONCAT(USER_FNAME, ' ', USER_LNAME) AS name FROM USERS WHERE USER_LOGIN = :login LIMIT 1;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':login', $login, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$result = $statement->fetch();

			$name = $result["name"];

			/* Delete User */
			/* Preparing Request */
			$request = "DELETE FROM USERS WHERE USER_LOGIN = :login;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':login', $login, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			/* If User Deleted */
			if ($statement->rowCount())
			{
				/* Return True */
				$response["result"] = true;

				/* Add to History */
				/* Preparing Request */
				$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION, HISTORY_BOSS) VALUES (:user, 'DELETE', :login, 'USER', CURRENT_DATE, CURRENT_TIME, :name, :boss);";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
				$statement->bindParam(':login', $login, PDO::PARAM_STR, 30);
				$statement->bindParam(':name', $name, PDO::PARAM_STR, 100);
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