"use client";

import React from "react";
import { technologies, coursewok } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";
import { BallCanvas } from "./canvas";

const Clients = () => {
  return (
    <section id="coursewok" className="py-20">
      <h1 className="heading mb-5">
        Engineering
        <span className="text-purple"> Course Work</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-5">
        <div
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={coursewok}
            direction="right"
            speed="slow"
          />
        </div>
        
        <h3 className="heading mt-10 mb-10">
        Tech 
        <span className="text-purple"> Stack</span>
      </h3>
        <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-20 h-20' key={technology.name}>
          <BallCanvas icon={technology.icon} />
          <p className="flex justify-center">{technology.name}</p>
        </div>
      ))}
    </div>
      </div>
    </section>
  );
};

export default Clients;