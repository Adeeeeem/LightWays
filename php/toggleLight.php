<?php


function kill($process) {
    if (strncasecmp(PHP_OS, 'WIN', 3) == 0) {
        $status = proc_get_status($process);
        return exec('taskkill /F /T /PID '.$status['pid']);
    } else {
        return proc_terminate($process);
    }
}

function toggleL($pin, $status, $destIP){
//curl -H "Content-Type: application/json" -X POST -d '{pin: "1", status: "ON"}' http://192.168.1.1/toggle // Linux
$check = "true";
if ($destIP != "local")
    //$check = shell_exec('curl -H "Content-Type: application/json" -X POST -d "{\"pin\": \"'.$pin.'\", \"status\": \"'.$status.'\"}" http://'.$destIP.'/toggle');
    $cmd = 'curl -H "Content-Type: application/json" -X POST -d "{\"pin\": \"'.$pin.'\", \"status\": \"'.$status.'\"}" http://'.$destIP.'/toggle';
else
	//$check = shell_exec("python /var/www/html/switchDevice.py $pin $status");
    $cmd = "python /var/www/html/LightWays/python/switchDevice.py $pin $status";
    //$check = shell_exec($cmd);
  
    
    $descriptorspec = array(1 => array('pipe', 'w'));
    $process = proc_open($cmd, $descriptorspec, $pipes);
    
    if (is_resource($process))
    {
    usleep(0.2*1000000); // wait 2.5 secs
    $status = proc_get_status($process);
        
        if ($status['running'] == true) {
            kill($process);
            echo "Fatal_Error: Failed to Communicate with Device [CARD: $destIP - PIN: $pin]\n";
            $check = "false";
        } 

    
    }
    
return $check;
}

?>
