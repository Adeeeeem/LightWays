<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Scene Received ID */
	$scene = $_POST["scene"];
	/* Avoid any XSS or SQL Injection */
	$scene = Security($scene);

	if ( isset($scene) && !empty($scene) )
	{
		if (is_numeric($scene))
		{
			/* Select Scene Details and its Related Devices */
			/* Preparing Request */
			$request = "SELECT SCENE_NAME AS name, SCENE_START AS start_time, SCENE_END AS end_time, SCENE_DAYS AS days, DEVICE_ID as devices FROM SCENES LEFT JOIN SCENENING USING(SCENE_ID) WHERE SCENES.SCENE_ID = :scene;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(":scene", $scene, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$response = $statement->fetchAll();
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>