import xgboost as xgb
import joblib
import numpy as np
import paho.mqtt.client as mqtt
import time

# Load the trained model and label encoder
# model = joblib.load('xgboost_model.pkl')
model = joblib.load(r'C:\Users\dell4\Downloads\Flex and Accelerometer Based Hand Gesture\Flex and Accelerometer Based Hand Gesture\Python Code\xgboost_model.pkl')

label_encoder = joblib.load(r'C:\Users\dell4\Downloads\Flex and Accelerometer Based Hand Gesture\Flex and Accelerometer Based Hand Gesture\Python Code\label_encoder.pkl')

# MQTT settings
MQTT_BROKER = "broker.emqx.io"
MQTT_PORT = 1883
MQTT_TOPIC = "ML_BASED_GESTURE_TP"

# Initialize variables for tracking previous prediction and time
previous_prediction = None
last_publish_time = time.time()

def publish_data(topic, data):
    result = client.publish(topic, data)
    status = result[0]
    if status == 0:
        print(f"Sent `{data}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")

# Function to process the MQTT message and make predictions
def on_message(client, userdata, message):
    global previous_prediction, last_publish_time
    
    try:
        # Decode and parse the MQTT message
        data_str = message.payload.decode("utf-8")
        # Convert the string data to a list of floats
        data = list(map(float, data_str.split(',')))
        
        # Ensure the data has the correct number of features
        if len(data) != 8:
            print("Incorrect data length. Expected 8 features.")
            return
        
        # Reshape data for model input
        data_np = np.array(data).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(data_np)
        # Decode the prediction if it's encoded
        predicted_word = label_encoder.inverse_transform(prediction)
        current_prediction = int(predicted_word[0])
        
        # Check if the current prediction differs from the previous one
        # or if at least 1 second has passed since the last publication
        current_time = time.time()
        if current_prediction != previous_prediction and (current_time - last_publish_time) >= 1:
            publish_data("hand_gesture/TP", current_prediction)
            previous_prediction = current_prediction
            last_publish_time = current_time

        previous_prediction = current_prediction
        print(f"Predicted Word: {predicted_word[0]}")

    except Exception as e:
        print(f"Error in processing message: {e}")

# MQTT client setup
client = mqtt.Client()
client.connect(MQTT_BROKER, MQTT_PORT)
client.subscribe(MQTT_TOPIC)
client.on_message = on_message

# Start MQTT loop
client.loop_forever()
