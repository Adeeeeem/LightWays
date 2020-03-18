<?php
	include_once("config.php");

	header("Content-Type: application/json");

	/* Get Start Date */
	$start_date = $_POST["start_date"];
	/* Get End Date */
	$end_date = $_POST["end_date"];
	/* Get Start Time */
	$start_time = $_POST["start_time"];
	/* Get End Time */
	$end_time = $_POST["end_time"];
	/* Avoid any XSS or SQL Injection */
	$start_date = Security($start_date);
	$end_date = Security($end_date);
	$start_time = Security($start_time);
	$end_time = Security($end_time);

	if ( isset($start_date) && !empty($start_date) && isset($end_date) && !empty($end_date) ) // Start Date Input not Empty
	{
		if ( isset($start_time) && !empty($start_time) && isset($end_time) && !empty($end_time) )
		{
			$start_time = $start_time.":00"; // Add Seconds
			$end_time = $end_time.":00"; // Add Seconds

			/* Preparing Request */
			$request = "SELECT HISTORY_USER AS user, HISTORY_TYPE AS type, HISTORY_DATA_ID AS id, HISTORY_DATA AS data, HISTORY_DATE AS date, HISTORY_TIME AS time, HISTORY_OPTION AS opt FROM HISTORY WHERE HISTORY_DATE BETWEEN :start_date AND :end_date AND HISTORY_TIME BETWEEN :start_time AND :end_time ORDER BY HISTORY_DATE DESC, HISTORY_TIME DESC;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':start_date', $start_date, PDO::PARAM_STR, 10);
			$statement->bindParam(':end_date', $end_date, PDO::PARAM_STR, 10);
			$statement->bindParam(':start_time', $start_time, PDO::PARAM_STR, 5);
			$statement->bindParam(':end_time', $end_time, PDO::PARAM_STR, 5);
		}
		else // History Between two Dates
		{
			/* Preparing Request */
			$request = "SELECT HISTORY_USER AS user, HISTORY_TYPE AS type, HISTORY_DATA_ID AS id, HISTORY_DATA AS data, HISTORY_DATE AS date, HISTORY_TIME AS time, HISTORY_OPTION AS opt FROM HISTORY WHERE HISTORY_DATE BETWEEN :start_date AND :end_date ORDER BY HISTORY_DATE DESC, HISTORY_TIME DESC;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':start_date', $start_date, PDO::PARAM_STR, 10);
			$statement->bindParam(':end_date', $end_date, PDO::PARAM_STR, 10);
		}
	}
	else // Date Input is Empty
	{
		if ( isset($start_time) && !empty($start_time) && isset($end_time) && !empty($end_time) )
		{
			$start_time = $start_time.":00"; // Add Seconds
			$end_time = $end_time.":00"; // Add Seconds

			/* Preparing Request */
			$request = "SELECT HISTORY_USER AS user, HISTORY_TYPE AS type, HISTORY_DATA_ID AS id, HISTORY_DATA AS data, HISTORY_DATE AS date, HISTORY_TIME AS time, HISTORY_OPTION AS opt FROM HISTORY WHERE HISTORY_DATE = CURRENT_DATE AND HISTORY_TIME BETWEEN :start_time AND :end_time ORDER BY HISTORY_DATE DESC, HISTORY_TIME DESC;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Binding Parameter */
			$statement->bindParam(':start_time', $start_time, PDO::PARAM_STR, 5);
			$statement->bindParam(':end_time', $end_time, PDO::PARAM_STR, 5);
		}
		else
		{
			/* Preparing Request */
			$request = "SELECT HISTORY_USER AS user, HISTORY_TYPE AS type, HISTORY_DATA_ID AS id, HISTORY_DATA AS data, HISTORY_DATE AS date, HISTORY_TIME AS time, HISTORY_OPTION AS opt FROM HISTORY ORDER BY HISTORY_DATE DESC, HISTORY_TIME DESC LIMIT 25;";
			/* Preparing Statement */
			$statement = $DB_CONNECTION->prepare($request);
			/* Execute Query */
			$statement->execute();
			/* Fetch Result */
			$response = $statement->fetchAll();
		}
	}

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