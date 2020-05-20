<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Contact Email */
	$email = $_POST["email"];
	/* Get Contact Message */
	$message = $_POST["message"];
	/* Avoid any XSS or SQL Injection */
	$email = Security($email);
	$message = Security($message);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($email) && !empty($email) && isset($message) && !empty($message) )
	{
		if ( is_string($email) && is_string($message) )
		{
			/* Get Contact Name */
			/* Preparing Request */
			$request = "SELECT CONCAT(USER_FNAME, ' ', USER_LNAME) AS name FROM USERS WHERE USER_LOGIN = :login;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':login', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$result = $statement->fetch();

			$name = $result["name"];

			$to = "MohamedAdemBenMoussa@gmail.com";

			$subject = "LightWays Client : " . $name;

			$headers =  "MIME-Version: 1.0" . "\r\n"; 
			$headers .= "From: " . $name . " - " . $email . "\r\n";
			$headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";

			$response["result"] = mail($to, $subject, $message, $headers);
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>