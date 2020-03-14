<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Preparing Request */
	$request = "SELECT FLOORS.FLOOR_ID as floorid, FLOOR_NAME as floor, (SELECT COUNT(ROOM_ID) FROM ROOMS WHERE FLOOR_ID = floorid) AS rooms, ROOMS.ROOM_ID AS roomid, ROOM_NAME AS room, COUNT(DEVICES.DEVICE_ID) AS devices, (SELECT COUNT(GROUP_ID) FROM ROOMS LEFT JOIN GROUPS ON ROOMS.ROOM_ID = GROUPS.ROOM_ID WHERE GROUPS.ROOM_ID = roomid) AS groups FROM ROOMS LEFT JOIN DEVICES ON DEVICES.ROOM_ID = ROOMS.ROOM_ID RIGHT JOIN FLOORS ON FLOORS.FLOOR_ID = ROOMS.FLOOR_ID WHERE USER_LOGIN = :user GROUP BY ROOMS.ROOM_ID, FLOORS.FLOOR_ID ORDER BY FLOORS.FLOOR_ID, ROOMS.ROOM_ID;";
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