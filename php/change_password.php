<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get User's New Password */
	$password = $_POST["password"];
	/* Avoid any XSS or SQL Injection */
	$password = Security($password);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($password) && !empty($password) )
	{
		if (is_string($password))
		{
			/* Update User's Password */
			/* Preparing Request */
			$request = "UPDATE USERS SET USER_PASSWORD = :password WHERE USER_LOGIN = :login;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':password', $password, PDO::PARAM_STR, 30);
			$statement->bindParam(':login', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
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