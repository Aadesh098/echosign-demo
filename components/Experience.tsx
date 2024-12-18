import React, { useState, useEffect } from "react";
import mqtt from "mqtt"; 
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const gestureMap: { [key: number]: string } = {
  0: "Hi, How are you?",
  1: "I am fine, thank you.",
  2: "What is your name?",
  3: "My name is EchoSign.",
  4: "Where are you from?",
  5: "I am from the Internet!",
  6: "What do you do?",
  7: "I assist with sign language.",
  8: "Can you help me?",
  9: "Sure, what do you need?",
  10: "Thank you!",
  11: "You're welcome!"
};

const Experience = () => {
  const [gestureData, setGestureData] = useState("Waiting for data...");

  useEffect(() => {
    // Use the secure WebSocket protocol
    const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt"); 

    client.on("connect", () => {
      console.log("Connected to MQTT Broker");
      client.subscribe("hand_gesture/TP");
    });

    client.on("message", (topic, message) => {
      const receivedValue = parseInt(message.toString(), 10);

      // Ensure receivedValue is within 0–11
      const mappedExpression =
        gestureMap[receivedValue as keyof typeof gestureMap] || "Unknown gesture";

      setGestureData(mappedExpression);

      // Reset data after 5 seconds
      // setTimeout(() => {
      //   setGestureData("Waiting for data...");
      // }, 10000);
    });

    // Cleanup the MQTT connection on component unmount
    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="py-20 w-full" id="demo">
      <h1 className="heading">
        EchoSign <span className="text-purple">Live Demo</span>
      </h1>

      <div
        className={`w-full mt-12 grid ${
          workExperience.length === 1 ? "grid-cols-1" : "lg:grid-cols-4"
        } grid-cols-1 gap-10`}
      >
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className={`flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800 ${
              workExperience.length === 1 ? "col-span-full" : ""
            }`}
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16 "
              />
              <div className="lg:ms-5">
                <h1 className="text-center text-2xl md:text-3xl font-bold">
                  {card.title}
                </h1>
                <h1 className="text-center text-xl mt-3 md:text-xl font-bold underline">
                {gestureData}
                </h1>
              </div>
              <img
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16"
              />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;
