<?php
	include_once("config.php");

	header("Content-Type: application/json");

	$response = array("result" => "Error"); // Error

	if (isset($_SESSION["6C3Zq5Bpwm"]))
	{
		if ($_SESSION["Va7FqW6A3e"] == "USER")
		{
			$response["result"] = "User"; // Normal User
		}
		else
		{
			$response["result"] = "Admin"; // Admin
		}
	}
	else
	{
		session_destroy();
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>