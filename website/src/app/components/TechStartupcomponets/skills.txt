import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// Define the props for the SkillLink component
interface SkillLinkProps {
  heading: string;
  subheading: string;
  imgSrc: string;
  href: string;
}

const OurSkills: React.FC = () => {
  return (
    <section className="bg-dark-green p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <SkillLink
          heading="Web Development"
          subheading="Building scalable, responsive web apps"
          imgSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          href="#"
        />
        <SkillLink
          heading="UI/UX Design"
          subheading="Crafting intuitive user experiences"
          imgSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          href="#"
        />
        <SkillLink
          heading="SEO & Marketing"
          subheading="Optimizing for visibility and growth"
          imgSrc="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
          href="#"
        />
        <SkillLink
          heading="Data Analysis"
          subheading="Making data-driven decisions"
          imgSrc="https://images.unsplash.com/photo-1517430816045-df4b7de01cfa"
          href="#"
        />
        <SkillLink
          heading="Project Management"
          subheading="Agile and efficient workflows"
          imgSrc="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
          href="#"
        />
      </div>
    </section>
  );
};

const SkillLink: React.FC<SkillLinkProps> = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [-0.5, 0.5], ["60%", "40%"]);
  const left = useTransform(mouseXSpring, [-0.5, 0.5], ["40%", "60%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-fern-green py-4 transition-colors duration-500 hover:border-reseda-green md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-bold text-beige transition-colors duration-500 group-hover:text-fern-green md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-beige transition-colors duration-500 group-hover:text-fern-green">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing ${heading}`}
      />

      <motion.div
        variants={{
          initial: { x: "25%", opacity: 0 },
          whileHover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-fern-green" />
      </motion.div>
    </motion.a>
  );
};

export default OurSkills;
