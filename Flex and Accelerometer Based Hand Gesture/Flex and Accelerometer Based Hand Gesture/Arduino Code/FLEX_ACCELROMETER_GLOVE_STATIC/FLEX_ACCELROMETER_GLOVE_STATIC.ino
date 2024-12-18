#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>
#include <WiFi.h>
#include <PubSubClient.h>

// Defining PINS of FLEX_SENSORS
const int flex_1 = 34; // For Thumb
const int flex_2 = 35; // For Index
const int flex_3 = 32; // For Middle
const int flex_4 = 33; // For Ring
const int flex_5 = 39; // For Pinky

// WiFi and MQTT configuration
const char* ssid = "EACCESS";            // Replace with your WiFi SSID
const char* password = "hostelnet";    // Replace with your WiFi Password
const char* mqtt_server = "broker.emqx.io"; // Replace with your MQTT Broker IP

// Variables to store the average ADC values of FLEX_SENSORS
int adc_val1, adc_val2, adc_val3, adc_val4, adc_val5;
int avg_adc_val1, avg_adc_val2, avg_adc_val3, avg_adc_val4, avg_adc_val5;

// Accelerometer variables
float x_axis, y_axis, z_axis;

/* Assign a unique ID to this sensor at the same time */
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastSent;
void setup() {
  Serial.begin(115200);

  //  Setup Glove
  setup_glove();

  // Initialize the accelerometer
  if (!accel.begin()) {
    Serial.println("Ooops, no ADXL345 detected ... Check your wiring!");
    while (1);
  }

  // Set the range to whatever is appropriate for your project
  accel.setRange(ADXL345_RANGE_16_G);

  // Connect to WiFi
  setup_wifi();

  // Setup MQTT
  client.setServer(mqtt_server, 1883); // Set the MQTT server IP and port
}

void loop() {
  if (!client.connected()) {
    Serial.println("trying to connect");
    reconnect();
  }
  client.loop(); // Handle MQTT communication

  // Get the average flex sensor values
  getAverageFlexValues();

  // Get accelerometer data
  sensors_event_t event;
  accel.getEvent(&event);

  x_axis = event.acceleration.x;
  y_axis = event.acceleration.y;
  z_axis = event.acceleration.z;

  // Format the accelerometer data into a string
  String pkt = String(avg_adc_val1) + "," + String(avg_adc_val2) + "," + String(avg_adc_val3) + "," + String(avg_adc_val4) + "," + String(avg_adc_val5) + "," + String(event.acceleration.x) + "," + String(event.acceleration.y) + "," + String(event.acceleration.z);

  int gesture = getGesture();
  if (millis() - lastSent > 500) {
    // Send data to MQTT
    Serial.print(gesture);
    sendToMQTT(String(gesture));
    lastSent = millis();
  }

  delay(500);
}

void setup_glove() {
  pinMode(flex_1, INPUT);
  pinMode(flex_2, INPUT);
  pinMode(flex_3, INPUT);
  pinMode(flex_4, INPUT);
  pinMode(flex_5, INPUT);
}

void getAverageFlexValues() {
  long sum1 = 0, sum2 = 0, sum3 = 0, sum4 = 0, sum5 = 0;

  // Take 10 readings for each sensor
  for (int i = 0; i < 10; i++) {
    sum1 += analogRead(flex_1);  // Flex 1 for Thumb
    sum2 += analogRead(flex_2);  // Flex 2 for Index Finger
    sum3 += analogRead(flex_3);  // Flex 3 for Middle Finger
    sum4 += analogRead(flex_4);  // Flex 4 for Ring Finger
    sum5 += analogRead(flex_5);  // Flex 5 for Pinky Finger
    delay(10); // Short delay between readings
  }

  // Calculate the average values
  avg_adc_val1 = sum1 / 10;
  avg_adc_val2 = sum2 / 10;
  avg_adc_val3 = sum3 / 10;
  avg_adc_val4 = sum4 / 10;
  avg_adc_val5 = sum5 / 10;
}

void setup_wifi() {
  delay(10);
  // Connect to Wi-Fi
  Serial.println();
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" connected");
}

void reconnect() {
  // Loop until we're reconnected to the MQTT server
  while (!client.connected()) {
    String clientId = "ESP32Client-" + WiFi.macAddress();  // Use MAC address for unique client ID
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      delay(5000);
    }
  }
}

void sendToMQTT(String pkt) {
  client.publish("hand_gesture/TP", pkt.c_str()); // Send data to MQTT topic
  Serial.println("Sent to MQTT");
}

int getGesture(){
  if (avg_adc_val1 > 750 && avg_adc_val2 > 600 && avg_adc_val3 > 1100 && avg_adc_val4 > 850 && avg_adc_val5 > 750){
    return 0;
  }else if(avg_adc_val1 < 750 && avg_adc_val2 < 600 && avg_adc_val3 < 1100 && avg_adc_val4 < 850 && avg_adc_val5 < 750 && y_axis > x_axis && y_axis > z_axis){
    return 6;
  }else if(avg_adc_val1 < 750 && avg_adc_val2 > 600 && avg_adc_val3 < 1100 && avg_adc_val4 < 850 && avg_adc_val5 < 750 && y_axis > x_axis && y_axis > z_axis){
    return 7;
  }else if(avg_adc_val1 < 750 && avg_adc_val2 > 600 && avg_adc_val3 > 1100 && avg_adc_val4 < 850 && avg_adc_val5 < 750 && y_axis > x_axis && y_axis > z_axis){
    return 8;
  }else if(avg_adc_val1 < 750 && avg_adc_val2 > 600 && avg_adc_val3 > 1100 && avg_adc_val4 > 850 && avg_adc_val5 < 750 && y_axis > x_axis && y_axis > z_axis){
    return 9;
  }
  else if(avg_adc_val1 < 750 && avg_adc_val2 > 600 && avg_adc_val3 > 1100 && avg_adc_val4 > 850 && avg_adc_val5 > 750 && y_axis > x_axis && y_axis > z_axis){
    return 10;
  }else if(avg_adc_val1 < 750 && avg_adc_val2 > 600 && avg_adc_val3 < 1100 && avg_adc_val4 < 850 && avg_adc_val5 > 750 && y_axis > x_axis && y_axis > z_axis){
    return 11;
  }else if(avg_adc_val1 < 750 && avg_adc_val2 < 600 && avg_adc_val3 < 1100 && avg_adc_val4 < 850 && avg_adc_val5 < 750){
    return 1;
  }
  else if(avg_adc_val1 < 750 && avg_adc_val2 > 600 && avg_adc_val3 < 1100 && avg_adc_val4 < 850 && avg_adc_val5 < 750){
    return 2;
  }else if(avg_adc_val1 < 750 && avg_adc_val2 > 600 && avg_adc_val3 > 1100 && avg_adc_val4 < 850 && avg_adc_val5 < 750){
    return 3;
  }else if(avg_adc_val1 < 750 && avg_adc_val2 > 600 && avg_adc_val3 > 1100 && avg_adc_val4 > 850 && avg_adc_val5 < 750){
    return 4;
  }else if(avg_adc_val1 < 750 && avg_adc_val2 > 600 && avg_adc_val3 > 1100 && avg_adc_val4 > 850 && avg_adc_val5 > 750){
    return 5;
  }
}
