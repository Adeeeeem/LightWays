<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get User Old LOGIN */
	$old_login = $_POST["old_login"];
	/* Get User LOGIN */
	$login = $_POST["login"];
	/* Get User PASSWORD */
	$password = $_POST["password"];
	/* Get User FIRST NAME */
	$fname = $_POST["fname"];
	/* Get User LAST NAME */
	$lname = $_POST["lname"];
	/* Get Permissions Array */
	$permissions_devices = json_decode(stripslashes($_POST["permissions_devices"]));
	/* Get Permissions Type Array */
	$permissions_types = json_decode(stripslashes($_POST["permissions_types"]));
	/* Avoid any XSS or SQL Injection */
	$old_login = Security($old_login);
	$login = Security($login);
	$password = Security($password);
	$fname = Security($fname);
	$lname = Security($lname);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($old_login) && !empty($old_login) && isset($login) && !empty($login) && isset($password) && !empty($password) && isset($fname) && !empty($fname) && isset($lname) && !empty($lname) )
	{
		if ( (is_string($old_login)) && (is_string($login)) && (is_string($password)) && (is_string($fname)) && (is_string($lname)) )
		{
			/* Update User */
			/* Preparing Request */
			$request = "UPDATE USERS SET USER_LOGIN = :login, USER_PASSWORD = :password, USER_FNAME = :fname, USER_LNAME = :lname WHERE USER_LOGIN = :old_login;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':login', $login, PDO::PARAM_STR, 30);
			$statement->bindParam(':password', $password,PDO::PARAM_STR, 50);
			$statement->bindParam(':fname', $fname, PDO::PARAM_STR, 30);
			$statement->bindParam(':lname', $lname, PDO::PARAM_STR, 30);
			$statement->bindParam(':old_login', $old_login, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			/* Delete User's Permissions Table */
			$request = "DELETE FROM PERMISSIONS WHERE USER_LOGIN = :login";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':login', $login, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			/* Go Through Each Permissions Selected */
			for ($i = 0; $i < count($permissions_devices); $i++)
			{
				/* Add To Permissions Table */
				$request = "INSERT INTO PERMISSIONS (PERMISSION_ID, PERMISSION_TYPE, USER_LOGIN) VALUES (:permission, :type, :login);";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':permission', $permissions_devices[$i], PDO::PARAM_INT);
				$statement->bindParam(':type', $permissions_types[$i], PDO::PARAM_STR);
				$statement->bindParam(':login', $login, PDO::PARAM_STR, 30);
				/* Execute Query */
				$statement->execute();
			}

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