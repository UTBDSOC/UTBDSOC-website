import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { CornerBlur } from "@/app/components/utils/CornerBlur";

const Stats: React.FC = () => {
  return (
    <div className="relative overflow-hidden border-y border-zinc-700 bg-zinc-900/30">
      <div className="relative z-20 mx-auto max-w-3xl px-4 py-12">
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <Stat
            num={10}
            suffix="$"
            subheading="Only $10 a day investment"
          />
          <div className="h-[1px] w-12 bg-zinc-600 sm:h-12 sm:w-[1px]" />
          <Stat
            num={20}
            suffix="%"
            subheading="Projected increase of 20%"
          />
          <div className="h-[1px] w-12 bg-zinc-600 sm:h-12 sm:w-[1px]" />
          <Stat
            num={1000}
            suffix="+"
            subheading="Reach of 1000+ potential clients"
          />
        </div>
      </div>
      <CornerBlur />
    </div>
  );
};

interface Props {
  num: number;
  suffix: string;
  decimals?: number;
  subheading: string;
}

const Stat: React.FC<Props> = ({ num, suffix, decimals = 0, subheading }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;

        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);

  return (
    <div className="flex w-72 flex-col items-center py-8 sm:py-0">
      <p className="mb-2 text-center text-7xl font-semibold text-zinc-50 sm:text-6xl">
        <span ref={ref}></span>
        <span className="text-blue-500">{suffix}</span>
      </p>
      <p className="max-w-48 text-center text-zinc-500">{subheading}</p>
    </div>
  );
};

export default Stats;
