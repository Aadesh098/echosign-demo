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

// Variables to store actual reading of FLEX_SENSORS
int adc_val1, adc_val2, adc_val3, adc_val4, adc_val5;

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
    reconnect();
  }
  client.loop(); // Handle MQTT communication

  // Get Flex Value
  getFlexValue();

  // Get accelerometer data
  sensors_event_t event;
  accel.getEvent(&event);

  // Format the accelerometer data into a string
  String pkt = String(adc_val1) + "," + String(adc_val2) + "," + String(adc_val3) + "," + String(adc_val4) + "," + String(adc_val5) + "," + String(event.acceleration.x) + "," + String(event.acceleration.y) + "," + String(event.acceleration.z);
//  Serial.println(pkt);

  if (millis() - lastSent > 500) {
    // Send data to MQTT
    sendToMQTT(pkt);
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

void getFlexValue() {
  adc_val1 = analogRead(flex_1);  // Flex 1 for Thumb
  adc_val2 = analogRead(flex_2);  // Flex 2 for Index Finger
  adc_val3 = analogRead(flex_3);  // Flex 3 for Middle Finger
  adc_val4 = analogRead(flex_4);  // Flex 4 for Ring Finger
  adc_val5 = analogRead(flex_5);  // Flex 5 for Pinky Finger
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
  client.publish("ML_BASED_GESTURE_TP", pkt.c_str()); // Send data to MQTT topic
  Serial.println("Sent to MQTT");
}
