<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");
	require("update_system.php");

	header("Content-Type: application/json");

	/* Get Scene Received ID */
	$scene = $_POST["scene"];
	/* Get Scene Received NAME */
	$name = $_POST["name"];
	/* Get Scene Time Start */
	$time_start = $_POST["time_start"];
	/* Get Scene Time End */
	$time_end = $_POST["time_end"];
	/* Get Scene Working Days */
	$working_days = $_POST["working_days"];
	/* Get Devices Array */
	$devices = json_decode(stripslashes($_POST["devices"]));
	/* Avoid any XSS or SQL Injection */
	$scene = Security($scene);
	$name = Security($name);
	$time_start = Security($time_start);
	$time_end = Security($time_end);
	$working_days = Security($working_days);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($scene) && !empty($scene) && isset($name) && !empty($name) && isset($time_start) && !empty($time_start) && isset($time_end) && !empty($time_end) && isset($working_days) && !empty($working_days) )
	{
		if ( (is_numeric($scene)) && (is_string($name)) && (is_string($time_start)) && (is_string($time_end)) && (is_string($working_days)) )
		{
			/* Update Scene */
			/* Preparing Request */
			$request = "UPDATE SCENES SET SCENE_NAME = :name, SCENE_START = :time_start, SCENE_END = :time_end, SCENE_DAYS = :working_days WHERE SCENE_ID = :scene;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':scene', $scene, PDO::PARAM_INT);
			$statement->bindParam(':name', $name, PDO::PARAM_STR, 30);
			$statement->bindParam(':time_start', $time_start);
			$statement->bindParam(':time_end', $time_end);
			$statement->bindParam(':working_days', $working_days, PDO::PARAM_STR, 7);
			/* Execute Query */
			$statement->execute();

			/* Delete Devices From Scene */
			/* Preparing Request */
			$request = "DELETE FROM SCENENING WHERE SCENE_ID = :scene;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':scene', $scene, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			/* Go Through Each Device Selected */
			foreach ($devices as $device)
			{
				/* Add Device to Group */
				/* Preparing Request */
				$request = "INSERT INTO SCENENING (SCENE_ID, DEVICE_ID) VALUES (:scene, :device);";
				/* Preparing Statement */
				$statement = $DB_CONNECTION->prepare($request);
				/* Binding Parameter */
				$statement->bindParam(':scene', $scene, PDO::PARAM_INT);
				$statement->bindParam(':device', $device, PDO::PARAM_INT);
				/* Execute Query */
				$statement->execute();
			}

			$check = updateSystem();

			if ($check == "true")
			{
				/* Return True */
				$response["result"] = true;
			}
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close the Connection */
	$DB_CONNECTION = null;
?>