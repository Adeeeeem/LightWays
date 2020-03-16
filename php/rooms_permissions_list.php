<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT FLOORS.FLOOR_ID as floor, ROOM_ID AS room, ROOM_NAME AS name FROM FLOORS LEFT JOIN ROOMS ON FLOORS.FLOOR_ID = ROOMS.FLOOR_ID WHERE USER_LOGIN = :user;";
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