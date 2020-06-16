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

	/* Get Scene NAME */
	$scene = $_POST["scene"];
	/* Get Scene Time Start */
	$time_start = $_POST["time_start"];
	/* Get Scene Time End */
	$time_end = $_POST["time_end"];
	/* Get Scene Days */
	$working_days = $_POST["working_days"];
	/* Get Devices Array */
	$devices = json_decode(stripslashes($_POST["devices"]));
	/* Avoid any XSS or SQL Injection */
	$scene = Security($scene);
	$time_start = Security($time_start);
	$time_end = Security($time_end);
	$working_days = Security($working_days);

	if ( isset($scene) && !empty($scene) && isset($time_start) && !empty($time_start) && isset($time_end) && !empty($time_end) && isset($working_days) && !empty($working_days) )
	{
		if ( (is_string($scene)) && (is_string($time_start)) && (is_string($time_end)) && (is_string($working_days)) )
		{
			/* Insert New Scene */
			/* Preparing Request */
			$request = "INSERT INTO SCENES (SCENE_NAME, SCENE_START, SCENE_END, SCENE_DAYS, SCENE_STATUS) VALUES (:scene, :time_start, :time_end, :working_days, 'ON');";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':scene', $scene, PDO::PARAM_STR, 30);
			$statement->bindParam(':time_start', $time_start);
			$statement->bindParam(':time_end', $time_end);
			$statement->bindParam(':working_days', $working_days, PDO::PARAM_STR, 7);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount()) // If Scene Added Successfully, Add Devices to it
			{
				/* Get Last Added Scene ID */
				$id = $DB_CONNECTION->lastInsertId();

				/* Go Through Each Device Selected */
				foreach ($devices as $device)
				{
					/* Add Device to Scene */
					/* Preparing Request */
					$request = "INSERT INTO SCENENING (SCENE_ID, DEVICE_ID) VALUES (:scene, :device);";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':scene', $id, PDO::PARAM_INT);
					$statement->bindParam(':device', $device, PDO::PARAM_INT);
					/* Execute Query */
					$statement->execute();
				}

				$check = updateSystem();

				if ($check == "true")
				{
					/* Return Added Scene */
					/* Preparing Request */
					$request = "SELECT SCENES.SCENE_ID AS id, SCENE_NAME AS name, SCENE_START AS time_start, SCENE_END AS time_end, SCENE_DAYS AS days, COUNT(SCENENING.DEVICE_ID) AS devices FROM SCENES LEFT JOIN SCENENING USING(SCENE_ID) WHERE SCENES.SCENE_ID = $id GROUP BY SCENES.SCENE_ID, SCENE_NAME, SCENE_STATUS LIMIT 1;";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Execute Query */
					$statement->execute();
					/* Fetch Result */
					$response = $statement->fetch();

					if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
					{
						/* Add to History */
						/* Preparing Request */
						$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, 'ADD', :scene, 'SCENE', CURRENT_DATE, CURRENT_TIME, :name);";
						/* Preparing Statement */
						$statement = $DB_CONNECTION->prepare($request);
						/* Binding Parameter */
						$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
						$statement->bindParam(':scene', $id, PDO::PARAM_STR, 30);
						$statement->bindParam(':name', $scene, PDO::PARAM_STR, 100);
						/* Execute Query */
						$statement->execute();
					}
				}
				else
				{
					/* Delete Scene */
					/* Preparing Request */
					$request = "DELETE FROM SCENES WHERE SCENE_ID = :scene;";
					/* Preparing Statement */
					$statement = $DB_CONNECTION->prepare($request);
					/* Binding Parameter */
					$statement->bindParam(':scene', $id, PDO::PARAM_INT);
					/* Execute Query */
					$statement->execute();
				}
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