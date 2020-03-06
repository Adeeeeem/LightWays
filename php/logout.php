<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Empty Sessions */
	$_SESSION["6C3Zq5Bpwm"] == "";
	$_SESSION["Va7FqW6A3e"] == "";
	/* Remove All Session Variables */
	session_unset();
	/* Destroy Session */
	session_destroy();
	/* Close the Connection */
	$DB_CONNECTION = null;
?>