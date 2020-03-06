<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Username */
	$username = $_POST["username"];
	/* Get Password */
	$password = $_POST["password"];
	/* Avoid any XSS or SQL Injection */
	$username = Security($username);
	$password = Security($password);

	$response = array("result" => "Error"); // Error

	if ( isset($username) && !empty($username) && isset($password) && !empty($password) )
	{
		if ( (is_string($username)) && (is_string($password)) )
		{
			/* Preparing Request */
			$request = "SELECT USER_LOGIN FROM USERS WHERE USER_LOGIN = :username LIMIT 1;"; // Search For User
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(":username", $username, PDO::PARAM_STR, 30);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount()) // User Exists
			{
				/* Preparing Request */
				$request = "SELECT USER_LOGIN, USER_TYPE FROM USERS WHERE USER_LOGIN = :username AND BINARY USER_PASSWORD = :password LIMIT 1;"; // Check For Password
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(":username", $username, PDO::PARAM_STR, 30);
				$statement->bindParam(":password", $password, PDO::PARAM_STR, 50);
				/* Execute Query */
				$statement->execute();

				if ($statement->rowCount()) // Correct Password
				{
					$row = $statement->fetch(); // Fetch the Row

					$_SESSION["6C3Zq5Bpwm"] = $username; // User's Login Session

					/* Check for User Type */
					if($row["USER_TYPE"] == "USER")
					{
						$response["result"] = "User"; // Normal User
						$_SESSION["Va7FqW6A3e"] = "USER"; // Affect User to Type Session
					}
					else
					{
						$response["result"] = "Admin"; // Admin
						$_SESSION["Va7FqW6A3e"] = "ADMIN"; // Affect Admin to Type Session
					}
				}
				else
				{
					$response["result"] = "Wrong"; // Wrong Password
				}
			}
			else
			{
				$response["result"] = "NotFound"; // User Not Found
			}
		}
	}
	else
	{
		$response["result"] = "Empty"; // Empty Fields
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>