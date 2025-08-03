"use client"; // Required for client-side interactivity in Next.js 13+ App Router

import React from "react";
import Image from "next/image";

interface ServicesSectionProps {
  title: string;
  description: string;
  items: string[];
  imageSrc: string;
  reverse?: boolean; // Optional prop to reverse the order
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title,
  description,
  items,
  imageSrc,
  reverse = false,
}) => {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Flex-based layout instead of grid for a layout closer to the screenshot */}
        <div
          className={`flex flex-col md:flex-row items-center gap-8 ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base text-gray-700 sm:text-lg">
              {description}
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              {items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-green-600">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={imageSrc}
              width={600}
              height={400}
              className="rounded shadow-md"
              alt="Service Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
