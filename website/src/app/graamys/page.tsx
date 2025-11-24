"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiArrowRight, FiCheck, FiAlertCircle, FiAward } from "react-icons/fi";

// ==========================================
// 🛠️ CONFIGURATION
// ==========================================
const TEST_MODE = true; 

// 1. NOMINEES
const NOMINEES: Record<string, { name: string }[]> = {
  academic: [{ name: "Ishraq K." }, { name: "Sarah T." }, { name: "Rafid A." }, { name: "Nadia H." }],
  dancer: [{ name: "Riyad M." }, { name: "Anika S." }, { name: "Zayn B." }],
  voice: [{ name: "Tahmid R." }, { name: "Farhana L." }, { name: "Sakib H." }, { name: "Labibah T." }],
  olympian: [{ name: "Zuhayr M." }, { name: "Ayesha K." }, { name: "Rahim U." }],
  gymshark: [{ name: "Tanvir A." }, { name: "Samira J." }, { name: "Eshan C." }],
  fashion: [{ name: "Maisha F." }, { name: "Nabeel Q." }, { name: "Sadia P." }],
  cook: [{ name: "Chef Kazi" }, { name: "Mumu's Kitchen" }, { name: "Spice King" }],
  event: [{ name: "Picnic 2024" }, { name: "Karaoke Night" }, { name: "Games Night" }, { name: "Eid Dinner" }],
  society: [{ name: "UTS BDSOC" }, { name: "UNSW BDSOC" }, { name: "USYD BDSOC" }, { name: "MACQ BDSOC" }],
};

// 2. CATEGORIES
const CATEGORIES = [
  { id: "academic", emoji: "📚", title: "Academic Weapon", desc: "The walking HD machine." },
  { id: "dancer", emoji: "💃", title: "Dancer of The Year", desc: "Owns every dance floor." },
  { id: "voice", emoji: "🎙️", title: "Melodious Voice", desc: "Vocal powerhouse." },
  { id: "olympian", emoji: "🥇", title: "The Olympian", desc: "Ultimate sportsperson." },
  { id: "gymshark", emoji: "💪", title: "The Gymshark", desc: "Never skips leg day." },
  { id: "fashion", emoji: "👗", title: "Fashion Icon", desc: "Never misses with a fit." },
  { id: "cook", emoji: "🍳", title: "Best Home Cook", desc: "5-star flavors." },
  { id: "event", emoji: "🎉", title: "Best Event", desc: "Defined the year." },
  { id: "society", emoji: "🇧🇩", title: "Best Society", desc: "Went above and beyond." },
];

export default function GraamysPage() {
  const [step, setStep] = useState(-1); 
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  
  const [stats, setStats] = useState<any>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!TEST_MODE) {
      const voted = localStorage.getItem("utsbdsoc_graamys_voted");
      if (voted) {
        setHasVoted(true);
        setStep(CATEGORIES.length); 
      }
    }
    fetch("/api/graamys/stats")
      .then(res => res.json())
      .then(data => { if (data.success) setStats(data.stats); });
  }, []);

  const currentCategory = CATEGORIES[step];
  const currentNominees = step >= 0 && step < CATEGORIES.length ? (NOMINEES[currentCategory.id] || []) : [];
  const progress = ((step + 1) / CATEGORIES.length) * 100;

  // --- HELPER: GET TOP 3 NOMINEES FOR CHARTS ---
  const getTopNominees = (catId: string) => {
    const catStats = stats[catId] || {};
    const nominees = NOMINEES[catId] || [];
    let totalVotes = 0;

    // 1. Build List with Counts (Including local vote)
    const list = nominees.map(n => {
      const myVote = answers[catId] === n.name ? 1 : 0;
      const count = (catStats[n.name] || 0) + myVote;
      totalVotes += count;
      return { name: n.name, count };
    });

    // 2. Sort Descending
    list.sort((a, b) => b.count - a.count);

    // 3. Take Top 3 and Add Percent
    const top3 = list.slice(0, 3).map(item => ({
      ...item,
      percent: totalVotes === 0 ? 0 : Math.round((item.count / totalVotes) * 100)
    }));

    return { top3, totalVotes };
  };

  // --- HELPER: GET INDIVIDUAL STATS (For Voting Card) ---
  const getStatsForNominee = (catId: string, name: string, allNominees: {name: string}[]) => {
    const catStats = stats[catId] || {};
    const myVote = answers[catId] === name ? 1 : 0;
    const count = (catStats[name] || 0) + myVote;

    let total = 0;
    let maxCount = 0;

    allNominees.forEach(n => {
      const nCurrent = (catStats[n.name] || 0) + (answers[catId] === n.name ? 1 : 0);
      total += nCurrent;
      if (nCurrent > maxCount) maxCount = nCurrent;
    });

    if (total === 0) return { percent: 0, isWinner: false };
    
    const percent = Math.round((count / total) * 100);
    const isWinner = count === maxCount && count > 0;

    return { percent, isWinner };
  };

  const handleSelect = (name: string) => {
    if (showResults) return; 

    const newAnswers = { ...answers, [currentCategory.id]: name };
    setAnswers(newAnswers);
    setShowResults(true);

    setTimeout(() => {
      setShowResults(false);
      if (step === CATEGORIES.length - 1) {
        submitVotes(newAnswers);
      } else {
        setStep((s) => s + 1);
      }
    }, 2000);
  };

  const submitVotes = async (finalAnswers: Record<string, string>) => {
    setIsSubmitting(true);
    try {
      await fetch("/api/graamys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalAnswers),
      });

      if (!TEST_MODE) {
        localStorage.setItem("utsbdsoc_graamys_voted", "true");
        setHasVoted(true);
      }
      setStep(CATEGORIES.length); 
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* INTRO SPLIT SCREEN (WOULD YOU RATHER STYLE) */}
      {step === -1 && !hasVoted && (
         <div className="fixed inset-0 z-50 flex flex-col md:flex-row pt-14 bg-black font-sans text-white">
            {/* LEFT */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              className="flex-1 bg-[#ea580c] flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden"
            >
               <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
               <div className="relative z-10 max-w-md">
                 <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6 text-black">
                   The <br/> Graamy's
                 </h1>
                 <p className="text-black/80 font-bold text-lg md:text-2xl uppercase tracking-wide leading-relaxed">
                   Honor the legends. <br/> Celebrate the culture.
                 </p>
               </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="flex-1 bg-[#121212] flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden"
            >
               <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
               <div className="relative z-10 max-w-md flex flex-col items-center">
                  <div className="mb-8 p-6 rounded-full bg-white/5 border-2 border-white/20">
                    

[Image of Trophy Icon]

                    <FiAward className="text-6xl text-[#ea580c]" />
                  </div>
                  <button
                    onClick={() => setStep(0)}
                    className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-12 py-5 text-xl font-black uppercase tracking-wide transition-transform hover:-translate-y-1 shadow-[6px_6px_0px_0px_#ea580c] rounded-full"
                  >
                    Start Voting
                    <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black rounded-full flex items-center justify-center border-4 border-white shadow-2xl z-20">
               <span className="text-xl font-black italic text-white">VS</span>
            </div>
         </div>
      )}

      {/* MAIN APP (VOTING + RESULTS) */}
      {(step >= 0 || hasVoted) && (
        <main className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col pt-20">
          
          {TEST_MODE && (
            <div className="fixed bottom-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl border-2 border-white flex items-center gap-2 animate-pulse">
              <FiAlertCircle size={16} />
              TEST MODE
            </div>
          )}
          
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.15),transparent_70%)] pointer-events-none" />
          <div className="absolute top-20 left-0 right-0 h-[2px] bg-[#ea580c]" />

          {/* Progress Bar */}
          {step >= 0 && step < CATEGORIES.length && !hasVoted && (
            <div className="absolute top-[82px] left-0 w-full h-2 bg-[#1a1a1a]">
              <motion.div 
                className="h-full bg-[#ea580c] shadow-[0_0_15px_#ea580c]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
            <AnimatePresence mode="wait">

              {/* --- VOTING CARD --- */}
              {step >= 0 && step < CATEGORIES.length && !hasVoted && (
                <motion.div
                  key={currentCategory.id}
                  initial={{ opacity: 0, x: 100, rotate: 2 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -100, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="w-full max-w-4xl"
                >
                  <div className="bg-[#121212] border-2 border-white/10 rounded-3xl p-6 md:p-12 shadow-[16px_16px_0px_0px_#ea580c] relative overflow-hidden">
                    <div className="text-center mb-10">
                       <div className="text-6xl mb-4 animate-bounce">{currentCategory.emoji}</div>
                       <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3 text-white">
                         {currentCategory.title}
                       </h2>
                       <p className="text-gray-400 text-sm md:text-lg font-medium">{currentCategory.desc}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {currentNominees.map((nominee, index) => {
                        const { percent, isWinner } = getStatsForNominee(currentCategory.id, nominee.name, currentNominees);
                        const isSelected = answers[currentCategory.id] === nominee.name;
                        return (
                          <motion.button
                            key={index}
                            disabled={showResults}
                            onClick={() => handleSelect(nominee.name)}
                            animate={
                              showResults 
                                ? (isWinner 
                                    ? { scale: 1.08, opacity: 1, zIndex: 20, borderColor: "#ea580c", backgroundColor: "#000" } 
                                    : { scale: 0.9, opacity: 0.3, filter: "grayscale(100%)" } 
                                  )
                                : { scale: 1, opacity: 1, filter: "grayscale(0%)" }
                            }
                            transition={{ duration: 0.5, type: "spring" }}
                            className={`
                              relative group w-full h-24 md:h-28 rounded-xl border-2 overflow-hidden transition-colors duration-300
                              ${showResults && isWinner 
                                  ? "border-[#ea580c] shadow-[0_0_30px_rgba(234,88,12,0.5)]" 
                                  : (isSelected ? "border-white" : "border-white/10 hover:border-white/40")
                              }
                              ${showResults ? "cursor-default" : "cursor-pointer bg-[#1a1a1a]"}
                            `}
                          >
                            {showResults && (
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                transition={{ duration: 1.2, ease: "circOut" }}
                                className={`absolute inset-y-0 left-0 opacity-100 z-0 ${isWinner ? "bg-[#ea580c]" : "bg-gray-700"}`}
                              />
                            )}
                            <div className="relative z-10 flex items-center justify-between w-full px-6">
                              <div className="flex items-center gap-4 text-left">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${
                                  showResults && isWinner ? "bg-black text-[#ea580c] border-black" : "bg-transparent text-white border-white/30"
                                }`}>
                                  {index + 1}
                                </div>
                                <div>
                                  <span className={`block font-black uppercase tracking-wide text-lg md:text-xl leading-none ${
                                      showResults && isWinner ? "text-black" : "text-white"
                                    }`}>
                                    {nominee.name}
                                  </span>
                                  {showResults && isWinner && (
                                    <span className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-1 mt-1">
                                      <FiAward /> Leading
                                    </span>
                                  )}
                                </div>
                              </div>
                              {showResults && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className={`text-2xl md:text-3xl font-black ${isWinner ? "text-black" : "text-white"}`}
                                >
                                  {percent}%
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- LIVE LEADERBOARD (BAR CHARTS) --- */}
              {(step === CATEGORIES.length || hasVoted) && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-6xl"
                >
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-green-500/20 border border-green-500 text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Vote Submitted
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
                      Live <span className="text-[#ea580c]">Leaderboard</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                      The race is on. Here is who is currently leading the pack.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORIES.map((cat, i) => {
                      const { top3, totalVotes } = getTopNominees(cat.id);
                      
                      return (
                        <motion.div 
                          key={cat.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-[#121212] border-2 border-white/10 p-5 rounded-xl hover:border-[#ea580c] transition-all group shadow-xl"
                        >
                           {/* Card Header */}
                           <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                              <span className="text-2xl">{cat.emoji}</span>
                              <div className="flex-1">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wide">{cat.title}</h3>
                                <p className="text-[10px] text-gray-500 font-mono uppercase">{totalVotes} Votes Cast</p>
                              </div>
                           </div>
                           
                           {/* Bar Chart */}
                           <div className="space-y-3">
                             {top3.map((nominee, idx) => (
                               <div key={idx} className="relative">
                                  <div className="flex justify-between text-xs font-bold uppercase mb-1">
                                     <span className={idx === 0 ? "text-[#ea580c]" : "text-gray-400"}>
                                       #{idx + 1} {nominee.name}
                                     </span>
                                     <span className="text-gray-500">{nominee.percent}%</span>
                                  </div>
                                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${nominee.percent}%` }}
                                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                      className={`h-full rounded-full ${idx === 0 ? "bg-[#ea580c] shadow-[0_0_10px_#ea580c]" : "bg-white/20"}`}
                                    />
                                  </div>
                               </div>
                             ))}
                             {top3.length === 0 && <p className="text-xs text-gray-600 italic text-center py-4">No votes yet</p>}
                           </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-16 flex justify-center pb-20">
                     <a href="/" className="group flex items-center gap-2 text-white font-bold uppercase tracking-widest hover:text-[#ea580c] transition-colors">
                       <span className="group-hover:-translate-x-1 transition-transform">←</span> Return Home
                     </a>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>
          <Footer />
        </main>
      )}
    </>
  );
}