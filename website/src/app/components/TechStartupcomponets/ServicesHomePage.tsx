'use client';

import React from 'react';
import Link from 'next/link';

const ServicesHomePage: React.FC = () => {
  const services = [
    {
      title: 'Website Development',
      href: '/services/websiteDevelopment',
      description: `
        We create professional, responsive websites tailored to your business needs, ranging from simple starter sites to fully customized websites with advanced features.
      `,
    },
    {
      title: 'SEO Optimization',
      href: '/services/seoOptimization',
      description: `
        Improve your website's visibility on search engines with our SEO services, focusing on targeted keywords and local or national reach to drive more organic traffic.
      `,
    },
    {
      title: 'Social Media Management',
      href: '/services/socialMediaManagement',
      description: `
        Enhance your social media presence with regular posts, targeted audience engagement, and brand-optimized profiles on platforms like Facebook and Instagram.
      `,
    },
    {
      title: 'Content Creation',
      href: '/services/contentCreation',
      description: `
        Our team crafts high-quality content and visuals to attract and engage your target audience, including blog posts, social media graphics, and more.
      `,
    },
    {
      title: 'Email Marketing (EDM)',
      href: '/services/emailMarketing',
      description: `
        Reach your audience directly with professionally designed email campaigns, tailored messaging, and regular engagement to keep your brand top of mind.
      `,
    },
    {
      title: 'Area Marketing',
      href: '/services/areaMarketing',
      description: `
        We focus on hyper-local marketing efforts within a targeted radius around your business to attract customers from nearby areas and boost foot traffic.
      `,
    },
  ];

  return (
    <section className="w-full bg-[#F8EFEA] py-16 px-4">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
        <h1 className="text-center text-3xl md:text-4xl font-semibold text-[#8B5E3C] pb-10">
          Our Digital Marketing Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative block h-64 sm:h-72 transition-all duration-300"
            >
              <span className="absolute inset-0 border border-dashed border-[#8B5E3C] rounded-xl transition-transform duration-300 transform group-hover:scale-105"></span>

              <div className="relative flex h-full items-end border border-[#8B5E3C] bg-[#4B3832] rounded-xl p-6 transition-transform duration-300 transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="w-full text-center transition-opacity duration-300 group-hover:opacity-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 sm:h-12 sm:w-12 text-[#8B5E3C] mx-auto mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-[#F8EFEA]">{service.title}</h3>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[#4B3832] bg-opacity-90 rounded-xl text-center">
                  <h3 className="text-lg font-semibold text-[#F8EFEA]">{service.title}</h3>
                  <p className="mt-2 text-sm text-[#D1B7A1] whitespace-pre-line">
                    {service.description}
                  </p>
                  <p className="mt-6 font-bold text-[#8B5E3C]">Read more</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHomePage;
