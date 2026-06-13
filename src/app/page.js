"use client";
import React, { useState, useEffect } from "react";
import {
  Trash2,
  Cpu,
  Droplets,
  Lightbulb,
  TreePine,
  Cctv,
  Map,
  School,
  Search,
  Bell,
  Activity,
  Users,
  Server,
  ArrowRight,
  LogOut,
  CheckCircle2,
  Lock,
  User,
  ShieldAlert,
  Loader2,
  Layers,
  Sparkles,
} from "lucide-react";

// The portals updated to support our cinematic color profiles and glow themes
const portals = [
  {
    id: 1,
    title: "Safai Mitra",
    subtitle: "Sanitation Worker Tracking",
    icon: Trash2,
    accent: "text-emerald-400",
    dot: "bg-emerald-500",
    glow: "hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:border-emerald-500/50",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "248 Active",
    stats: ["248 Workers Online", "12 Zones", "94% Attendance"],
    url: "http://localhost:4000/",
  },
  {
    id: 2,
    title: "Methane Detector",
    subtitle: "Smart Waste Detection",
    icon: Cpu,
    accent: "text-amber-400",
    dot: "bg-amber-500",
    glow: "hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:border-amber-500/50",
    badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    status: "3 Alerts",
    stats: ["56 Sensors Active", "3 High Fill Zones", "2 Pickups Due"],
    url: "http://localhost:3001/",
  },
  {
    id: 4,
    title: "Water Inflow",
    subtitle: "Water Supply Management",
    icon: Droplets,
    accent: "text-cyan-400",
    dot: "bg-cyan-500",
    glow: "hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:border-cyan-500/50",
    badge: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    status: "Optimal",
    stats: ["82% Tank Levels", "18 Zones Active", "0 Leaks"],
    url: "http://localhost:3002/",
  },
  {
    id: 6,
    title: "Street Lights",
    subtitle: "Smart Lighting Grid",
    icon: Lightbulb,
    accent: "text-yellow-400",
    dot: "bg-yellow-500",
    glow: "hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:border-yellow-500/50",
    badge: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    status: "98% On",
    stats: ["4820 Lights Active", "98 Faulty", "Auto Mode: ON"],
    url: "http://localhost:3011/",
  },
  {
    id: 8,
    title: "Green Cover",
    subtitle: "Parks & Tree Census",
    icon: TreePine,
    accent: "text-lime-400",
    dot: "bg-lime-500",
    glow: "hover:shadow-[0_0_25px_rgba(132,204,22,0.25)] hover:border-lime-500/50",
    badge: "bg-lime-500/10 text-lime-400 border border-lime-500/20",
    status: "Healthy",
    stats: ["142 Parks Mapped", "38K Trees", "12 Drives Planned"],
    url: "http://localhost:3109/",
  },
  {
    id: 10,
    title: "Smart CCTV",
    subtitle: "City Surveillance Network",
    icon: Cctv,
    accent: "text-indigo-400",
    dot: "bg-indigo-500",
    glow: "hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] hover:border-indigo-500/50",
    badge: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    status: "Live",
    stats: ["842 Cameras Live", "6 Offline", "AI Alert: Active"],
    url: "http://localhost:3115",
  },
  {
    id: 11,
    title: "Road Repair",
    subtitle: "Pothole & Road Status",
    icon: Map,
    accent: "text-fuchsia-400",
    dot: "bg-fuchsia-500",
    glow: "hover:shadow-[0_0_25px_rgba(217,70,239,0.25)] hover:border-fuchsia-500/50",
    badge: "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20",
    status: "23 Issues",
    stats: ["23 Potholes Logged", "8 Under Repair", "5 Done Today"],
    url: "http://localhost:5173/",
  },
  {
    id: 12,
    title: "Vasundhara",
    subtitle: "Environmental education platform for school and colleges",
    icon: School,
    accent: "text-emerald-400",
    dot: "bg-emerald-500",
    glow: "hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:border-emerald-500/50",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    status: "Active Platform",
    stats: ["50 Schools Logged", "35k Students Enrolled", "20 NGOs Partnered"],
    url: "http://localhost:3205/",
  },
];

const statCards = [
  {
    label: "Active Portals",
    value: "12",
    sub: "+2 this week",
    icon: Activity,
    glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-500/30",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Total Alerts",
    value: "28",
    sub: "5 critical",
    icon: Bell,
    glow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-rose-500/30",
    accent: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    label: "Citizens Served",
    value: "4.2L",
    sub: "+3.2% today",
    icon: Users,
    glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-500/30",
    accent: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    label: "System Uptime",
    value: "99.7%",
    sub: "Last 30 days",
    icon: Server,
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:border-violet-500/30",
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  
  // Login animations & phases
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [typingState, setTypingState] = useState(false);

  const filtered = portals.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase())
  );

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
              setIsLoggedIn(true);
              setIsLoggingIn(false);
            }, 600);
            return 3;
          }
          return prev + 1;
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isLoggingIn]);

  // Demo Login Typing effect
  const handleDemoLogin = () => {
    if (typingState || isLoggingIn) return;
    setTypingState(true);
    
    const targetUser = "admin@saharsathi.gov";
    const targetPass = "••••••••";
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
    setIsLoggingIn(true);
    setLoadingPhase(0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // ────────────────── LOGIN SCREEN ──────────────────
  if (!isLoggedIn) {
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
                      onChange={(e) => setUsername(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm pl-11 pr-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none tracking-widest font-medium"
                    />
                  </div>
                </div>

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

  // ────────────────── MAIN DASHBOARD SCREEN ──────────────────
  return (
    <div className="relative min-h-screen bg-[#030712] font-sans text-slate-100 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* CSS Grid Overlay */}
      <div className="tech-grid absolute inset-0 z-0 opacity-20 pointer-events-none" />

      {/* Futuristic Radial Glowing Orbs */}
      <div className="absolute top-0 right-[5%] w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />
      <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] bg-cyan-600/5 rounded-full blur-[110px] pointer-events-none" />

      {/* ── HIGH-TECH NAVBAR (Glassmorphism) ── */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 animate-fade-in-down">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300">
              <Server className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-white text-lg leading-none tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                SaharSathi
              </span>
              <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mt-1 hidden sm:block">
                Holographic Console
              </span>
            </div>
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:flex items-center bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-full px-4 py-2 gap-2 w-80 focus-within:!bg-slate-950 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.08)] transition-all duration-300 group">
            <Search className="w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            <input
              id="dashboard-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search active portals..."
              className="bg-transparent text-sm text-slate-300 placeholder-slate-600 focus:outline-none w-full font-medium"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                System Grid: Operational
              </span>
            </div>

            <div className="hidden md:block bg-slate-950/60 border border-slate-800 rounded-full px-4 py-1.5 text-xs font-bold text-slate-400 shadow-sm font-mono">
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).toUpperCase()}
            </div>

            <div className="flex items-center gap-3 pl-2 sm:border-l border-slate-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-500 p-[1.5px] shadow-sm hover:scale-105 transition-all duration-300 cursor-default">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-400">AK</span>
                </div>
              </div>
              <button
                id="btn-dashboard-logout"
                onClick={handleLogout}
                className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 rounded-full hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 hidden sm:block"
                title="Disconnect Secure Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-10 relative z-10">
        {/* ── CINEMATIC HEADER ── */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-extrabold">
                Bhopal Integrated Command Center
              </p>
            </div>
            <h1 className="text-3xl md:text-[2.5rem] leading-tight font-extrabold text-white tracking-tight">
              City Administration console
            </h1>
            <p className="text-slate-400 text-[14px] mt-2 font-medium max-w-xl leading-relaxed">
              Real-time administrative link node tracking telemetry status, 
              municipal deployments, and ecological feedback services.
            </p>
          </div>
          <div className="flex gap-3">
            <button id="btn-export-manifest" className="px-5 py-2.5 bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:shadow-md transition-all duration-300 active:scale-95">
              Export Log Manifest
            </button>
            <button id="btn-add-module" className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-xs text-white font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 transition-all duration-300">
              + Add Virtual Module
            </button>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {statCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                id={`stat-card-${i}`}
                className={`animate-fade-in-up glass-panel rounded-2xl p-5 border border-white/5 shadow-sm transition-all duration-500 group relative overflow-hidden ${s.glow}`}
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                {/* Accent glow corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div
                    className={`w-11 h-11 ${s.bg} rounded-xl border border-white/5 flex items-center justify-center transition-transform group-hover:scale-105 duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${s.accent}`} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-950/60 border border-slate-800 px-2 py-0.5 rounded font-mono">
                    {s.sub}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight relative z-10 font-mono">
                  {s.value}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-wider relative z-10">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── PORTAL SECTION HEADER ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2.5">
              Active Control Nodes
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-bold rounded-full font-mono">
                {filtered.length} Connected
              </span>
            </h2>
          </div>

          {/* Mobile Search */}
          <div className="flex md:hidden items-center bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 gap-2 w-full focus-within:border-emerald-500/50 transition-all">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              id="mobile-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search portals..."
              className="bg-transparent text-sm text-slate-300 placeholder-slate-600 focus:outline-none w-full font-medium"
            />
          </div>
        </div>

        {/* ── PORTAL GRID ── */}
        {filtered.length === 0 ? (
          <div
            className="animate-fade-in-up glass-panel rounded-2xl border border-dashed border-slate-800 text-center py-20 flex flex-col items-center justify-center shadow-sm"
            style={{ animationDelay: "500ms" }}
          >
            <div className="w-16 h-16 bg-slate-950/60 rounded-2xl flex items-center justify-center mb-4 border border-slate-800">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-slate-300 font-bold text-base">
              No portals detected
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-semibold">
              Adjust queries to lookup dormant nodes
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-emerald-400 text-xs font-bold uppercase tracking-wider hover:text-emerald-300 hover:underline transition-colors"
            >
              Clear Manifest Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filtered.map((portal, idx) => {
              const PortalIcon = portal.icon;
              return (
                <div
                  key={portal.id}
                  id={`portal-card-${portal.id}`}
                  onClick={() => portal.url && window.open(portal.url, "_blank")}
                  className={`animate-fade-in-up group relative glass-panel rounded-2xl p-6 shadow-md transition-all duration-500 cursor-pointer flex flex-col h-full ${portal.glow}`}
                  style={{ animationDelay: `${400 + idx * 100}ms` }}
                >
                  {/* Glowing header light strip */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] ${portal.dot} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-5 relative z-10">
                    <div
                      className={`w-11 h-11 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300`}
                    >
                      <PortalIcon
                        className={`w-5 h-5 ${portal.accent}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold ${portal.badge} shadow-sm flex items-center gap-1.5`}
                    >
                      <span className={`w-1 h-1 rounded-full ${portal.dot} animate-pulse`} />
                      {portal.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-white text-base leading-tight mb-1 group-hover:text-emerald-400 transition-colors duration-300 relative z-10">
                    {portal.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold mb-5 leading-snug line-clamp-2 relative z-10">
                    {portal.subtitle}
                  </p>

                  {/* Stats Divider */}
                  <div className="h-px bg-slate-800/60 group-hover:bg-slate-700/50 transition-colors mb-4 w-full relative z-10" />

                  {/* Stats Telemetry */}
                  <div className="space-y-2 flex-grow relative z-10 font-mono">
                    {portal.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div
                          className={`w-1 h-1 rounded-full flex-shrink-0 ${portal.dot} opacity-50 group-hover:opacity-100 transition-opacity`}
                        />
                        <span className="text-[11px] font-bold text-slate-300">
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Access Portal Bottom bar */}
                  <div className="mt-6 pt-4 border-t border-slate-800/40 group-hover:border-slate-800 transition-colors flex items-center justify-between relative z-10">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${portal.accent} opacity-80 group-hover:opacity-100 transition-all duration-300`}
                    >
                      Establish Link
                    </span>
                    <div
                      className={`w-7 h-7 bg-slate-950/60 border border-slate-800 group-hover:border-emerald-500/30 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300`}
                    >
                      <ArrowRight
                        className={`w-3.5 h-3.5 ${portal.accent}`}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── FOOTER ── */}
        <div
          className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in font-mono"
          style={{ animationDelay: "800ms" }}
        >
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            © 2026 Bhopal Municipal Corporation • SmartCity Hub
          </p>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
            <span>Core: v3.0.2</span>
            <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
            <span className="text-emerald-400 flex items-center gap-1.5 bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/20">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              Secure Link Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
