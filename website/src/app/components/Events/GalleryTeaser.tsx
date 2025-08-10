"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

type TeaserItem = {
  id: string | number;
  url: string;
  category?: string;
  title?: string;
  description?: string;
  href?: string; // optional link on card click
};

type Props = {
  items: TeaserItem[];
  heading?: string;
  subheading?: string;
  ctaHref?: string;
  ctaLabel?: string;
  // Card sizing (px). Tweak if you want tighter/wider cards.
  cardWidth?: number;
  cardHeight?: number;
  cardGap?: number;
};

const BREAKPOINTS = { sm: 640, lg: 1024 };

export default function GalleryTeaser({
  items,
  heading = "See moments from our events",
  subheading = "Swipe through highlights — tap any card to view more",
  ctaHref = "/gallery",
  ctaLabel = "View the Gallery →",
  cardWidth = 320,
  cardHeight = 220,
  cardGap = 16,
}: Props) {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_SIZE = cardWidth + cardGap;

  // how many cards are fully visible at current width
  const cardBuffer = useMemo(() => {
    if (width > BREAKPOINTS.lg) return 3;
    if (width > BREAKPOINTS.sm) return 2;
    return 1;
  }, [width]);

  const maxRightOffset = useMemo(() => {
    // how far we can scroll to the right (negative x) while keeping last visible
    const hidden = Math.max(0, items.length - cardBuffer);
    return -(hidden * CARD_SIZE);
  }, [items.length, cardBuffer, CARD_SIZE]);

  const canShiftLeft = offset < 0;
  const canShiftRight = offset > maxRightOffset;

  const shiftLeft = () => canShiftLeft && setOffset((pv) => Math.min(pv + CARD_SIZE, 0));
  const shiftRight = () => canShiftRight && setOffset((pv) => Math.max(pv - CARD_SIZE, maxRightOffset));

  return (
    <section className="mx-auto max-w-6xl mt-14">
      <div className="px-2 sm:px-0">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-orange-100">{heading}</h3>
            {subheading && (
              <p className="mt-1 text-orange-200/70 text-sm md:text-base">{subheading}</p>
            )}
          </div>

          {ctaHref && (
            <a
              href={ctaHref}
              className="hidden sm:inline-block rounded-full px-4 py-2 border border-orange-500 text-orange-300 hover:bg-orange-500/10"
            >
              {ctaLabel}
            </a>
          )}
        </div>

        {/* Track */}
        <div ref={ref} className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <motion.div
            animate={{ x: offset }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="flex p-3"
            style={{ gap: `${cardGap}px` }}
          >
            {items.map((item) => (
              <Card
                key={item.id}
                url={item.url}
                category={item.category}
                title={item.title}
                description={item.description}
                href={item.href}
                width={cardWidth}
                height={cardHeight}
              />
            ))}
          </motion.div>

          {/* Nav buttons */}
          <motion.button
            type="button"
            initial={false}
            animate={{ x: canShiftLeft ? "0%" : "-120%" }}
            onClick={shiftLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 rounded-r-xl bg-black/35 border border-white/10 p-3 pl-2 text-3xl text-orange-50 backdrop-blur-sm hover:bg-black/45"
            aria-label="Scroll left"
          >
            <FiChevronLeft />
          </motion.button>

          <motion.button
            type="button"
            initial={false}
            animate={{ x: canShiftRight ? "0%" : "120%" }}
            onClick={shiftRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 rounded-l-xl bg-black/35 border border-white/10 p-3 pr-2 text-3xl text-orange-50 backdrop-blur-sm hover:bg-black/45"
            aria-label="Scroll right"
          >
            <FiChevronRight />
          </motion.button>
        </div>

        {/* Mobile CTA */}
        {ctaHref && (
          <div className="mt-4 sm:hidden">
            <a
              href={ctaHref}
              className="inline-block rounded-full px-4 py-2 border border-orange-500 text-orange-300 hover:bg-orange-500/10"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function Card({
  url,
  category,
  title,
  description,
  href,
  width,
  height,
}: {
  url: string;
  category?: string;
  title?: string;
  description?: string;
  href?: string;
  width: number;
  height: number;
}) {
  const content = (
    <div
      className="relative shrink-0 cursor-pointer rounded-2xl bg-white/5 shadow-sm ring-1 ring-white/10 transition-all hover:scale-[1.015] hover:shadow-xl"
      style={{
        width,
        height,
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-b from-black/85 via-black/55 to-black/20 p-4 md:p-6 text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
        {category && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-orange-300">
            {category}
          </span>
        )}
        {title && <p className="mt-1 text-xl md:text-2xl font-bold text-orange-50">{title}</p>}
        {description && <p className="mt-1 text-sm md:text-base text-orange-200/85 line-clamp-3">{description}</p>}
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block" target="_self" rel="noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}
