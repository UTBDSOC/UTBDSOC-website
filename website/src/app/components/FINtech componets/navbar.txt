"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiArrowRight, FiX, FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import {
  useMotionValueEvent,
  AnimatePresence,
  useScroll,
  motion,
} from "framer-motion";
import useMeasure from "react-use-measure";

interface LogoProps {
  color?: string;
}

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ComponentType;
}

interface MobileMenuLinkProps {
  children: React.ReactNode;
  href: string;
  FoldContent?: React.ComponentType;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LinkItem {
  text: string;
  href: string;
  component?: React.ComponentType;
}

const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 250 ? true : false);
  });

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 transition-all duration-300 ease-out lg:px-12 ${
        scrolled ? "shadow-lg py-3" : "shadow-none py-6"
      } bg-white`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo color="black" />
        <div className="hidden gap-6 lg:flex">
          <Links />
          <CTAs />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
};

const Logo = ({ color = "black" }: LogoProps) => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-2xl font-bold" style={{ color }}>
          YourBrand
        </span>
        <svg
          width="50"
          height="39"
          viewBox="0 0 50 39"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
          className="w-10"
        >
          <path
            d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
            stopColor={color}
          ></path>
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            stopColor={color}
          ></path>
        </svg>
      </div>
    </Link>
  );
};

const Links = () => {
  return (
    <div className="flex items-center gap-6 text-black">
      {LINKS.map((l) => (
        <NavLink key={l.text} href={l.href} FlyoutContent={l.component}>
          {l.text}
        </NavLink>
      ))}
    </div>
  );
};

const NavLink = ({ children, href, FlyoutContent }: NavLinkProps) => {
  const [open, setOpen] = useState(false);
  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
    >
      <Link href={href} className="relative font-semibold hover:text-blue-600">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-blue-500 transition-transform duration-300 ease-out"
        />
      </Link>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 border border-neutral-200 bg-white text-black shadow-lg"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-neutral-200 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTAs = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 rounded-lg border-2 border-black px-4 py-2 font-semibold text-black transition-colors hover:bg-black hover:text-white">
        <FaUserCircle />
        <span>Sign in</span>
      </button>
      <button className="rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:border-blue-600 hover:bg-blue-600">
        Get Started
      </button>
    </div>
  );
};

// nav mobile disappears when on phone view and reappear on other pages when on phone view
const MobileMenuLink = ({
  children,
  href,
  FoldContent,
  setMenuOpen,
}: MobileMenuLinkProps) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-black">
      {FoldContent ? (
        <div
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
          onClick={() => setOpen((pv) => !pv)}
        >
          <Link
            href={href}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
            }}
            className="hover:text-blue-600"
          >
            {children}
          </Link>
          <motion.div
            animate={{ rotate: open ? "180deg" : "0deg" }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <FiChevronDown />
          </motion.div>
        </div>
      ) : (
        <Link
          href={href}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(false);
          }}
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold hover:text-blue-600"
        >
          <span>{children}</span>
          <FiArrowRight />
        </Link>
      )}
      {FoldContent && (
        <motion.div
          initial={false}
          animate={{
            height: open ? height : "0px",
            marginBottom: open ? "24px" : "0px",
            marginTop: open ? "12px" : "0px",
          }}
          className="overflow-hidden"
        >
          <div ref={ref}>
            <FoldContent />
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="block lg:hidden">
      <button onClick={() => setOpen(true)} className="block text-3xl text-black">
        <FiMenu />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-0 top-0 flex h-screen w-full flex-col bg-white"
          >
            <div className="flex items-center justify-between p-6">
              <Logo color="black" />
              <button onClick={() => setOpen(false)}>
                <FiX className="text-3xl text-black" />
              </button>
            </div>
            <div className="h-screen overflow-y-scroll bg-neutral-100 p-6">
              {LINKS.map((l) => (
                <MobileMenuLink
                  key={l.text}
                  href={l.href}
                  FoldContent={l.component}
                  setMenuOpen={setOpen}
                >
                  {l.text}
                </MobileMenuLink>
              ))}
            </div>
            <div className="flex justify-end border-t border-neutral-300 bg-white p-6">
              <CTAs />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

/** FLYOUT COMPONENTS **/

const ConsultingContent = () => {
  return (
    <div className="grid h-fit w-full grid-cols-12 lg:h-72 lg:w-[600px] xl:w-[750px]">
      <div className="col-span-12 flex flex-col justify-between bg-black p-6 text-white lg:col-span-4">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Consulting</h2>
          <p className="mb-6 max-w-xs text-sm text-neutral-300">
            Expert guidance to refine your strategy, optimize processes, and
            achieve long-term goals. Our consultants bring industry insight
            tailored to your unique needs.
          </p>
        </div>
        <Link
          href="/services/Consulting"
          className="flex items-center gap-1 text-xs text-blue-300 hover:underline"
        >
          Learn more <FiArrowRight />
        </Link>
      </div>
      <div className="col-span-12 grid grid-cols-2 grid-rows-2 gap-3 bg-white p-6 lg:col-span-8">
        <Link
          href="#"
          className="rounded border-2 border-neutral-200 bg-white p-3 hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold text-black">Process Analysis</h3>
          <p className="text-xs text-black">Streamline your workflows for efficiency.</p>
        </Link>
        <Link
          href="#"
          className="rounded border-2 border-neutral-200 bg-white p-3 hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold text-black">Strategic Roadmaps</h3>
          <p className="text-xs text-black">Roadmaps to guide your organization's future.</p>
        </Link>
        <Link
          href="#"
          className="rounded border-2 border-neutral-200 bg-white p-3 hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold text-black">Financial Modeling</h3>
          <p className="text-xs text-black">Forecast, plan, and model your key metrics.</p>
        </Link>
        <Link
          href="#"
          className="rounded border-2 border-neutral-200 bg-white p-3 hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold text-black">Change Management</h3>
          <p className="text-xs text-black">Seamlessly implement organizational changes.</p>
        </Link>
      </div>
    </div>
  );
};

const AssignmentCreationContent = () => {
  return (
    <div className="w-full border border-neutral-200 bg-white p-6 lg:w-[250px]">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
        <div className="space-y-3 text-black">
          <h3 className="font-semibold">Custom Tasks</h3>
          <Link href="#" className="block text-sm hover:underline">
            Tailored Assignments
          </Link>
          <Link href="#" className="block text-sm hover:underline">
            Workflow Integration
          </Link>
        </div>
        <div className="space-y-3 text-black">
          <h3 className="font-semibold">Scalable Solutions</h3>
          <Link href="#" className="block text-sm hover:underline">
            Bulk Assignment Templates
          </Link>
          <Link href="#" className="block text-sm hover:underline">
            Automated Creation
          </Link>
          <Link href="#" className="block text-sm hover:underline">
            Content Libraries
          </Link>
        </div>
      </div>
      <button className="mt-6 w-full rounded-lg border-2 border-black px-4 py-2 font-semibold transition-colors hover:bg-black hover:text-white">
        Contact Us
      </button>
    </div>
  );
};

const ResearchContent = () => {
  return (
    <div className="grid h-fit w-full grid-cols-12 lg:h-72 lg:w-[600px] xl:w-[750px]">
      <div className="col-span-12 flex flex-col justify-between bg-black p-6 text-white lg:col-span-4">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Research</h2>
          <p className="mb-6 max-w-xs text-sm text-neutral-300">
            Our research team investigates emerging trends, technologies, and
            methodologies to keep you at the cutting edge of innovation.
          </p>
        </div>
        <Link
          href="/services/Research"
          className="flex items-center gap-1 text-xs text-blue-300 hover:underline"
        >
          Learn more <FiArrowRight />
        </Link>
      </div>
      <div className="col-span-12 grid grid-cols-2 grid-rows-2 gap-3 bg-white p-6 lg:col-span-8">
        <Link
          href="/services/Research/MarketInsights"
          className="rounded border-2 border-neutral-200 bg-white p-3 text-black hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Market Insights</h3>
          <p className="text-xs">Data-driven trends in your industry.</p>
        </Link>
        <Link
          href="/services/Research/TechEvaluations"
          className="rounded border-2 border-neutral-200 bg-white p-3 text-black hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Tech Evaluations</h3>
          <p className="text-xs">Compare tools, platforms, and frameworks.</p>
        </Link>
        <Link
          href="/services/Research/BenchmarkStudies"
          className="rounded border-2 border-neutral-200 bg-white p-3 text-black hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Benchmark Studies</h3>
          <p className="text-xs">See how you stack up against competitors.</p>
        </Link>
        <Link
          href="/services/Research/WhitepapersReports"
          className="rounded border-2 border-neutral-200 bg-white p-3 text-black hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Whitepapers & Reports</h3>
          <p className="text-xs">In-depth analysis of key findings.</p>
        </Link>
      </div>
    </div>
  );
};

const TrainingCoursesContent = () => {
  return (
    <div className="grid w-full grid-cols-12 lg:w-[750px]">
      <div className="col-span-12 flex flex-col justify-between bg-blue-600 p-6 text-white lg:col-span-4">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">Training Courses</h2>
          <p className="text-sm text-blue-100">
            Gain expertise through our comprehensive training programs. From
            introductory workshops to advanced masterclasses, we support your
            professional growth.
          </p>
        </div>
        <Link
          href="#"
          className="flex items-center gap-1 text-xs text-blue-200 hover:underline"
        >
          View All Courses <FiArrowRight />
        </Link>
      </div>
      <div className="col-span-12 grid grid-cols-1 gap-3 bg-white p-6 text-black lg:col-span-8 lg:grid-cols-3">
        <div className="space-y-3">
          <h3 className="font-semibold">Banking & Finance</h3>
          <div className="space-y-2">
            <Link href="#" className="block text-sm hover:underline">
              Audit, Accounting & Finance
            </Link>
            <Link href="#" className="block text-sm hover:underline">
              Corporate Finance
            </Link>
            <Link href="#" className="block text-sm hover:underline">
              Credit & Corporate Banking
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold">Management & Professional Development</h3>
          <div className="space-y-2">
            <Link href="#" className="block text-sm hover:underline">
              Management & Leadership Development
            </Link>
            <Link href="#" className="block text-sm hover:underline">
              Professional Development
            </Link>
            <Link href="#" className="block text-sm hover:underline">
              C-Suite & Board Education
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold">Legal Finance Training</h3>
          <div className="space-y-2">
            <Link href="#" className="block text-sm hover:underline">
              Drafting & Negotiating Contracts
            </Link>
            <Link href="#" className="block text-sm hover:underline">
              Loan Documentation School
            </Link>
            <Link href="#" className="block text-sm hover:underline">
              Investment Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/** LINKS ARRAY **/

const LINKS: LinkItem[] = [
  {
    text: "Consulting",
    href: "/services/Consulting",
    component: ConsultingContent,
  },
  {
    text: "Assignment Creation",
    href: "/services/AssignmentCreation",
    component: AssignmentCreationContent,
  },
  {
    text: "Research",
    href: "/services/Research",
    component: ResearchContent,
  },
  {
    text: "Training Courses",
    href: "/services/TrainingCourses",
    component: TrainingCoursesContent,
  },
];

export default FlyoutNav;
