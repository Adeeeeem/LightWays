<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}
	
	$scene_id = $argv[1];
	$status = $argv[2];
	
	
?>
