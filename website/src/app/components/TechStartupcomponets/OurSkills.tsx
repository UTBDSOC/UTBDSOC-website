"use client";

import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import { FiCloudLightning } from "react-icons/fi";
import { CornerBlur } from "./utils/CornerBlur"; // Make sure this path is correct

interface Service {
  title: string;
  href: string;
  description: string;
}

const services: Service[] = [
  {
    title: "Website Development",
    href: "/services/websiteDevelopment",
    description: `
      We create professional, responsive websites tailored to your business needs, ranging from simple starter sites to fully customized websites with advanced features.
    `,
  },
  {
    title: "SEO Optimization",
    href: "/services/seoOptimization",
    description: `
      Improve your website's visibility on search engines with our SEO services, focusing on targeted keywords and local or national reach to drive more organic traffic.
    `,
  },
  {
    title: "Social Media Management",
    href: "/services/socialMediaManagement",
    description: `
      Enhance your social media presence with regular posts, targeted audience engagement, and brand-optimized profiles on platforms like Facebook and Instagram.
    `,
  },
  {
    title: "Content Creation",
    href: "/services/contentCreation",
    description: `
      Our team crafts high-quality content and visuals to attract and engage your target audience, including blog posts, social media graphics, and more.
    `,
  },
  {
    title: "Email Marketing (EDM)",
    href: "/services/emailMarketing",
    description: `
      Reach your audience directly with professionally designed email campaigns, tailored messaging, and regular engagement to keep your brand top of mind.
    `,
  },
  {
    title: "Area Marketing",
    href: "/services/areaMarketing",
    description: `
      We focus on hyper-local marketing efforts within a targeted radius around your business to attract customers from nearby areas and boost foot traffic.
    `,
  },
];

const OurSkills: React.FC = () => {
  return (
    <section className="w-full bg-black py-16 px-4">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
        <h1 className="text-center text-3xl md:text-4xl font-semibold text-white pb-10">
          Our Digital Marketing Services
        </h1>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <ShimmerBorderCard
                title={service.title}
                description={service.description}
              />
            </Link>
          ))}
          {/* Corner Blur Effect */}
          <CornerBlur />
        </div>
      </div>
    </section>
  );
};

interface ShimmerBorderCardProps {
  title: string;
  description: string;
}

const ShimmerBorderCard: React.FC<ShimmerBorderCardProps> = ({
  title,
  description,
}) => {
  return (
    <div className="group relative mx-auto w-full max-w-sm h-64 overflow-hidden rounded-lg bg-slate-800 p-0.5 transition-all duration-500 hover:scale-[1.01] hover:bg-slate-800/50">
      <div className="relative z-10 flex flex-col items-center justify-center h-full overflow-hidden rounded-[7px] bg-slate-900 p-6 transition-colors duration-500 group-hover:bg-slate-800">
        <FiCloudLightning className="relative z-10 mb-4 mt-2 rounded-full border-2 border-indigo-500 bg-slate-900 p-2 text-5xl text-indigo-500" />
        <h4 className="relative z-10 mb-2 w-full text-2xl font-bold text-slate-50 text-center">
          {title}
        </h4>
        <p className="relative z-10 text-sm text-slate-400 text-center">
          {description}
        </p>
      </div>

      <motion.div
        initial={{ rotate: "0deg" }}
        animate={{ rotate: "360deg" }}
        style={{ scale: 1.5 }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
};

export default OurSkills;
