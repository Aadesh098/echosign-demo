import paho.mqtt.client as mqtt
import pandas as pd
from datetime import datetime

# Define the MQTT server details
broker = "broker.emqx.io"  # e.g., "mqtt.eclipse.org" or IP address
port = 1883  # Default MQTT port
topic = "ML_BASED_GESTURE_TP"  # Topic to subscribe to

# Path to Excel file
excel_file = "dataset.xlsx"

# Create a new Excel file with column names if it doesn't exist
def create_excel_file():
    columns = ['finger1', 'finger2', 'finger3', 'finger4', 'finger5', 'x-axis', 'y-axix', 'z-axis', 'word']
    # Check if file exists
    try:
        pd.read_excel(excel_file)
    except FileNotFoundError:
        # Create a new Excel file if it doesn't exist
        df = pd.DataFrame(columns=columns)
        df.to_excel(excel_file, index=False)

# Callback function to handle incoming messages
def on_connect(client, userdata, flags, rc):
    
    print(f"Connected with result code {rc}")
    # Subscribe to the topic when connected
    client.subscribe(topic)

# Callback function for when a new message is received
def on_message(client, userdata, msg):
    global i
    # Get the comma-separated string
    data = msg.payload.decode()
    
    # Split the data into individual values
    values = data.split(',')
    
    # Check if the data contains exactly 5 values, else handle as needed
    if len(values) == 8:
        # Append the values with a static value (0)
        values.append(13)
        
        # Convert the values to a DataFrame
        df = pd.DataFrame([values], columns=['finger1', 'finger2', 'finger3', 'finger4', 'finger5', 'x-axis', 'y-axix', 'z-axis', 'word'])
        
        # Load the existing Excel file
        try:
            existing_df = pd.read_excel(excel_file)
            # Append the new data
            updated_df = pd.concat([existing_df, df], ignore_index=True)
        except FileNotFoundError:
            # If the file doesn't exist, start with the new data
            updated_df = df
        
        # Save the updated data back to Excel
        updated_df.to_excel(excel_file, index=False)
        print(f"Appended data: {values} -> {i}")
        i += 1
    else:
        print("Invalid data received. Expected 5 values.")

# Create the Excel file if it doesn't exist
create_excel_file()
i = 0
# Set up the MQTT client
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Connect to the broker
client.connect(broker, port, 60)

# Start the MQTT client loop
client.loop_forever()