<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get User Received LOGIN */
	$login = $_POST["login"];
	/* Avoid any XSS or SQL Injection */
	$login = Security($login);

	if ( isset($login) && !empty($login) )
	{
		if (is_string($login))
		{
			/* Select User Details and its Related Permissions */
			/* Preparing Request */
			$request = "SELECT USERS.USER_LOGIN AS login, USER_PASSWORD AS password, USER_FNAME AS fname, USER_LNAME as lname, PERMISSION_ID AS permission, PERMISSION_TYPE AS type FROM USERS LEFT JOIN PERMISSIONS ON USERS.USER_LOGIN = PERMISSIONS.USER_LOGIN WHERE USERS.USER_LOGIN = :login;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(":login", $login, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$response = $statement->fetchAll();
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>