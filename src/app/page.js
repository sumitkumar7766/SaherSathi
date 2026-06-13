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
  
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (checkingAuth || isLoggingIn) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 45;
    const connectionDistance = 110;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
      });
    }

    let mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw grid points
      ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < connectionDistance) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.08 * (1 - dist / connectionDistance)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mDist < 150) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - mDist / 150)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [checkingAuth, isLoggingIn]);

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
      <div className="relative min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Animated Cybernetic Ambient Background */}
      <div className="tech-grid absolute inset-0 z-0 opacity-20 pointer-events-none" />
      
      {/* Interactive Particle Web Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      {/* Glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Outer Ring Ambient Lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-500/5 rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-500/5 rounded-full border-dashed pointer-events-none z-0" />

      {/* Hologram Scanner Laser (Visible during logging state) */}
      {isLoggingIn && <div className="hologram-line z-20" />}

      {/* Unified Glass Form Card Container */}
      <div className="relative z-10 w-full max-w-[460px] animate-fade-in-up">
        {isLoggingIn ? (
          /* Futuristic Holographic Terminal Loading Sequence */
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl flex flex-col justify-center min-h-[420px] relative overflow-hidden">
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

              <div className="space-y-3 text-left bg-slate-50/80 rounded-xl p-5 border border-slate-200 font-mono text-xs text-slate-600">
                {terminalMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 transition-all duration-300 ${
                      i > loadingPhase ? "opacity-25" : "opacity-100"
                    }`}
                  >
                    {i < loadingPhase ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : i === loadingPhase ? (
                      <Loader2 className="w-4 h-4 text-emerald-500 animate-spin shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 ml-1.5 shrink-0" />
                    )}
                    <span>{msg}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                Secure Admin Token Handshake • v3.0.2
              </p>
            </div>
          </div>
        ) : (
          /* Gorgeous Cinematic Login Form */
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl relative overflow-hidden group">
            {/* Subtle top light overlay */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />
            
            <div className="text-center mb-8">
              {/* Logo icon with glow */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] mb-4 group-hover:scale-105 transition-all duration-500">
                <Server className="w-7 h-7 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                SaharSathi
              </h1>
              <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mt-1">
                Metropolitan Command Portal
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label htmlFor="admin-username-input" className="text-xs font-bold text-slate-400 tracking-wider uppercase ml-1">
                  Admin Account
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-emerald-500/60 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.08)] transition-all duration-300">
                  <User className="absolute left-4 w-4 h-4 text-slate-400" />
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
                    className="w-full bg-transparent text-sm pl-11 pr-4 py-3.5 text-slate-850 placeholder-slate-400 focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label htmlFor="admin-password-input" className="text-xs font-bold text-slate-500 tracking-wider uppercase ml-1">
                  Access Code
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-emerald-500/60 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.08)] transition-all duration-300">
                  <Lock className="absolute left-4 w-4 h-4 text-slate-400" />
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
                    className="w-full bg-transparent text-sm pl-11 pr-4 py-3.5 text-slate-850 placeholder-slate-400 focus:outline-none tracking-widest font-medium"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-rose-600 text-xs font-bold bg-rose-50 border border-rose-100 px-3 py-2 rounded-lg text-center animate-pulse">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                id="btn-login-submit"
                type="submit"
                disabled={typingState || !username.trim() || !password.trim()}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-sm font-bold text-white hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)] border border-emerald-400/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                Unlock Admin Console
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Cinematic Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Quick Access
              </span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            {/* Demo Login Button */}
            <button
              id="btn-demo-login"
              type="button"
              onClick={handleDemoLogin}
              disabled={typingState}
              className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-emerald-600 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
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
