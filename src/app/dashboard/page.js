"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  ShieldAlert,
  Loader2,
} from "lucide-react";

// Portals updated to support light-mode color themes and glow shadows
const portals = [
  {
    id: 1,
    title: "Safai Mitra",
    subtitle: "Sanitation Worker Tracking",
    icon: Trash2,
    accent: "text-emerald-600",
    dot: "bg-emerald-500",
    glow: "hover:shadow-[0_8px_30px_rgba(16,185,129,0.06)] hover:border-emerald-300",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-100/80",
    status: "248 Active",
    stats: ["248 Workers Online", "12 Zones", "94% Attendance"],
    url: "http://localhost:4000/",
  },
  {
    id: 2,
    title: "Methane Detector",
    subtitle: "Smart Waste Detection",
    icon: Cpu,
    accent: "text-amber-600",
    dot: "bg-amber-500",
    glow: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)] hover:border-amber-300",
    badge: "bg-amber-50 text-amber-700 border border-amber-100/80",
    status: "3 Alerts",
    stats: ["56 Sensors Active", "3 High Fill Zones", "2 Pickups Due"],
    url: "http://localhost:3001/",
  },
  {
    id: 4,
    title: "Water Inflow",
    subtitle: "Water Supply Management",
    icon: Droplets,
    accent: "text-cyan-600",
    dot: "bg-cyan-500",
    glow: "hover:shadow-[0_8px_30px_rgba(6,182,212,0.06)] hover:border-cyan-300",
    badge: "bg-cyan-50 text-cyan-700 border border-cyan-100/80",
    status: "Optimal",
    stats: ["82% Tank Levels", "18 Zones Active", "0 Leaks"],
    url: "http://localhost:3002/",
  },
  {
    id: 6,
    title: "Street Lights",
    subtitle: "Smart Lighting Grid",
    icon: Lightbulb,
    accent: "text-yellow-600",
    dot: "bg-yellow-500",
    glow: "hover:shadow-[0_8px_30px_rgba(234,179,8,0.06)] hover:border-yellow-300",
    badge: "bg-yellow-50 text-yellow-800 border border-yellow-100/80",
    status: "98% On",
    stats: ["4820 Lights Active", "98 Faulty", "Auto Mode: ON"],
    url: "http://localhost:3011/",
  },
  {
    id: 8,
    title: "Green Cover",
    subtitle: "Parks & Tree Census",
    icon: TreePine,
    accent: "text-lime-600",
    dot: "bg-lime-500",
    glow: "hover:shadow-[0_8px_30px_rgba(132,204,22,0.06)] hover:border-lime-300",
    badge: "bg-lime-50 text-lime-700 border border-lime-100/80",
    status: "Healthy",
    stats: ["142 Parks Mapped", "38K Trees", "12 Drives Planned"],
    url: "http://localhost:3109/",
  },
  {
    id: 10,
    title: "Smart CCTV",
    subtitle: "City Surveillance Network",
    icon: Cctv,
    accent: "text-indigo-600",
    dot: "bg-indigo-500",
    glow: "hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)] hover:border-indigo-300",
    badge: "bg-indigo-50 text-indigo-700 border border-indigo-100/80",
    status: "Live",
    stats: ["842 Cameras Live", "6 Offline", "AI Alert: Active"],
    url: "http://localhost:3115/",
  },
  {
    id: 11,
    title: "Road Repair",
    subtitle: "Pothole & Road Status",
    icon: Map,
    accent: "text-fuchsia-600",
    dot: "bg-fuchsia-500",
    glow: "hover:shadow-[0_8px_30px_rgba(217,70,239,0.06)] hover:border-fuchsia-300",
    badge: "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100/80",
    status: "23 Issues",
    stats: ["23 Potholes Logged", "8 Under Repair", "5 Done Today"],
    url: "http://localhost:5173/",
  },
  {
    id: 12,
    title: "Vasundhara",
    subtitle: "Environmental education platform for school and colleges",
    icon: School,
    accent: "text-emerald-600",
    dot: "bg-emerald-500",
    glow: "hover:shadow-[0_8px_30px_rgba(16,185,129,0.06)] hover:border-emerald-300",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-100/80",
    status: "Active Platform",
    stats: ["50 Schools Logged", "35k Students Enrolled", "20 NGOs Partnered"],
    url: "http://localhost:3215/",
  },
];

const statCards = [
  {
    label: "Active Portals",
    value: "12",
    sub: "+2 this week",
    icon: Activity,
    glow: "hover:shadow-[0_8px_30px_rgba(16,185,129,0.05)] hover:border-emerald-200",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Total Alerts",
    value: "28",
    sub: "5 critical",
    icon: Bell,
    glow: "hover:shadow-[0_8px_30px_rgba(239,68,68,0.05)] hover:border-rose-200",
    accent: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    label: "Citizens Served",
    value: "4.2L",
    sub: "+3.2% today",
    icon: Users,
    glow: "hover:shadow-[0_8px_30px_rgba(6,182,212,0.05)] hover:border-cyan-200",
    accent: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    label: "System Uptime",
    value: "99.7%",
    sub: "Last 30 days",
    icon: Server,
    glow: "hover:shadow-[0_8px_30px_rgba(139,92,246,0.05)] hover:border-violet-200",
    accent: "text-violet-600",
    bg: "bg-violet-50",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      if (token !== "active") {
        router.push("/");
      } else {
        setAuthorized(true);
        setCheckingAuth(false);
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
    }
    router.push("/");
  };

  const filtered = portals.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  if (checkingAuth) {
    return (
      <div className="relative min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-550 animate-spin" />
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-950">
      {/* CSS Grid Overlay */}
      <div className="tech-grid absolute inset-0 z-0 opacity-40 pointer-events-none" />
      
      {/* Cinematic Moving Scanline */}
      <div className="scanline-overlay z-0" />

      {/* Ambient Gradient Blobs */}
      <div className="absolute top-0 right-[5%] w-[40vw] h-[40vw] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />
      <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none" />

      {/* ── NAVBAR (Glassmorphism Light) ── */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200/50 animate-fade-in-down">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-300">
              <Server className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-slate-900 text-lg leading-none tracking-tight group-hover:text-emerald-600 transition-colors duration-300">
                SaharSathi
              </span>
              <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest mt-1 hidden sm:block">
                Holographic Console
              </span>
            </div>
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:flex items-center bg-slate-100 hover:bg-slate-200/50 border border-slate-200/80 rounded-full px-4 py-2 gap-2 w-80 focus-within:!bg-white focus-within:border-emerald-500/50 focus-within:shadow-sm transition-all duration-300 group">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <input
              id="dashboard-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search active portals..."
              className="bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-full font-medium"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-100/80 rounded-full px-3 py-1.5 shadow-sm">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="radar-ring w-4.5 h-4.5 -top-1 -left-1"></span>
                <span className="radar-ring w-4.5 h-4.5 -top-1 -left-1" style={{ animationDelay: "1s" }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700 tracking-wide uppercase">
                System Grid: Operational
              </span>
            </div>

            <div className="hidden md:block bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 text-xs font-bold text-slate-500 shadow-sm font-mono">
              {mounted ? new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).toUpperCase() : "13 JUN 2026"}
            </div>

            <div className="flex items-center gap-3 pl-2 sm:border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-500 p-[1.5px] shadow-sm hover:scale-105 transition-all duration-300 cursor-default">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-700">AK</span>
                </div>
              </div>
              <button
                id="btn-dashboard-logout"
                onClick={handleLogout}
                className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 rounded-full hover:bg-rose-50 border border-transparent hover:border-rose-100"
                title="Disconnect Secure Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-10 relative z-10">
        {/* ── PAGE HEADER ── */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100/80 mb-4 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <p className="text-[10px] text-emerald-700 uppercase tracking-widest font-extrabold">
                Bhopal Integrated Command Center
              </p>
            </div>
            <h1 className="text-3xl md:text-[2.5rem] leading-tight font-extrabold text-slate-900 tracking-tight">
              City Administration console
            </h1>
            <p className="text-slate-500 text-[14px] mt-2 font-medium max-w-xl leading-relaxed">
              Real-time administrative link node tracking telemetry status, 
              municipal deployments, and ecological feedback services.
            </p>
          </div>
          <div className="flex gap-3">
            <button id="btn-export-manifest" className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:shadow-sm transition-all duration-300 active:scale-95">
              Export Log Manifest
            </button>
            <button id="btn-add-module" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl text-xs text-white font-bold shadow-sm hover:shadow active:scale-95 transition-all duration-300">
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
                className={`animate-fade-in-up glass-panel rounded-2xl p-5 border border-slate-200/50 shadow-sm transition-all duration-500 group relative overflow-hidden ${s.glow}`}
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                {/* Accent glow corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Live Telemetry Wave Line */}
                <div className="absolute bottom-0 left-0 right-0 h-9 overflow-hidden pointer-events-none opacity-15">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d={
                        i === 0 ? "M0,25 Q15,5 30,20 T60,5 T90,25 T100,10" :
                        i === 1 ? "M0,10 Q20,25 40,15 T70,25 T90,10 T100,20" :
                        i === 2 ? "M0,20 Q10,10 20,25 T50,15 T80,25 T100,5" :
                        "M0,15 Q30,5 50,20 T70,10 T90,20 T100,15"
                      }
                      fill="none"
                      stroke="currentColor"
                      className={`telemetry-path ${s.accent}`}
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div
                    className={`w-11 h-11 ${s.bg} rounded-xl border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-105 duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${s.accent}`} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100/80 border border-slate-200 px-2 py-0.5 rounded font-mono">
                    {s.sub}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight relative z-10 font-mono">
                  {s.value}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-bold uppercase tracking-wider relative z-10">
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
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2.5">
              Active Control Nodes
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] border border-emerald-100/80 font-bold rounded-full font-mono">
                {filtered.length} Connected
              </span>
            </h2>
          </div>

          {/* Mobile Search */}
          <div className="flex md:hidden items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 gap-2 w-full focus-within:border-emerald-500/50 transition-all shadow-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              id="mobile-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search portals..."
              className="bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-full font-medium"
            />
          </div>
        </div>

        {/* ── PORTAL GRID ── */}
        {filtered.length === 0 ? (
          <div
            className="animate-fade-in-up glass-panel rounded-2xl border border-dashed border-slate-300 text-center py-20 flex flex-col items-center justify-center shadow-sm"
            style={{ animationDelay: "500ms" }}
          >
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-slate-800 font-bold text-base">
              No portals detected
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-semibold">
              Adjust queries to lookup dormant nodes
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-emerald-600 text-xs font-bold uppercase tracking-wider hover:text-emerald-700 hover:underline transition-colors"
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
                  className={`animate-cascade-up group relative glass-panel rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-white transition-all duration-500 cursor-pointer flex flex-col h-full ${portal.glow}`}
                  style={{ animationDelay: `${150 + idx * 75}ms` }}
                >
                  {/* Glowing header light strip */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] ${portal.dot} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-5 relative z-10">
                    <div
                      className={`w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300`}
                    >
                      <PortalIcon
                        className={`w-5 h-5 ${portal.accent}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold ${portal.badge} shadow-sm flex items-center gap-1.5`}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span className={`absolute inline-flex h-full w-full rounded-full ${portal.dot} opacity-75 animate-ping`} />
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${portal.dot}`} />
                      </span>
                      {portal.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-800 text-base leading-tight mb-1 group-hover:text-emerald-600 transition-colors duration-300 relative z-10">
                    {portal.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mb-5 leading-snug line-clamp-2 relative z-10">
                    {portal.subtitle}
                  </p>

                  {/* Stats Divider */}
                  <div className="h-px bg-slate-100 group-hover:bg-slate-200/60 transition-colors mb-4 w-full relative z-10" />

                  {/* Stats Telemetry */}
                  <div className="space-y-2 flex-grow relative z-10 font-mono">
                    {portal.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div
                          className={`w-1 h-1 rounded-full flex-shrink-0 ${portal.dot} opacity-50 group-hover:opacity-100 transition-opacity`}
                        />
                        <span className="text-[11px] font-bold text-slate-650">
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Access Portal Bottom bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 group-hover:border-slate-200 transition-colors flex items-center justify-between relative z-10">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${portal.accent} opacity-80 group-hover:opacity-100 transition-all duration-300`}
                    >
                      Establish Link
                    </span>
                    <div
                      className={`w-7 h-7 bg-slate-50 border border-slate-100 group-hover:border-emerald-200 group-hover:bg-emerald-50 rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300`}
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
          className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in font-mono"
          style={{ animationDelay: "800ms" }}
        >
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Bhopal Municipal Corporation • SmartCity Hub
          </p>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Core: v3.0.2</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
            <span className="text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
              Secure Link Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
