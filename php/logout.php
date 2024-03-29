<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get User Name for Hisotry */
	$request = "SELECT CONCAT(USER_FNAME, ' ', USER_LNAME) AS name FROM USERS WHERE USER_LOGIN = :user LIMIT 1;";
	/* Preparing Statement */
	$statement = $DB_CONNECTION->prepare($request);
	/* Binding Parameter */
	$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
	/* Execute Query */
	$statement->execute();
	/* Fetch Result */
	$result = $statement->fetch();

	$name = $result["name"];

	if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
	{
		/* Add to History */
		/* Preparing Request */
		$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:login, 'DISCONNECT', :user, 'USER', CURRENT_DATE, CURRENT_TIME, :name);";
		/* Preparing Statement */
		$statement = $DB_CONNECTION->prepare($request);
		/* Binding Parameter */
		$statement->bindParam(':login', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
		$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
		$statement->bindParam(':name', $name, PDO::PARAM_STR, 100);
		/* Execute Query */
		$statement->execute();
	}

	/* Empty Sessions */
	$_SESSION["6C3Zq5Bpwm"] == "";
	$_SESSION["Va7FqW6A3e"] == "";
	/* Remove All Session Variables */
	session_unset();
	/* Destroy Session */
	session_destroy();
	/* Close the Connection */
	$DB_CONNECTION = null;
?>