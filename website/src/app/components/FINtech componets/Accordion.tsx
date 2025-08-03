"use client"; // For Next.js (if using app router)

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const AccordionOnly = () => {
  const sections = [
    {
      id: "compliant",
      title: "Stay compliant, reduce risk, and secure data",
      content:
        "Leverage built-in compliance tools and moderation features to protect sensitive data and reduce legal, financial, and reputational risk.",
      image: "https://via.placeholder.com/400x300", // Example image path
    },
    {
      id: "reputation",
      title: "Never miss a thing and safeguard your reputation",
      content:
        "Real-time monitoring and alerts ensure your team can respond quickly to any issue, keeping your brand image intact.",
      image: "https://via.placeholder.com/400x300", // Example image path
    },
    {
      id: "thought-leaders",
      title: "Turn executives into thought leaders",
      content:
        "Empower your leadership team to share content confidently while staying on-brand and compliant with regulatory requirements.",
      image: "https://via.placeholder.com/400x300", // Example image path
    },
  ];

  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="relative px-6 py-16">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {sections.map((section) => (
            <Question
              key={section.id}
              title={section.title}
              isActive={activeSection === section.id}
              onClick={() =>
                setActiveSection((prev) =>
                  prev === section.id ? null : section.id
                )
              }
            >
              <p>{section.content}</p>
            </Question>
          ))}
        </div>

        {/* Dynamic Image Section */}
        <div className="hidden lg:flex items-center justify-center">
          {sections.map(
            (section) =>
              activeSection === section.id && (
                <motion.img
                  key={section.id}
                  src={section.image}
                  alt={section.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="w-full max-w-lg rounded-lg shadow-lg"
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

const Question = ({
  title,
  children,
  isActive,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={isActive ? "open" : "closed"}
      className="border-b-[1px] border-b-slate-300"
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: { color: "rgb(124 58 237)" },
            closed: { color: "#030617" },
          }}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-left text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: { rotate: 180, color: "rgb(124 58 237)" },
            closed: { rotate: 0, color: "#030617" },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isActive ? height : 0,
          marginBottom: isActive ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        <div ref={ref}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default AccordionOnly;
