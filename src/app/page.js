"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Server,
  ArrowRight,
  CheckCircle2,
  Lock,
  User,
  Loader2,
  Layers,
  Sparkles,
} from "lucide-react";

export default function App() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Login animations & phases
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [typingState, setTypingState] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      if (token === "active") {
        router.push("/dashboard");
      } else {
        setCheckingAuth(false);
      }
    }
  }, [router]);

  // Simulated login terminal outputs
  const terminalMessages = [
    "Establishing secure quantum handshake with Bhopal nodes...",
    "Syncing AES-256 administrative payloads...",
    "Telemetry verified: 8 modules communicating online...",
    "Access granted. Deploying holographic dashboard console...",
  ];

  useEffect(() => {
    if (isLoggingIn) {
      const interval = setInterval(() => {
        setLoadingPhase((prev) => {
          if (prev >= 3) {
            clearInterval(interval);
            setTimeout(() => {
              if (typeof window !== "undefined") {
                localStorage.setItem("admin_token", "active");
              }
              router.push("/dashboard");
            }, 600);
            return 3;
          }
          return prev + 1;
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isLoggingIn, router]);

  // Demo Login Typing effect
  const handleDemoLogin = () => {
    if (typingState || isLoggingIn) return;
    setTypingState(true);
    setError("");
    
    const targetUser = "admin";
    const targetPass = "admin123";
    let uIndex = 0;
    let pIndex = 0;
    
    // Clear initial fields
    setUsername("");
    setPassword("");
    
    // Type username
    const uInterval = setInterval(() => {
      if (uIndex < targetUser.length) {
        setUsername((prev) => prev + targetUser.charAt(uIndex));
        uIndex++;
      } else {
        clearInterval(uInterval);
        
        // Type password
        const pInterval = setInterval(() => {
          if (pIndex < targetPass.length) {
            setPassword((prev) => prev + targetPass.charAt(pIndex));
            pIndex++;
          } else {
            clearInterval(pInterval);
            setTypingState(false);
            
            // Auto trigger login sequence
            setTimeout(() => {
              setIsLoggingIn(true);
              setLoadingPhase(0);
            }, 300);
          }
        }, 55);
      }
    }, 45);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    
    if (username === "admin" && password === "admin123") {
      setError("");
      setIsLoggingIn(true);
      setLoadingPhase(0);
    } else {
      setError("Invalid administrative credentials.");
    }
  };

  if (checkingAuth) {
    return (
      <div className="relative min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030712] font-sans text-slate-100 flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Animated Cybernetic Ambient Background */}
      <div className="tech-grid absolute inset-0 z-0 opacity-20 pointer-events-none" />
      
      {/* Glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Outer Ring Ambient Lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-500/5 rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-500/5 rounded-full border-dashed pointer-events-none z-0" />

      {/* Hologram Scanner Laser (Visible during logging state) */}
      {isLoggingIn && <div className="hologram-line z-20" />}

      {/* Unified Glass Form Card Container */}
      <div className="relative z-10 w-full max-w-[460px] animate-fade-in-up">
        {isLoggingIn ? (
          /* Futuristic Holographic Terminal Loading Sequence */
          <div className="glass-panel rounded-3xl p-8 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col justify-center min-h-[420px] relative overflow-hidden">
            <div className="text-center space-y-6">
              <div className="inline-flex relative">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 flex items-center justify-center animate-spin border-t-emerald-500">
                  <Layers className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-emerald-400 animate-ping" />
              </div>
              
              <h2 className="text-xl font-extrabold tracking-widest text-emerald-400 uppercase text-glow-emerald">
                Grid Synchronization
              </h2>

              <div className="space-y-3 text-left bg-black/40 rounded-xl p-5 border border-slate-800 font-mono text-xs text-slate-300">
                {terminalMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 transition-all duration-300 ${
                      i > loadingPhase ? "opacity-25" : "opacity-100"
                    }`}
                  >
                    {i < loadingPhase ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : i === loadingPhase ? (
                      <Loader2 className="w-4 h-4 text-emerald-400 animate-spin shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 ml-1.5 shrink-0" />
                    )}
                    <span>{msg}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                Secure Admin Token Handshake • v3.0.2
              </p>
            </div>
          </div>
        ) : (
          /* Gorgeous Cinematic Login Form */
          <div className="glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            {/* Subtle top light overlay */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />
            
            <div className="text-center mb-8">
              {/* Logo icon with glow */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] mb-4 group-hover:scale-105 transition-all duration-500">
                <Server className="w-7 h-7 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                SaharSathi
              </h1>
              <p className="text-xs font-semibold text-emerald-500/90 tracking-widest uppercase mt-1">
                Metropolitan Command Portal
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label htmlFor="admin-username-input" className="text-xs font-bold text-slate-400 tracking-wider uppercase ml-1">
                  Admin Account
                </label>
                <div className="relative flex items-center bg-slate-950/60 border border-slate-800 rounded-xl focus-within:border-emerald-500/60 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300">
                  <User className="absolute left-4 w-4 h-4 text-slate-500" />
                  <input
                    id="admin-username-input"
                    type="text"
                    disabled={typingState}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter credentials..."
                    className="w-full bg-transparent text-sm pl-11 pr-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label htmlFor="admin-password-input" className="text-xs font-bold text-slate-400 tracking-wider uppercase ml-1">
                  Access Code
                </label>
                <div className="relative flex items-center bg-slate-950/60 border border-slate-800 rounded-xl focus-within:border-emerald-500/60 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300">
                  <Lock className="absolute left-4 w-4 h-4 text-slate-500" />
                  <input
                    id="admin-password-input"
                    type="password"
                    disabled={typingState}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-sm pl-11 pr-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none tracking-widest font-medium"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-rose-400 text-xs font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg text-center animate-pulse">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                id="btn-login-submit"
                type="submit"
                disabled={typingState || !username.trim() || !password.trim()}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-sm font-bold text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-400/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none mt-2 flex items-center justify-center gap-2"
              >
                Unlock Admin Console
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Cinematic Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-slate-800 flex-1" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                Quick Access
              </span>
              <div className="h-px bg-slate-800 flex-1" />
            </div>

            {/* Demo Login Button */}
            <button
              id="btn-demo-login"
              type="button"
              onClick={handleDemoLogin}
              disabled={typingState}
              className="w-full py-3 bg-slate-950/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl text-xs font-bold text-emerald-400/90 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(16,185,129,0.08)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              {typingState ? "Simulating Security Entry..." : "Access with Demo Credentials"}
            </button>

            <div className="mt-8 text-center text-[10px] text-slate-600 font-bold uppercase tracking-wider">
              Bhopal Municipal Corporation • Smart City Systems
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
