<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");

	$scene_id = $argv[1];
	$status = $argv[2];

	
	
	/* Close the Connection */
	$DB_CONNECTION = null;
?>
