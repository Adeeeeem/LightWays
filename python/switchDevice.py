import RPi.GPIO as GPIO
import time
import sys

def hello(pin, status):
	#print pin, "has been turned "+status
	GPIO.setwarnings(False)
	GPIO.setmode(GPIO.BCM)
	GPIO.setup(pin, GPIO.OUT)
	if (status == "ON"):
		GPIO.output(pin, GPIO.LOW)
	else:
		GPIO.output(pin, GPIO.HIGH)
		GPIO.cleanup()

if __name__ == "__main__":
	pin = int(sys.argv[1])
	status = sys.argv[2]
	hello(pin, status)
	print "true"
