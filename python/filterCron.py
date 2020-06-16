import os
import sys
from datetime import datetime
import pymysql

############# DATABASE CONNECTION ##################
mydb = pymysql.connect(
  host="127.0.0.1",
  user="admin",
  passwd="admin",
  database="LightWays"
)
    
def updateHistory(device_id, scene_name, state):
    ############# PREPARING VARS ##################
	option = "S"+pin+":"scene_name
	current_date = datetime.today().strftime('%Y-%m-%d')
	current_time = datetime.today().strftime('%H:%M:%S')

	    ############# SQL ##################
	    #### PREPARING REQUEST ####
	request = "INSERT INTO HISTORY (HISTORY_USER, HISTORY_TYPE, HISTORY_DATA_ID, HISTORY_DATA, HISTORY_DATE, HISTORY_TIME, HISTORY_OPTION) VALUES ('admin', '%s', '%s', 'DEVICE', '%s', '%s', '%s')"%(state, device_id, current_date, current_time, option)
    
	    #### EXECUTING QUERY ####
	mycursor = mydb.cursor()
	mycursor.execute(request)
	mydb.commit()


def updateDB(device_id, state):

	############# SQL ##################
	mycursor = mydb.cursor()
	mycursor.execute("UPDATE DEVICES SET DEVICE_STATUS='%s' WHERE DEVICE_ID=%s"%(state, device_id))
	mydb.commit()

    ############ FILTER DEVICES (LOCAL / THROUGH WIFI) ##########
def send(ip, pin, state):
    #do work here
	if (ip == "local"):
		cmd = 'python /var/www/html/LightWays/python/switchDevice.py %s %s'%(pin,state)
	else:
		cmd = "curl -H \"Content-Type: application/json\" -X POST -d '{pin: \"%s\", status: \"%s\"}' http://%s/toggle" %(pin, state, ip)
	os.system(cmd)

    
if __name__ == '__main__':
	ip = sys.argv[1]
	pin = sys.argv[2]
	state = sys.argv[3]
	device_id = sys.argv[4]
	scene_name = sys.argv[5]
	send(ip, pin, state)
	updateDB(device_id, state)
	updateHistory(device_id, scene_name, state);
