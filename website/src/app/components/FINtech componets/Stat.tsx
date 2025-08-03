import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface StatProps {
  num: number;
  suffix?: string;
  decimals?: number;
  subheading: string;
}

interface StatsProps {
  stats: StatProps[];
}

export const Stats = ({ stats }: StatsProps) => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h2 className="mb-8 text-center text-xl font-bold text-indigo-900 sm:text-2xl md:mb-16">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {stats.map((stat, index) => (
          <Stat key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

const Stat = ({ num, suffix = "", decimals = 0, subheading }: StatProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView || num === undefined) return;

    const controls = animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;

        const formattedValue = Number.isFinite(value)
          ? value.toFixed(decimals)
          : '0';
        ref.current.textContent = formattedValue;
      },
    });

    return () => {
      controls.stop();
    };
  }, [num, decimals, isInView]);

  return (
    <div className="flex flex-col items-center text-center">
      <p className="mb-2 text-4xl font-bold text-indigo-700 sm:text-5xl">
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="text-neutral-600 text-sm">{subheading}</p>
    </div>
  );
};

// Default export for the Stat component
export default Stats;
