<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}
	
	/* Start Session */
	session_start();

	/* Host IP or Name */
	$DB_HOST = "127.0.0.1";
	/* User Name */
	$DB_USER =  "root";
	/* Password */
	$DB_PASSWORD = "";
	/* Database Name */
	$DB_DATABASE = "LightWays"; // LightWays
	/* Data Source Name */
	$DSN = "mysql:host=".$DB_HOST."; dbname=".$DB_DATABASE."; charset=utf8";
	/* Options */
	$OPTIONS = [PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];

	/* If there is any error reaching the Database */
	try
	{
		/* Connect to Database */
		$DB_CONNECTION = new PDO($DSN, $DB_USER, $DB_PASSWORD, $OPTIONS);
	}
	catch(PDOException $e)
	{
		echo "<center><h1 style='color: red;'><b>Connection failed : ".$e->getMessage()."</b></h1></center>";
	}

	/* Avoid any XSS or SQL Injection Function */
	function Security($value)
	{
		$value = trim($value);
		$value = stripslashes($value);
		$value = htmlspecialchars($value, ENT_HTML401 | ENT_QUOTES | ENT_HTML5, "UTF-8");
		$value = strip_tags($value);

		return $value;
	}
?>
