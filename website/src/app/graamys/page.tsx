"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import { FiArrowRight, FiCheck } from "react-icons/fi";

// --- DATA: CATEGORIES ---
const CATEGORIES = [
  {
    id: "academic",
    emoji: "📚",
    title: "Academic Weapon",
    desc: "For the student who demolishes every quiz, exam, and assignment with quiet confidence. The walking HD machine who makes academic slay look effortless.",
  },
  {
    id: "dancer",
    emoji: "💃",
    title: "Dancer of The Year",
    desc: "For the person who owns every dance floor with their energy and moves. The one who turns every beat into a performance.",
  },
  {
    id: "voice",
    emoji: "🎙️",
    title: "Melodious Voice",
    desc: "For the vocal powerhouse whose voice sounds like pure magic, whether on stage or humming in the back of class.",
  },
  {
    id: "olympian",
    emoji: "🥇",
    title: "The Olympian",
    desc: "For the ultimate sportsperson whose dedication, hustle, and athletic energy inspires everyone around them.",
  },
  {
    id: "gymshark",
    emoji: "💪",
    title: "The Gymshark",
    desc: "For the person who practically lives at the gym and never skips leg day. Their discipline motivates us all.",
  },
  {
    id: "fashion",
    emoji: "👗",
    title: "Fashion Icon",
    desc: "For the trendsetter who never misses with a fit. Their style photos belong on a moodboard.",
  },
  {
    id: "cook",
    emoji: "🍳",
    title: "Best Home Cook",
    desc: "For the chef whose food cures homesickness. The person who turns every kitchen into a 5-star restaurant.",
  },
  {
    id: "event",
    emoji: "🎉",
    title: "Best Event of The Year",
    desc: "For the event that defined the year. Picnic? Karaoke? Games Night? Which one brought the community together best?",
  },
  {
    id: "society",
    emoji: "🇧🇩",
    title: "Best Society",
    desc: "For the society that went above and beyond. (Hint: We hope it's us, but you decide!)",
  },
];

export default function GraamysPage() {
  // State
  const [step, setStep] = useState(-1); // -1 = Intro, 0-8 = Categories, 9 = Success
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // --- CHECK FOR PREVIOUS VOTE ---
  useEffect(() => {
    const voted = localStorage.getItem("utsbdsoc_graamys_voted");
    if (voted) {
      setHasVoted(true);
      setStep(CATEGORIES.length); // Jump straight to success screen
    }
  }, []);

  const currentCategory = CATEGORIES[step];
  const progress = ((step + 1) / CATEGORIES.length) * 100;

  const handleNext = () => {
    if (step >= 0 && step < CATEGORIES.length) {
      // Save answer locally
      const newAnswers = { ...answers, [currentCategory.id]: currentInput };
      setAnswers(newAnswers);
      setCurrentInput(""); // Reset input

      // If it's the last step, submit
      if (step === CATEGORIES.length - 1) {
        submitVotes(newAnswers);
      } else {
        setStep((s) => s + 1);
      }
    } else {
      // From intro screen
      setStep((s) => s + 1);
    }
  };

  const submitVotes = async (finalAnswers: Record<string, string>) => {
    setIsSubmitting(true);
    
    try {
      // SEND TO API
      await fetch("/api/graamys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalAnswers),
      });

      // MARK AS VOTED
      localStorage.setItem("utsbdsoc_graamys_voted", "true");
      setHasVoted(true);
      
      setStep(CATEGORIES.length); // Go to success screen
    } catch (error) {
      console.error("Failed to submit votes", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col pt-20">
        
        {/* Background FX */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 left-0 right-0 h-[2px] bg-[#ea580c]" />

        {/* PROGRESS BAR (Only during voting) */}
        {step >= 0 && step < CATEGORIES.length && !hasVoted && (
          <div className="absolute top-[82px] left-0 w-full h-2 bg-[#1a1a1a]">
            <motion.div 
              className="h-full bg-[#ea580c] shadow-[0_0_10px_#ea580c]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
          <AnimatePresence mode="wait">
            
            {/* --- INTRO SCREEN --- */}
            {step === -1 && !hasVoted && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl w-full text-center"
              >
                <div className="inline-block mb-6 p-4 rounded-full border-4 border-[#ea580c] bg-black shadow-[0_0_40px_rgba(234,88,12,0.4)]">
                  <span className="text-6xl">🏆</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
                  The <span className="text-[#ea580c]">Graamy's</span>
                </h1>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  The UTS Bangladeshi Society is back with the ultimate end-of-year celebration. 
                  But what's an awards night without nominations? 
                  <br/><br/>
                  It's time to cast your votes for the <strong className="text-white">Legends of 2025</strong>.
                </p>
                
                <div className="flex flex-col gap-4 items-center">
                  <button
                    onClick={() => setStep(0)}
                    className="group relative inline-flex items-center justify-center gap-3 bg-[#ea580c] text-black px-12 py-5 text-lg font-black uppercase tracking-wide transition-transform hover:-translate-y-1 shadow-[6px_6px_0px_0px_white] active:translate-y-0 active:shadow-[2px_2px_0px_0px_white] rounded-full border-2 border-black"
                  >
                    Start Nominating
                    <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mt-4">
                    03 December 2025 • Bayview Miller's Point
                  </p>
                </div>
              </motion.div>
            )}

            {/* --- VOTING STEPS --- */}
            {step >= 0 && step < CATEGORIES.length && !hasVoted && (
              <motion.div
                key={currentCategory.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-xl"
              >
                <div className="bg-[#121212] border-2 border-white/10 rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_#ea580c] relative">
                  {/* Category Count */}
                  <div className="absolute top-6 right-8 text-[#ea580c] font-black text-xl opacity-50">
                    {step + 1} / {CATEGORIES.length}
                  </div>

                  <div className="text-6xl mb-6">{currentCategory.emoji}</div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">
                    {currentCategory.title}
                  </h2>
                  <p className="text-gray-400 font-medium leading-relaxed mb-8">
                    {currentCategory.desc}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#ea580c] mb-2">
                        Your Nomination
                      </label>
                      <input
                        autoFocus
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        placeholder="Type name here..."
                        className="w-full bg-black border-2 border-white/20 rounded-xl px-6 py-4 text-xl font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#ea580c] focus:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all"
                        onKeyDown={(e) => e.key === "Enter" && currentInput && handleNext()}
                      />
                    </div>

                    <div className="flex justify-between items-center pt-4">
                       {step > 0 && (
                         <button 
                           onClick={() => setStep(s => s - 1)}
                           className="text-gray-500 font-bold uppercase text-xs hover:text-white transition-colors"
                         >
                           ← Back
                         </button>
                       )}
                       <button
                        onClick={handleNext}
                        disabled={!currentInput.trim() || isSubmitting}
                        className={`ml-auto flex items-center gap-2 px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all ${
                          currentInput.trim() 
                            ? "bg-white text-black shadow-[4px_4px_0px_0px_#ea580c] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#ea580c]" 
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}
                      >
                        {isSubmitting ? "Saving..." : (step === CATEGORIES.length - 1 ? "Submit" : "Next")}
                        {!isSubmitting && <FiArrowRight />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- SUCCESS SCREEN --- */}
            {(step === CATEGORIES.length || hasVoted) && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-xl"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500 text-black mb-8 shadow-[0_0_40px_rgba(34,197,94,0.6)]">
                  <FiCheck size={48} strokeWidth={4} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                  Nominations <br/><span className="text-green-500">Locked In!</span>
                </h2>
                <p className="text-xl text-gray-400 mb-10">
                  Thanks for voting. Keep an eye on our Instagram for the shortlist reveal. See you at the Red Carpet! 💃🕺
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://instagram.com/utsbdsoc" 
                    target="_blank"
                    className="px-8 py-3 rounded-full border-2 border-white font-bold uppercase hover:bg-white hover:text-black transition-colors"
                  >
                    Check Instagram
                  </a>
                  <a 
                    href="/"
                    className="px-8 py-3 rounded-full bg-[#ea580c] text-black font-bold uppercase hover:bg-[#c2410c] transition-colors"
                  >
                    Back Home
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
        <Footer />
      </main>
    </>
  );
}