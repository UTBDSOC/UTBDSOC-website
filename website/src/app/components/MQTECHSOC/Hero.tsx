"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <div className="bg-gray-900 h-screen flex flex-col items-center justify-center text-center text-[#10B981] relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 opacity-20">
        {Array.from({ length: 144 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-full bg-transparent border border-gray-700"
          ></div>
        ))}
      </div>

      {/* Hero content */}
      <AnimatedText phrases={["Students", "Alumni", "Staff", "Public"]} />
      <div className="absolute bottom-10 flex flex-row justify-center space-x-4">
        <button className="px-6 py-3 font-medium bg-[#10B981] text-white rounded-full shadow-md hover:bg-[#059669] transition duration-300">
          Events
        </button>
        <button className="px-6 py-3 font-medium bg-transparent border border-[#10B981] text-[#10B981] rounded-full hover:bg-[#10B981] hover:text-white transition duration-300">
          Membership
        </button>
      </div>
    </div>
  );
};

const ONE_SECOND = 1000;
const WAIT_TIME = ONE_SECOND * 3;

const AnimatedText: React.FC<{ phrases: string[] }> = ({ phrases }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setActive((prev) => (prev + 1) % phrases.length);
    }, WAIT_TIME);

    return () => clearInterval(intervalRef);
  }, [phrases]);

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center w-full space-y-4">
      {/* Opening brace with "hello" */}
      <div className="text-[#10B981] font-bold text-6xl md:text-8xl lg:text-9xl mb-4">
        {`{ HELLO `}
      </div>

      {/* Animated phrases section */}
      <div className="relative h-24 flex items-center justify-center">
        {phrases.map((phrase, index) => {
          const isActive = active === index;
          return (
            <motion.div
              key={phrase}
              initial={false}
              animate={isActive ? "active" : "inactive"}
              variants={{
                active: { opacity: 1, scale: 1 },
                inactive: { opacity: 0, scale: 0 },
              }}
              className="absolute text-[#10B981] font-bold text-5xl md:text-7xl lg:text-8xl"
            >
              {phrase.toUpperCase()}
            </motion.div>
          );
        })}
      </div>

      {/* Closing brace */}
      <div className="text-[#10B981] font-bold text-6xl md:text-8xl lg:text-9xl">
        {`;}`}
      </div>
    </div>
  );
};

export default Hero;
