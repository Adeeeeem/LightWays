<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get User's Password */
	/* Preparing Request */
	$request = "SELECT USER_PASSWORD AS pw FROM USERS WHERE USER_LOGIN = :login;";
	/* Preparing Statement */
	$statement = $DB_CONNECTION->prepare($request);
	/* Binding Parameter */
	$statement->bindParam(':login', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
	/* Execute Query */
	$statement->execute();
	/* Fetch Result */
	$response = $statement->fetch();
	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>