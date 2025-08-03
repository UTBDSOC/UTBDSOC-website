import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

interface QuestionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FAQ: React.FC = () => {
  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-4 text-center text-3xl font-semibold">
          Frequently Asked Questions
        </h3>
        <Question title="What services does your agency offer?" defaultOpen>
          <p>
            Our agency provides a range of services including SEO, PPC
            advertising, social media marketing, content creation, email
            marketing, and web design to boost your digital presence.
          </p>
        </Question>
        <Question title="How do you measure the success of a campaign?">
          <p>
            We use key performance indicators (KPIs) such as website traffic,
            conversion rates, ROI, and engagement metrics to evaluate the
            effectiveness of our campaigns.
          </p>
        </Question>
        <Question title="What is your approach to SEO?">
          <p>
            Our SEO strategy involves keyword research, on-page and off-page
            optimization, content creation, and technical SEO to improve your
            website&apos;s search engine ranking.
          </p>
        </Question>
        <Question title="How long does it take to see results?">
          <p>
            The timeline for seeing results depends on the service. For example,
            PPC campaigns can deliver immediate results, while SEO efforts may
            take 3-6 months to show significant improvements.
          </p>
        </Question>
        <Question title="Can you guarantee a top spot on Google?">
          <p>
            While we cannot guarantee a specific position, we use best practices
            and proven strategies to increase your website&apos;s visibility and
            ranking over time.
          </p>
        </Question>
      </div>
    </div>
  );
};

const Question: React.FC<QuestionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-[1px] border-b-slate-300"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: { color: "rgba(3, 6, 23, 0)" },
            closed: { color: "rgba(3, 6, 23, 1)" },
          }}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-left text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: { rotate: "180deg", color: "rgb(124 58 237)" },
            closed: { rotate: "0deg", color: "#030617" },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        <div ref={ref}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;
