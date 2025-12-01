"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Swapped to Lucide for the preview environment to ensure icons render
import { ArrowRight as FiArrowRight, Check as FiCheck, AlertCircle as FiAlertCircle, Trophy as FaTrophy, Trophy as FiTrophy } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ==========================================
// 🛠️ CONFIGURATION
// ==========================================
const TEST_MODE = false; // Set to true to enable test mode (no localStorage check)

// 1. TYPES
type Nominee = {
  name: string;
};

type Category = {
  id: string;
  emoji: string;
  title: string;
  desc: string;
};

type Stats = Record<string, Record<string, number>>;

// 2. NOMINEES
const NOMINEES: Record<string, Nominee[]> = {
  academic: [
    { name: "Labib" },
    { name: "Mahir Abdullah" },
    { name: "Fabiha Anbar" },
    { name: "Ornab Aziz Chowdhury" },
    { name: "Faheem Haque" },
    { name: "Borno Labib" },
  ],
  dancer: [
    { name: "Wasif Mamun" },
    { name: "Fabiha Anbar" },
    { name: "Labib Ahmed" },
    { name: "Leo Chowdury" },
    { name: "Orchi" },
  ],
  voice: [
    { name: "Jawad" },
    { name: "Labib" },
    { name: "Aosaf Zawad" },
    { name: "Turab" },
    { name: "Borno Labib" },
  ],
  olympian: [
    { name: "Jahin Zawad" },
    { name: "Faheem Haque" },
    { name: "Nisar" },
    { name: "Borno Labib" },
  ],
  gymshark: [
    { name: "Tamzid Zakaria" },
    { name: "Ainif" },
    { name: "Faheem Haque" },
    { name: "Jahin Zawad" },
    { name: "Mahir" },
    { name: "Mushfique" },
  ],
  fashion: [
    { name: "Tamzid Zakaria" },
    { name: "Rudmila Raisa" },
    { name: "Aosaf Zawad" },
    { name: "Ainif" },
    { name: "Faheem Haque" },
    { name: "Jawad" },
    { name: "Borno Labib" },
    { name: "Sharafat" },
  ],
  cook: [
    { name: "Aosaf Zawad" },
    { name: "Jawad" },
    { name: "Nisar Hossain" },
    { name: "Tasnim Snita" },
  ],
  event: [
    { name: "UTS BDSOC - Chaad Raat" },
    { name: "UTS Karaoke" },
    { name: "Rajarbari Ball" },
    { name: "The Graamys" },
    { name: "Games night" }
  ],
  society: [
    { name: "UTS Bangladeshi Society" },
    { name: "UNSW Bangladeshi Society" },
    { name: "Seddon FC" },
  ],
};

// 3. CATEGORIES
const CATEGORIES: Category[] = [
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
  const [step, setStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const [stats, setStats] = useState<Stats>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    if (!TEST_MODE) {
      const voted = localStorage.getItem("utsbdsoc_graamys_voted");
      if (voted) {
        setHasVoted(true);
        setStep(CATEGORIES.length);
      }
    }
    // Mock fetch for stats
    // fetch("/api/graamys/stats")
    //   .then(res => res.json())
    //   .then(data => { if (data.success) setStats(data.stats); });
  }, []);

  const currentCategory = CATEGORIES[step];
  const currentNominees = step >= 0 && step < CATEGORIES.length ? (NOMINEES[currentCategory.id] || []) : [];
  const progress = ((step + 1) / CATEGORIES.length) * 100;

  // --- HELPER: GET TOP 3 NOMINEES FOR CHARTS ---
  const getTopNominees = (catId: string) => {
    const catStats = stats[catId] || {};
    const nominees = NOMINEES[catId] || [];
    let totalVotes = 0;

    const list = nominees.map(n => {
      const myVote = answers[catId] === n.name ? 1 : 0;
      const count = (catStats[n.name] || 0) + myVote;
      totalVotes += count;
      return { name: n.name, count };
    });

    list.sort((a, b) => b.count - a.count);

    const top3 = list.slice(0, 3).map(item => ({
      ...item,
      percent: totalVotes === 0 ? 0 : Math.round((item.count / totalVotes) * 100)
    }));

    return { top3, totalVotes };
  };

  // --- HELPER: GET INDIVIDUAL STATS ---
  const getStatsForNominee = (catId: string, name: string, allNominees: Nominee[]) => {
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
      // await new Promise(resolve => setTimeout(resolve, 1500));

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
      {/* Global Navbar */}
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col pt-20">

        {TEST_MODE && (
          <div className="fixed bottom-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl border-2 border-white flex items-center gap-2 animate-pulse">
            <FiAlertCircle size={16} />
            TEST MODE
          </div>
        )}

        {/* Background FX */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 left-0 right-0 h-[2px] bg-[#ea580c]" />

        {/* PROGRESS BAR */}
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

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 w-full">
          <AnimatePresence mode="wait">

            {/* --- NEW HYPE INTRO SCREEN --- */}
            {step === -1 && !hasVoted && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                className="relative w-full max-w-5xl flex flex-col items-center justify-center min-h-[70vh]"
              >
                {/* Marquee Background */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.03] font-black text-[200px] whitespace-nowrap pointer-events-none select-none leading-none overflow-hidden">
                  <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex gap-10"
                  >
                    <span>VOTE NOW</span><span>VOTE NOW</span><span>VOTE NOW</span><span>VOTE NOW</span>
                  </motion.div>
                </div>

                {/* --- 🏆 UPDATED TROPHY SECTION START --- */}
                <div className="relative mb-12 group cursor-default">
                  {/* Outer Rotating Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-24px] rounded-full border border-[#ea580c]/20 border-dashed z-0"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-12px] rounded-full border border-[#ea580c]/10 z-0"
                  />

                  {/* Pulsing Background */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-[#ea580c] blur-[60px] rounded-full opacity-40"
                  />

                  {/* Main Container */}
                  <div className="relative bg-black border-4 border-[#ea580c] p-10 rounded-full shadow-[0_0_50px_rgba(234,88,12,0.4)] z-10 overflow-hidden">
                    {/* Floating Trophy */}
                    <motion.div
                      animate={{
                        y: [-8, 8, -8],
                        filter: ["brightness(1) drop-shadow(0 0 0px rgba(234,88,12,0))", "brightness(1.2) drop-shadow(0 0 20px rgba(234,88,12,0.5))", "brightness(1) drop-shadow(0 0 0px rgba(234,88,12,0))"]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FaTrophy size={80} className="text-[#ea580c]" />
                    </motion.div>

                    {/* Glossy Sheen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-full" />
                  </div>
                </div>
                {/* --- 🏆 UPDATED TROPHY SECTION END --- */}

                {/* Kinetic Typography */}
                <h1 className="text-center mb-10 z-10">
                  <span className="block text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-widest mb-2">
                    THE 2025
                  </span>
                  <span className="block text-7xl md:text-9xl font-black text-[#ea580c] tracking-tighter uppercase leading-[0.85] drop-shadow-[0_10px_0_rgba(0,0,0,1)]">
                    GRAAMY'S
                  </span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-300 max-w-xl text-center mb-12 font-medium z-10">
                  Who defined the year? <br /> <span className="text-white border-b-2 border-[#ea580c]">YOU</span> decide the legends.
                </p>

                <button
                  onClick={() => setStep(0)}
                  className="group relative inline-flex items-center justify-center gap-4 bg-white text-black px-14 py-6 text-xl font-black uppercase tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] active:scale-95 rounded-full z-10"
                >
                  Cast Your Vote
                  <div className="bg-black rounded-full p-1">
                    <FiArrowRight className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

              </motion.div>
            )}

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
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${showResults && isWinner ? "bg-black text-[#ea580c] border-black" : "bg-transparent text-white border-white/30"
                                }`}>
                                {index + 1}
                              </div>
                              <div>
                                <span className={`block font-black uppercase tracking-wide text-lg md:text-xl leading-none ${showResults && isWinner ? "text-black" : "text-white"
                                  }`}>
                                  {nominee.name}
                                </span>
                                {showResults && isWinner && (
                                  <span className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-1 mt-1">
                                    <FiTrophy size={10} /> Leading
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

            {/* --- 3. LIVE LEADERBOARD --- */}
            {/* {(step === CATEGORIES.length || hasVoted) && (
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
                          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                            <span className="text-2xl">{cat.emoji}</span>
                            <div className="flex-1">
                              <h3 className="text-sm font-bold text-white uppercase tracking-wide">{cat.title}</h3>
                              <p className="text-[10px] text-gray-500 font-mono uppercase">{totalVotes} Votes Cast</p>
                            </div>
                          </div>
                          
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
            )} */}

            {/* --- 4. VOTE CONFIRMATION --- */}
            {(step === CATEGORIES.length || hasVoted) && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl text-center"
              >
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 text-green-500 mb-6 animate-bounce">
                    <FiCheck size={48} />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
                    Vote <span className="text-green-500">Submitted</span>
                  </h2>
                  <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                    Thank you for casting your votes for the 2025 Graamy's. Your voice has been heard.
                  </p>
                </div>

                <div className="flex justify-center">
                  <a href="/" className="group flex items-center gap-2 text-white font-bold uppercase tracking-widest hover:text-[#ea580c] transition-colors bg-[#121212] border border-white/20 px-8 py-4 rounded-full hover:border-[#ea580c]">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Return Home
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}