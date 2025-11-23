"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FiLock, FiUnlock, FiRefreshCw } from "react-icons/fi";

// Mapping keys to readable titles
const TITLES: Record<string, string> = {
  academicWeapon: "📚 Academic Weapon",
  dancer: "💃 Dancer of The Year",
  melodiousVoice: "🎙️ Melodious Voice",
  olympian: "🥇 The Olympian",
  gymshark: "💪 The Gymshark",
  fashionIcon: "👗 Fashion Icon",
  bestCook: "🍳 Best Home Cook",
  bestEvent: "🎉 Best Event",
  bestSociety: "🇧🇩 Best Society",
};

export default function ResultsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Function to fetch data (Only runs when password is submitted)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use POST to send password securely in body
      const res = await fetch("/api/graamys/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.status === 401 || !data.success) {
        setError("Incorrect Password. Nice try! 🕵️‍♂️");
        setLoading(false);
      } else {
        setResults(data.data);
        setIsAuthenticated(true);
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 relative overflow-hidden">
        
        {/* Background FX */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.1),transparent_70%)] pointer-events-none" />
        <div className="absolute top-24 left-0 right-0 h-px bg-white/10" />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* --- LOGIN SCREEN --- */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto mt-20">
              <div className="bg-[#121212] border-2 border-white/10 rounded-2xl p-8 shadow-[8px_8px_0px_0px_#ea580c]">
                <div className="text-center mb-8">
                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black border-2 border-[#ea580c] text-[#ea580c] mb-4">
                     <FiLock size={32} />
                   </div>
                   <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Restricted Access</h1>
                   <p className="text-gray-500 text-sm mt-2 font-bold uppercase tracking-widest">Executives Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Admin Password..." 
                      className="w-full bg-black border-2 border-white/20 rounded-lg px-4 py-3 text-white font-bold placeholder:text-gray-700 focus:outline-none focus:border-[#ea580c] transition-all text-center tracking-widest"
                    />
                  </div>
                  
                  {error && (
                    <p className="text-red-500 text-xs font-bold text-center uppercase tracking-wide animate-pulse">
                      {error}
                    </p>
                  )}

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-white text-black font-black uppercase tracking-wide py-3 rounded-lg shadow-[4px_4px_0px_0px_#ea580c] hover:translate-y-px hover:shadow-[2px_2px_0px_0px_#ea580c] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
                  >
                    {loading ? "Unlocking..." : "Unlock Dashboard"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            
            /* --- RESULTS DASHBOARD (Only visible after login) --- */
            <>
              <div className="text-center mb-12 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-12 bg-[#ea580c]"></span>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50 flex items-center gap-2">
                    <FiUnlock className="text-green-500" /> Live Data
                  </span>
                  <span className="h-[2px] w-12 bg-[#ea580c]"></span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                  NOMINATION <span className="text-[#ea580c]">RESULTS</span>
                </h1>
                
                <div className="flex items-center gap-4">
                   <div className="px-6 py-2 rounded-full border border-white/10 bg-[#1a1a1a] text-sm font-bold text-gray-400">
                     Total Votes: <span className="text-white">{results.totalVotes}</span>
                   </div>
                   <button 
                     onClick={handleLogin} 
                     className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" 
                     title="Refresh Data"
                   >
                     <FiRefreshCw />
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(TITLES).map((key) => {
                  const categoryData = results[key] || [];
                  
                  return (
                    <div key={key} className="bg-[#121212] border-2 border-white/10 rounded-xl p-6 shadow-[6px_6px_0px_0px_black] hover:border-[#ea580c] transition-colors group">
                      <h3 className="text-lg font-black uppercase tracking-tight text-white mb-4 border-b-2 border-white/10 pb-3 group-hover:border-[#ea580c]/50 transition-colors">
                        {TITLES[key]}
                      </h3>
                      
                      <div className="space-y-3">
                        {categoryData.length === 0 ? (
                          <p className="text-sm text-gray-600 italic font-mono">No nominations yet.</p>
                        ) : (
                          categoryData.map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-sm ${index === 0 ? "bg-[#ea580c] text-white" : "bg-white/10 text-gray-500"}`}>
                                  #{index + 1}
                                </span>
                                <span className={`font-bold text-sm uppercase tracking-wide ${index === 0 ? "text-white" : "text-gray-400"}`}>
                                  {item.name}
                                </span>
                              </div>
                              <span className="text-xs font-mono font-bold text-[#ea580c]">
                                {item.count}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}