"use client";

import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type TeaserItem = {
  id: string | number;
  url: string;
  category?: string;
  title?: string;
  description?: string;
  href?: string;
};

type Props = {
  items: TeaserItem[];
  heading?: string;
  subheading?: string;
  ctaHref?: string;
  ctaLabel?: string;
  cardWidth?: number;
  cardHeight?: number;
  cardGap?: number;
  onItemClick?: (id: string | number) => void;
};

export default function GalleryTeaser({
  items,
  heading = "See moments from our events",
  subheading = "Swipe through highlights — tap any card to view more",
  ctaHref = "/gallery",
  ctaLabel = "View the Gallery →",
  cardWidth = 320,
  cardHeight = 220,
  cardGap = 24,
  onItemClick,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = cardWidth + cardGap;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mx-auto max-w-7xl mt-20 mb-20">
      <div className="px-4 md:px-0">
        
        {/* Header (Industrial) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b-2 border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
               <span className="h-[2px] w-8 bg-[#ea580c]"></span>
               <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">
                 Highlights
               </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">{heading}</h3>
            {subheading && <p className="mt-2 text-gray-400 text-sm md:text-base max-w-lg">{subheading}</p>}
          </div>
          
          <div className="flex gap-4">
             {/* Nav Buttons (Hard Squares) */}
             <button 
               onClick={() => scroll("left")} 
               className="bg-black border-2 border-white/20 text-white p-3 shadow-xl hover:border-[#ea580c] hover:text-[#ea580c] transition-colors"
             >
               <FiChevronLeft size={24} />
             </button>
             <button 
               onClick={() => scroll("right")} 
               className="bg-black border-2 border-white/20 text-white p-3 shadow-xl hover:border-[#ea580c] hover:text-[#ea580c] transition-colors"
             >
               <FiChevronRight size={24} />
             </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory"
          style={{ gap: `${cardGap}px` }}
        >
          {items.map((item) => (
            <div key={item.id} className="snap-start shrink-0">
              <Card
                url={item.url}
                category={item.category}
                title={item.title}
                description={item.description}
                href={item.href}
                width={cardWidth}
                height={cardHeight}
                onClick={() => onItemClick && onItemClick(item.id)}
              />
            </div>
          ))}
        </div>

        {ctaHref && (
          <div className="mt-4 flex justify-center md:justify-end">
            <a 
              href={ctaHref} 
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-white hover:text-black transition-colors"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function Card({ url, category, title, description, href, width, height, onClick }: any) {
  const content = (
    <div 
      className="relative cursor-pointer bg-[#121212] border-2 border-white/10 group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#ea580c] hover:border-white/30" 
      style={{ width, height }}
    >
      {/* Image */}
      <div className="absolute inset-0" style={{ backgroundImage: `url(${url})`, backgroundPosition: "center", backgroundSize: "cover" }}>
         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
      </div>

      {/* Content Overlay (Industrial Label) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-black/80 border-t-2 border-[#ea580c] translate-y-[60%] group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <div className="flex items-center gap-2 mb-1">
           <div className="w-2 h-2 bg-[#ea580c] rounded-full" />
           {category && <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{category}</span>}
        </div>
        {title && <p className="text-lg font-bold text-white leading-tight uppercase">{title}</p>}
        {description && <p className="mt-2 text-xs text-gray-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{description}</p>}
      </div>
    </div>
  );

  if (onClick) return <div role="button" onClick={(e) => { e.preventDefault(); onClick(); }} className="block">{content}</div>;
  if (href) return <a href={href} className="block">{content}</a>;
  return content;
}