<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

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
	$login = Security($login);
	$password = Security($password);
	$fname = Security($fname);
	$lname = Security($lname);

	if ( isset($login) && !empty($login) && isset($password) && !empty($password) && isset($fname) && !empty($fname) && isset($lname) && !empty($lname) )
	{
		if ( (is_string($login)) && (is_string($password)) && (is_string($fname)) && (is_string($lname)) )
		{
			/* Insert New User */
			/* Preparing Request */
			$request = "INSERT INTO USERS (USER_LOGIN, USER_PASSWORD, USER_FNAME, USER_LNAME, USER_TYPE) VALUES (:login, :password, :fname, :lname, 'USER');";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':login', $login, PDO::PARAM_STR, 30);
			$statement->bindParam(':password', $password,PDO::PARAM_STR, 30);
			$statement->bindParam(':fname', $fname, PDO::PARAM_STR, 30);
			$statement->bindParam(':lname', $lname, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount()) // If User Added Successfully, Add Devices to it
			{
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

				$name = $fname.' '.$lname;
				
				/* Return Added User */
				$response = array("user" => $login, "name" => $name);

				if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
				{
					/* Add to History */
					/* Preparing Request */
					$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, 'ADD', :employee, 'USER', CURRENT_DATE, CURRENT_TIME, :name);";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
					$statement->bindParam(':employee', $login, PDO::PARAM_STR, 30);
					$statement->bindParam(':name', $name, PDO::PARAM_STR, 100);
					/* Execute Query */
					$statement->execute();
				}
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