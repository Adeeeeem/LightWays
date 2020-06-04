<?php

System_Scene();

function System_Scene()
{
	echo $check = shell_exec('sudo python3 /var/www/html/CronFiles/Cron.py');
	//return $check;
}
?>
