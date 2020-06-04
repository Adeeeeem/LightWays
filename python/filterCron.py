import os
import sys
import pymysql


def updateDB(device_id, state):
	############# DATABASE CONNECTION ##################
	mydb = pymysql.connect(
	  host="127.0.0.1",
	  user="admin",
	  passwd="admin",
	  database="LightWays"
	)

	############# SQL ##################
	mycursor = mydb.cursor()
	mycursor.execute("UPDATE DEVICES SET DEVICE_STATUS='%s' WHERE DEVICE_ID=%s"%(state, device_id))
	mydb.commit()

    ############ FILTER DEVICES (LOCAL / THROUGH WIFI) ##########
def send(ip, pin, state):
    #do work here
	if (ip == "local"):
		cmd = 'python /var/www/html/switchDevice.py %s %s'%(pin,state)
	else:
		cmd = "curl -H \"Content-Type: application/json\" -X POST -d '{pin: \"%s\", status: \"%s\"}' http://%s/toggle" %(pin, state, ip)
	os.system(cmd)

    
if __name__ == '__main__':
	ip = sys.argv[1]
	pin = sys.argv[2]
	state = sys.argv[3]
	device_id = sys.argv[4]
	send(ip, pin, state)
	updateDB(device_id, state)
