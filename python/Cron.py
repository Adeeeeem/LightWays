import pymysql
import os
import datetime

                ############# DATABASE CONNECTION ##################
mydb = pymysql.connect(
  host="127.0.0.1",
  user="admin",
  passwd="admin",
  database="LightWays"
)


                ############ FUNCTIONS ################
def getdays(d):
	i=0;
	newd=""
	if (len(d) > 1):
		while i<len(d)-1:
			newd=newd+d[i]+","
			i=i+1
	newd=newd+d[i]
	return newd


######################################################### Main #########################################################
                
def main():
        ############# SQL ##################
	mycursor = mydb.cursor()
	mycursor.execute("SELECT SCENE_START, SCENE_END, SCENE_DAYS, DEVICE_ID, SCENE_ID, CARD_IP, DEVICE_PIN FROM SCENENING natural join SCENES natural join CARDS natural join DEVICES where SCENE_STATUS = 'ON' AND SCENE_DAYS NOT LIKE '%0%'")
	count = mycursor.rowcount
	if (count == 0):
		return False
	myresult = mycursor.fetchall()
        
        #### DELETE OLD CRONTAB ####
	os.system("sudo crontab -u www-data -r")
	
    
        #### LOOP SCENES ####
	for x in myresult:
                #### START TIME SPLIT ####
		time_start=str(x[0]).split(":", 2)
		hour=time_start[0]
		minute=time_start[1]

                #### END TIME SPLIT ####
		time_end=str(x[1]).split(":", 2)
		hour1=time_end[0]
		minute1=time_end[1]
        
                #### SEPERATE DAYS WITH COMMA ####
		days=getdays(str(x[2]))
		cron_start = "%s %s \* \* %s" %(minute, hour, days)
		cron_end = "%s %s \* \* %s" %(minute1, hour1, days)
		ip=str(x[5])
		pin=str(x[6])
		device_id = str(x[3])
        
		          #### PREPARING CRON LINES ####
		os.system("echo %s %s \* \* %s sudo python3 /var/www/html/CronFiles/filterCron.py %s %s %s %s >> /var/www/html/cron"%(minute,hour,days, ip, pin, "ON", device_id))
		os.system("echo %s %s \* \* %s sudo python3 /var/www/html/CronFiles/filterCron.py %s %s %s %s >> /var/www/html/cron"%(minute1,hour1,days,ip,pin, "OFF", device_id))
        
                    #### UDATING CRON FILE ####    
	os.system("sudo crontab -u www-data /var/www/html/cron")
	os.system("sudo rm /var/www/html/cron")

if __name__ == '__main__':
        main()
print ("true")
