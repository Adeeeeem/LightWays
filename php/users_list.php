<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT USER_LOGIN AS username, CONCAT(USER_FNAME, ' ', USER_LNAME) AS name, USER_TYPE AS type FROM USERS WHERE USER_TYPE = 'USER' ORDER BY USER_FNAME, USER_LNAME;";
	/* Preparing Statement */
	$statement = $DB_CONNECTION->prepare($request);
	/* Execute Query */
	$statement->execute();
	/* Fetch Result */
	$response = $statement->fetchAll();
	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>