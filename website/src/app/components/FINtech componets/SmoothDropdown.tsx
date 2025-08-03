"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const SmoothDropdown: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-[1px] border-b-gray-300"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-4"
      >
        <motion.span
          variants={{
            open: { color: "rgba(79, 70, 229, 1)" },
            closed: { color: "rgba(3, 6, 23, 1)" },
          }}
          className="text-left text-lg font-medium transition-colors"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: { rotate: 180, color: "rgba(79, 70, 229, 1)" },
            closed: { rotate: 0, color: "rgba(3, 6, 23, 1)" },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? height : "0px" }}
        className="overflow-hidden transition-height duration-300"
      >
        <div ref={ref} className="py-2 text-gray-600">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SmoothDropdown;
