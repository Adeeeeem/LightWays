#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <ESP8266WebServer.h> // WEB SERVER CLASS
ESP8266WebServer server; // server object


const char* ssid = "ORANGE_B2CF";
const char* password = "WDME3LH7";



void connectToWIFI(){
  // Connect to WiFi
  WiFi.mode(WIFI_STA);
  //WiFi.setSleepMode(WIFI_NONE_SLEEP);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) 
  {
     
     delay(500);
     Serial.print("*");
  }
  
  Serial.println("");
  Serial.println("WiFi connection Successful");
  Serial.print("The IP Address of ESP8266 Module is: ");
  Serial.print(WiFi.localIP());// Print the IP address
  Serial.println("******************************************************");
}

boolean toggleLED(){
  String data = server.arg("plain");
  StaticJsonBuffer<200> jBuffer;
  JsonObject& jObject = jBuffer.parseObject(data);
  String Pin = jObject["pin"];
  String Status = jObject["status"];

  //Serial.println(Pin+" has been set to "+Status);
  pinMode(Pin.toInt(), OUTPUT);

  if (Status == "ON"){
    digitalWrite(Pin.toInt(), LOW);
    Serial.println("Pin: "+Pin+" has been set to ON (LOW)");
  }else{
    digitalWrite(Pin.toInt(), HIGH);
    Serial.println("Pin: "+Pin+" has been set to OFF (HIGH)");
  }
  server.send(204, "");
  return "true";
}


void setup() {
    Serial.begin(115200);
    //Serial.setDebugOutput(false);
    connectToWIFI();

    server.on("/", [](){server.send(200, "text/plain", "Web Server Perfectly Running!");});
    server.on("/toggle", toggleLED);
    server.begin();
    Serial.println("SERVER IS ON: HANDLING REQUESTS");

    
}

 
void loop() {
  server.handleClient();
}
