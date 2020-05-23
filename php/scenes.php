<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT SCENES.SCENE_ID AS id, SCENE_NAME AS name, SCENE_START AS start, SCENE_END AS stop, SCENE_DAYS AS days, SCENE_STATUS AS status, COUNT(SCENENING.DEVICE_ID) AS devices FROM SCENES LEFT JOIN SCENENING USING(SCENE_ID) GROUP BY SCENES.SCENE_ID, SCENE_NAME, SCENE_STATUS ORDER BY SCENES.SCENE_ID DESC;";
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