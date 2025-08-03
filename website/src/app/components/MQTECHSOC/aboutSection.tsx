'use client';
import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative py-32 bg-gray-900 text-[#10B981]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center md:text-left">
          <span className="inline-block px-6 py-2 text-sm font-semibold border rounded-full border-[#10B981] mb-6">
            ABOUT US
          </span>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8 text-white">
            Empowering Innovators, Connecting Tech Enthusiasts
          </h2>
          <div className="flex items-center max-w-3xl">
            {/* Standout Line */}
            <span className="block w-96 h-1 bg-[#10B981] mr-6"></span>
            <p className="text-lg md:text-xl text-gray-300">
              Our tech society brings together students and professionals to
              explore, innovate, and grow. Through workshops, hackathons, and
              networking events, we foster a collaborative environment that
              empowers members to excel in the tech industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
