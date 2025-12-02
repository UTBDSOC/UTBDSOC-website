"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Swapped to Lucide for the preview environment to ensure icons render
import { ArrowRight as FiArrowRight, Check as FiCheck, AlertCircle as FiAlertCircle, Trophy as FaTrophy, Trophy as FiTrophy, Clock as FiClock, Lock as FiLock, Sparkles as FiSparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ==========================================
// 🛠️ CONFIGURATION
// ==========================================
const TEST_MODE = false; // Set to true to enable the debug panel

// Dates for 2025 (as per user context)
// Month is 0-indexed in JS Date (0 = Jan, 11 = Dec)
const VOTING_END = new Date(2025, 11, 3, 17, 30, 0); // Dec 3rd, 5:30 PM
const LEADERBOARD_START = new Date(2025, 11, 3, 20, 30, 0); // Dec 3rd, 8:30 PM

// 1. TYPES
type Nominee = {
  name: string;
};

type Category = {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  items?: string[];
};

type Stats = Record<string, Record<string, number>>;

type Stage = "VOTING" | "INTERIM" | "LEADERBOARD";

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

  // Time & Stage State
  const [now, setNow] = useState<Date>(new Date());
  const [stage, setStage] = useState<Stage>("VOTING");
  const [testModeOverride, setTestModeOverride] = useState<Stage | null>(null);

  // Update time and stage
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      setNow(currentTime);

      if (!testModeOverride) {
        if (currentTime >= LEADERBOARD_START) {
          setStage("LEADERBOARD");
        } else if (currentTime >= VOTING_END) {
          setStage("INTERIM");
        } else {
          setStage("VOTING");
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [testModeOverride]);

  // Initial check for voted status
  useEffect(() => {
    const voted = localStorage.getItem("utsbdsoc_graamys_voted");
    if (voted) {
      setHasVoted(true);
    }

    // Mock fetch for stats
    const mockStats: Stats = {};
    CATEGORIES.forEach(cat => {
      mockStats[cat.id] = {};
      const noms = NOMINEES[cat.id] || [];
      noms.forEach(n => {
        mockStats[cat.id][n.name] = Math.floor(Math.random() * 50);
      });
    });
    setStats(mockStats);

  }, []);

  // Handle Test Mode Override
  useEffect(() => {
    if (testModeOverride) {
      setStage(testModeOverride);
    }
  }, [testModeOverride]);


  const currentCategory = CATEGORIES[step];
  const currentNominees = step >= 0 && step < CATEGORIES.length ? (NOMINEES[currentCategory.id] || []) : [];
  const progress = ((step + 1) / CATEGORIES.length) * 100;

  // --- HELPER: GET TOP 3 NOMINEES FOR CHARTS ---
  const getTopNominees = (catId: string) => {
    const catStats = stats[catId] || {};
    const nominees = NOMINEES[catId] || [];
    let totalVotes = 0;

    const list = nominees.map(n => {
      const count = catStats[n.name] || 0;
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

  // --- HELPER: GET INDIVIDUAL STATS (For Voting Reveal) ---
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

      localStorage.setItem("utsbdsoc_graamys_voted", "true");
      setHasVoted(true);
      setStep(CATEGORIES.length);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- COUNTDOWN RENDERER (For Interim Stage) ---
  const renderInterimCountdown = () => {
    const diff = LEADERBOARD_START.getTime() - now.getTime();
    if (diff <= 0) return null;

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return (
      <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">

        {/* Animated Lock Icon */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-20 rounded-full animate-pulse" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 bg-[#1a1a1a] p-8 rounded-full border-4 border-red-600/30 shadow-[0_0_40px_rgba(220,38,38,0.3)]"
          >
            <FiLock size={64} className="text-red-500" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
            Voting <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Closed</span>
          </h1>

          <p className="text-xl md:text-3xl font-bold text-gray-400 uppercase tracking-[0.2em] animate-pulse">
            Calculating Results...
          </p>
        </div>

        {/* Dramatic Countdown */}
        <div className="grid grid-cols-3 gap-4 md:gap-12 mt-12">
          {[
            { label: "Hours", value: hours },
            { label: "Mins", value: minutes },
            { label: "Secs", value: seconds }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="bg-black/50 backdrop-blur-md border border-white/10 w-24 h-24 md:w-40 md:h-40 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

                <span className="text-4xl md:text-7xl font-black text-white font-mono tabular-nums relative z-10">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-red-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- VOTING COUNTDOWN (Small, for Voting Stage) ---
  const renderVotingCountdown = () => {
    const diff = VOTING_END.getTime() - now.getTime();
    if (diff <= 0) return null;

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return (
      <div className="flex items-center gap-4 bg-[#1a1a1a] border border-[#ea580c]/30 px-6 py-3 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-2 text-[#ea580c] animate-pulse">
          <FiClock size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">Voting Closes In</span>
        </div>
        <div className="flex gap-2 font-mono text-lg font-bold text-white">
          <span>{String(hours).padStart(2, '0')}</span>:
          <span>{String(minutes).padStart(2, '0')}</span>:
          <span>{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Global Navbar */}
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col pt-20">

        {/* --- TEST MODE CONTROLS --- */}
        {TEST_MODE && (
          <div className="fixed bottom-4 right-4 z-50 bg-[#1a1a1a] border border-white/10 p-4 rounded-xl shadow-2xl flex flex-col gap-2 min-w-[200px]">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Dev Mode</div>
            <button
              onClick={() => setTestModeOverride(null)}
              className={`text-xs text-left px-3 py-2 rounded-lg border ${!testModeOverride ? "bg-[#ea580c] border-[#ea580c] text-black" : "bg-black border-white/10 hover:border-white/30"}`}
            >
              Auto (Real Time)
            </button>
            <button
              onClick={() => setTestModeOverride("VOTING")}
              className={`text-xs text-left px-3 py-2 rounded-lg border ${testModeOverride === "VOTING" ? "bg-[#ea580c] border-[#ea580c] text-black" : "bg-black border-white/10 hover:border-white/30"}`}
            >
              Voting Open
            </button>
            <button
              onClick={() => setTestModeOverride("INTERIM")}
              className={`text-xs text-left px-3 py-2 rounded-lg border ${testModeOverride === "INTERIM" ? "bg-[#ea580c] border-[#ea580c] text-black" : "bg-black border-white/10 hover:border-white/30"}`}
            >
              Voting Closed (Interim)
            </button>
            <button
              onClick={() => setTestModeOverride("LEADERBOARD")}
              className={`text-xs text-left px-3 py-2 rounded-lg border ${testModeOverride === "LEADERBOARD" ? "bg-[#ea580c] border-[#ea580c] text-black" : "bg-black border-white/10 hover:border-white/30"}`}
            >
              Leaderboard
            </button>

            <div className="h-px bg-white/10 my-1" />
            <button
              onClick={() => {
                localStorage.removeItem("utsbdsoc_graamys_voted");
                setHasVoted(false);
                setStep(-1);
                setAnswers({});
                alert("Local storage cleared. Refresh if needed.");
              }}
              className="text-xs text-left px-3 py-2 rounded-lg border border-red-900/50 bg-red-900/10 text-red-400 hover:bg-red-900/20"
            >
              Reset My Vote
            </button>
          </div>
        )}

        {/* Background FX */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 left-0 right-0 h-[2px] bg-[#ea580c]" />

        {/* PROGRESS BAR (Only in Voting Stage) */}
        {stage === "VOTING" && step >= 0 && step < CATEGORIES.length && !hasVoted && (
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

            {/* --- STAGE 1: VOTING --- */}
            {stage === "VOTING" && (
              <>
                {/* INTRO SCREEN */}
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

                    {/* --- 🏆 TROPHY SECTION --- */}
                    <div className="relative mb-12 group cursor-default">
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
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-[#ea580c] blur-[60px] rounded-full opacity-40"
                      />
                      <div className="relative bg-black border-4 border-[#ea580c] p-10 rounded-full shadow-[0_0_50px_rgba(234,88,12,0.4)] z-10 overflow-hidden">
                        <motion.div
                          animate={{
                            y: [-8, 8, -8],
                            filter: ["brightness(1) drop-shadow(0 0 0px rgba(234,88,12,0))", "brightness(1.2) drop-shadow(0 0 20px rgba(234,88,12,0.5))", "brightness(1) drop-shadow(0 0 0px rgba(234,88,12,0))"]
                          }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <FaTrophy size={80} className="text-[#ea580c]" />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-full" />
                      </div>
                    </div>

                    {/* VOTING COUNTDOWN */}
                    {renderVotingCountdown()}

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

                {/* VOTING CARD */}
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

                {/* VOTE CONFIRMATION (During Voting Stage) */}
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
                        Thank you for casting your votes for the 2025 Graamy's. <br />
                        <span className="text-[#ea580c] font-bold">Tune in at 8:30 PM for the live results.</span>
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <a href="/" className="group flex items-center gap-2 text-white font-bold uppercase tracking-widest hover:text-[#ea580c] transition-colors bg-[#121212] border border-white/20 px-8 py-4 rounded-full hover:border-[#ea580c]">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Return Home
                      </a>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* --- STAGE 2: INTERIM (VOTING CLOSED, WAITING FOR LEADERBOARD) --- */}
            {stage === "INTERIM" && (
              <motion.div
                key="interim"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full"
              >
                {renderInterimCountdown()}
              </motion.div>
            )}

            {/* --- STAGE 3: LEADERBOARD --- */}
            {stage === "LEADERBOARD" && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-6xl"
              >
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-[#ea580c]/20 border border-[#ea580c] text-[#ea580c] text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse"></span>
                    Live Results
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
            )}

          </AnimatePresence>
        </div>
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}