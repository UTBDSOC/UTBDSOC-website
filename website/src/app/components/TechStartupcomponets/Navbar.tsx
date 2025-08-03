"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimate, motion } from "framer-motion";
import Link from "next/link";
import { FiMenu, FiArrowUpRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const Navbar = () => {
  return (
    <section
      className="relative h-[1vh] w-full bg-black z-[1000] rounded-t-lg"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23171717'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <GlassNavigation />
   
    </section>
  );
};

const GlassNavigation = () => {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [scope, animate] = useAnimate();
  const navRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    const { offsetX, offsetY, target } = event as MouseEvent & {
      target: HTMLElement;
    };
    const isNavElement = target.classList.contains("glass-nav");
    if (isNavElement) {
      setHovered(true);
      const top = `${offsetY}px`;
      const left = `${offsetX}px`;
      animate(scope.current, { top, left }, { duration: 0 });
    } else {
      setHovered(false);
    }
  };

  useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (navElement) {
        navElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: hovered ? "none" : "auto" }}
      className="glass-nav fixed left-0 right-0 top-0 z-[1000] mx-auto max-w-6xl rounded-lg border-[1px] border-white/10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl"
    >
      <div className="glass-nav flex items-center justify-between px-5 py-5 rounded-lg">
        <Cursor hovered={hovered} scope={scope} />
        <Links />
        <Logo />
        <Buttons setMenuOpen={setMenuOpen} />
      </div>
      <MobileMenu menuOpen={menuOpen} />
    </nav>
  );
};

const Cursor = ({ hovered, scope }: { hovered: boolean; scope: React.RefObject<HTMLSpanElement> }) => (
  <motion.span
    initial={false}
    animate={{
      opacity: hovered ? 1 : 0,
      transform: `scale(${hovered ? 1 : 0}) translateX(-50%) translateY(-50%)`,
    }}
    transition={{ duration: 0.15 }}
    ref={scope}
    className="pointer-events-none absolute z-50 grid h-[50px] w-[50px] origin-[0px_0px] place-content-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400"
  >
    <FiArrowUpRight className="text-white" />
  </motion.span>
);

const Logo = () => (
  <span className="pointer-events-none relative left-0 top-[50%] z-50 text-4xl font-black text-white mix-blend-overlay md:absolute md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%]">
    logo.
  </span>
);

const Links = () => (
  <div className="hidden items-center gap-2 md:flex">
    {[
      { text: "Home", href: "/" },
      { text: "Services", href: "/services" },
      { text: "Work", href: "/work" },
      { text: "About", href: "/about" },
      { text: "Blog", href: "/blog" },
    ].map(({ text, href }) => (
      <GlassLink key={text} text={text} href={href} />
    ))}
  </div>
);

const GlassLink = ({ text, href }: { text: string; href: string }) => (
  <Link href={href} legacyBehavior>
    <a className="group relative scale-100 rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95">
      <span className="relative z-50 text-white/90 transition-colors group-hover:text-white">
        {text}
      </span>
      <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </a>
  </Link>
);

const Buttons = ({ setMenuOpen }: { setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) => (
  <div className="flex items-center gap-4">
    <div className="hidden md:block">
      <SignInButton />
    </div>
    <Link href="/contact" legacyBehavior>
      <a className="relative scale-100 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-400 px-4 py-2 font-medium text-white transition-transform hover:scale-105 active:scale-95">
        Contact Us
      </a>
    </Link>
    <button
      onClick={() => setMenuOpen((prev) => !prev)}
      className="ml-2 block text-3xl text-white/90 transition-all hover:scale-105 hover:text-white active:scale-95 md:hidden"
    >
      <FiMenu />
    </button>
  </div>
);

const SignInButton = () => (
  <button className="group relative scale-100 rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95">
    <span className="relative z-50 text-white/90 transition-colors group-hover:text-white">
      Sign in
    </span>
    <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
  </button>
);

const MobileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  const [ref, { height }] = useMeasure();
  return (
    <motion.div
      initial={false}
      animate={{ height: menuOpen ? height : "0px" }}
      className="block overflow-hidden md:hidden"
    >
      <div ref={ref} className="flex flex-col items-start gap-4 px-4 pb-4">
        {[
          { text: "Home", href: "/" },
          { text: "Services", href: "/services" },
          { text: "Work", href: "/work" },
          { text: "About", href: "/about" },
          { text: "Blog", href: "/blog" },
        ].map(({ text, href }) => (
          <TextLink key={text} text={text} href={href} />
        ))}
        <SignInButton />
      </div>
    </motion.div>
  );
};

const TextLink = ({ text, href }: { text: string; href: string }) => (
  <Link href={href} legacyBehavior>
    <a className="text-white/90 transition-colors hover:text-white">{text}</a>
  </Link>
);

export default Navbar;
