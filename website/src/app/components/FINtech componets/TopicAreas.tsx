import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

interface TabContent {
  tabName: string;
  topics: { id: number; title: string; description: string }[];
}

const tabData: TabContent[] = [
  {
    tabName: "BANKING & FINANCE COURSES",
    topics: [
      {
        id: 1,
        title: "Audit, Accounting & Finance",
        description:
          "Gain a complete understanding of the latest accounting standards and best practice.",
      },
      {
        id: 2,
        title: "Capital Markets & Derivatives",
        description:
          "Expand your knowledge of market dynamics, tools, and regulations in capital markets.",
      },
      {
        id: 3,
        title: "Corporate Finance",
        description:
          "Learn new tools and techniques to drive long-term growth in any economic climate.",
      },
      {
        id: 4,
        title: "Credit & Corporate Banking",
        description:
          "Develop skills to analyze, measure, and mitigate risk effectively.",
      },
      {
        id: 5,
        title: "Energy Trading & Finance",
        description:
          "Understand the complexities of energy markets and trading strategies.",
      },
      {
        id: 6,
        title: "Investment & Asset Management",
        description:
          "Learn about asset allocation, investment strategies, and portfolio management.",
      },
      {
        id: 7,
        title: "Treasury & ALM",
        description:
          "Enhance your skills in liquidity management and risk mitigation.",
      },
    ],
  },
  {
    tabName: "MANAGEMENT & PROFESSIONAL DEVELOPMENT",
    topics: [
      {
        id: 8,
        title: "Leadership Development",
        description:
          "Master skills to inspire and manage teams in dynamic business environments.",
      },
      {
        id: 9,
        title: "C-Suite & Board Education",
        description:
          "Gain expertise in executive decision-making and corporate governance.",
      },
      {
        id: 10,
        title: "Professional Development",
        description:
          "Improve skills in communication, negotiation, and personal branding.",
      },
    ],
  },
  {
    tabName: "LEGAL FINANCE COURSES",
    topics: [
      {
        id: 11,
        title: "Regulatory Compliance",
        description:
          "Understand legal frameworks to ensure compliance in financial operations.",
      },
      {
        id: 12,
        title: "Corporate Law",
        description:
          "Explore the implications of corporate legal structures on financial planning.",
      },
    ],
  },
];

export const TopicAreas: React.FC = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const topics = tabData[activeTab].topics;

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;
  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (topics.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) return;
    setOffset((prev) => prev + CARD_SIZE);
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) return;
    setOffset((prev) => prev - CARD_SIZE);
  };

  return (
    <section className="bg-white py-16">
      {/* Section Heading */}
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-extrabold text-gray-800">Topic Areas</h2>
        <p className="text-gray-600 mt-3 mb-4 max-w-2xl mx-auto">
          With unique access to the latest industry news, insights, and analysis,
          we deliver highly relevant and engaging learning programmes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mt-8 border-b border-gray-200 pb-4">
        {tabData.map((tab, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveTab(index);
              setOffset(0); // Reset carousel offset
            }}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              activeTab === index
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            {tab.tabName}
          </button>
        ))}
      </div>

      {/* Carousel Container */}
      <div className="relative mt-8 px-4 md:px-8" ref={ref}>
        <div className="mx-auto max-w-6xl">
          <motion.div
            animate={{ x: offset }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            className="flex"
          >
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="shrink-0"
                style={{ width: CARD_WIDTH, marginRight: MARGIN }}
              >
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01] p-6">
                  {/* Example placeholder image/illustration */}
                  <div className="mb-4 h-40 w-full bg-blue-100 flex items-center justify-center rounded-lg">
                    <span className="text-blue-500 font-semibold text-lg">
                      Icon / Image
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">
                    {topic.description}
                  </p>

                  <button
                    onClick={() => alert(`Clicked on ${topic.title}`)}
                    className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
                  >
                    Learn more &rarr;
                  </button>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10">
            <button
              className={`h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-md text-2xl transition-opacity ${
                CAN_SHIFT_LEFT ? "opacity-100" : "opacity-30"
              }`}
              disabled={!CAN_SHIFT_LEFT}
              onClick={shiftLeft}
            >
              <FiArrowLeft className="text-gray-700" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-10">
            <button
              className={`h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-md text-2xl transition-opacity ${
                CAN_SHIFT_RIGHT ? "opacity-100" : "opacity-30"
              }`}
              disabled={!CAN_SHIFT_RIGHT}
              onClick={shiftRight}
            >
              <FiArrowRight className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicAreas;
