'use client';

import React from 'react';
import Link from 'next/link';

const ServicesCards: React.FC = () => {
  const services = [
    {
      title: 'Workshops',
      href: '#',
      description: `
        Participate in engaging workshops designed to enhance your skills and knowledge in various fields, hosted by experienced professionals.
      `,
    },
    {
      title: 'Networking Events',
      href: '#',
      description: `
        Connect with like-minded individuals, alumni, and industry professionals to build meaningful relationships and expand your network.
      `,
    },
    {
      title: 'Social Gatherings',
      href: '#',
      description: `
        Join our fun and interactive social events to meet new people, make friends, and strengthen the sense of community within the society.
      `,
    },
    {
      title: 'Competitions',
      href: '#',
      description: `
        Showcase your talents and compete in exciting challenges, ranging from hackathons to sports tournaments, with amazing prizes to be won.
      `,
    },
    {
      title: 'Volunteer Opportunities',
      href: '#',
      description: `
        Give back to the community by participating in our volunteering initiatives, making a positive impact while gaining valuable experience.
      `,
    },
    {
      title: 'Guest Lectures',
      href: '#',
      description: `
        Learn from inspiring guest speakers who share their experiences, insights, and expertise in various domains.
      `,
    },
  ];

  return (
    <section className="w-full bg-black py-16 px-4">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
        <h1 className="text-center text-3xl md:text-4xl font-semibold text-orange-500 pb-10">
          Our Society Activities
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative block h-64 sm:h-72 transition-all duration-300"
            >
              <span className="absolute inset-0 border border-dashed border-orange-500 rounded-xl transition-transform duration-300 transform group-hover:scale-105"></span>

              <div className="relative flex h-full items-end border border-orange-500 bg-orange-500 rounded-xl p-6 transition-transform duration-300 transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="w-full text-center transition-opacity duration-300 group-hover:opacity-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 sm:h-12 sm:w-12 text-black mx-auto mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* Your SVG icon paths here */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-black">{service.title}</h3>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black bg-opacity-90 rounded-xl text-center">
                  <h3 className="text-lg font-semibold text-orange-500">{service.title}</h3>
                  <p className="mt-2 text-sm text-orange-300 whitespace-pre-line">
                    {service.description}
                  </p>
                  <p className="mt-6 font-bold text-orange-500">Read more</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;