'use client';
import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative py-32 bg-black text-[#3B82F6]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center md:text-left">
          <span className="inline-block px-6 py-2 text-sm font-semibold border rounded-full border-[#3B82F6] mb-6">
            OUR AGENCY
          </span>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8 text-white">
            Rank2Revenue transforms your online presence, driving measurable
            growth and empowering brands to become market leaders.
          </h2>
          <div className="flex items-center max-w-3xl">
            {/* Standout Line */}
            <span className="block w-96 h-1 bg-[#3B82F6] mr-6"></span>
            <p className="text-lg md:text-xl text-gray-300">
              We take a results-driven approach, using proven digital marketing
              strategies and innovative techniques to maximize conversion rates.
              Our expert team works closely with your brand to turn visitors
              into loyal customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
