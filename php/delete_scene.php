<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../404.html");
		exit();
	}

	include_once("config.php");
	require_once("update_system.php");

	header("Content-Type: application/json");

	/* Get Scene Received ID */
	$scene = $_POST["scene"];
	/* Avoid any XSS or SQL Injection */
	$scene = Security($scene);

	/* Return False for Error */
	$response = array("result" => false);

	if ( isset($scene) && !empty($scene) )
	{
		if (is_numeric($scene))
		{
			/* Get Scene Name for Hisotry */
			$request = "SELECT SCENE_NAME AS name FROM SCENES WHERE SCENE_ID = :scene LIMIT 1;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':scene', $scene, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$result = $statement->fetch();

			$name = $result["name"];
				
			/* Delete Scene */
			/* Preparing Request */
			$request = "DELETE FROM SCENES WHERE SCENE_ID = :scene;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':scene', $scene, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			/* If Scene Deleted */
			if ($statement->rowCount())
			{
				$check = updateSystem();
				
				if ($check == "true")
				{
					/* Return True */
					$response["result"] = true;

					if ($_SESSION["6C3Zq5Bpwm"] != "lightways")
					{
						/* Add to History */
						/* Preparing Request */
						$request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES (:user, 'DELETE', :scene, 'SCENE', CURRENT_DATE, CURRENT_TIME, :name);";
						/* Preparing Statement */
						$statement = $DB_CONNECTION->prepare($request);
						/* Binding Parameter */
						$statement->bindParam(':user', $_SESSION["6C3Zq5Bpwm"], PDO::PARAM_STR, 30);
						$statement->bindParam(':scene', $scene, PDO::PARAM_STR, 30);
						$statement->bindParam(':name', $name, PDO::PARAM_STR, 100);
						/* Execute Query */
						$statement->execute();
					}
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