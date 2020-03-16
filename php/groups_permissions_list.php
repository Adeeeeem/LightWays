<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT ROOMS.ROOM_ID AS room, GROUP_ID AS id, GROUP_NAME AS name FROM ROOMS NATURAL JOIN FLOORS LEFT JOIN GROUPS ON ROOMS.ROOM_ID = GROUPS.ROOM_ID WHERE USER_LOGIN = :user;";
	/* Preparing Statement */
	$statement = $DB_CONNECTION->prepare($request);
	/* Binding Parameter */
	$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
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