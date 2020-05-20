<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	/* Get Device Received ID */
	$id = $_POST["id"];

	if ( isset($id) && !empty($id) )
	{
		if (is_numeric($id))
		{

			/* Get Device's Power */
			/* Preparing Request */
			$request = "SELECT DEVICE_POWER AS power FROM DEVICES WHERE DEVICE_ID = :id;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':id', $id, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$response = $statement->fetch();
		}
	}

	/* Return as Text Format */
	echo $response["power"];
	/* Close the Connection */
	$DB_CONNECTION = null;
?>