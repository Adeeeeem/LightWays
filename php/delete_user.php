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