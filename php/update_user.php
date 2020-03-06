<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get User First Name */
	$fname = $_POST["fname"];
	/* Get User Last Name */
	$lname = $_POST["lname"];
	/* Avoid any XSS or SQL Injection */
	$fname = Security($fname);
	$lname = Security($lname);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($fname) && !empty($fname) && isset($lname) && !empty($lname) )
	{
		if ( (is_string($fname)) && (is_string($lname)) )
		{
			/* Update User Name */
			/* Preparing Request */
			$request = "UPDATE USERS SET USER_FNAME = :fname, USER_LNAME = :lname WHERE USER_LOGIN = :login;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':fname', $fname, PDO::PARAM_STR, 30);
			$statement->bindParam(':lname', $lname, PDO::PARAM_STR, 30);
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