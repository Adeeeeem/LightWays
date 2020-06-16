<?php

function updateSystem()
{
	$check = shell_exec('sudo python3 /var/www/html/LightWays/python/Cron.py');
	return $check;
}

?>
