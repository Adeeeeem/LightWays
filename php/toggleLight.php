<?php

function toggleL($pin, $status, $destIP){
    //curl -H "Content-Type: application/json" -X POST -d '{pin: "1", status: "ON"}' http://192.168.1.1/toggle // Linux
	$check = "false";
	if ($destIP != "local"){
		$check = shell_exec('curl -H "Content-Type: application/json" -X POST -d "{\"pin\": \"'.$pin.'\", \"status\": \"'.$status.'\"}" http://'.$destIP.'/toggle');
	$check = "true";
	}
	else
		$check = shell_exec("python /var/www/html/switchDevice.py $pin $status");

return $check;
}
?>
