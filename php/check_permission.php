<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Room Received ID */
	$room = $_POST["room"];
	/* Avoid any XSS or SQL Injection */
	$room = Security($room);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($room) && !empty($room) )
	{
		if (is_numeric($room))
		{
			/* Check for Permission */
			/* Preparing Request */
			$request = "SELECT USER_LOGIN FROM PERMISSIONS WHERE USER_LOGIN = :login AND PERMISSION_ID = :room AND PERMISSION_TYPE = 'ROOM' LIMIT 1;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':login', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
			$statement->bindParam(':room', $room, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() == 1)
			{
				/* Return True */
				$response["result"] = true;
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