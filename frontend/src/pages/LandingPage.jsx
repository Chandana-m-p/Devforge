import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  GitBranch, 
  Search, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  Box, 
  Rocket, 
  Sparkles, 
  Terminal, 
  Zap, 
  AlertTriangle, 
  Layers, 
  ArrowRight,
  Shield,
  Activity,
  Check,
  Star,
  Lock
} from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
      <Navbar />

      {/* Hero Section with Ambient Lighting */}
      <section className="relative overflow-hidden pt-24 pb-28 border-b border-gray-800/80 ambient-glow">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          
          {/* Badge Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-500/30 text-brand-400 text-xs font-mono font-medium mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            <span>Integrated Developer Infrastructure Platform</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            DevForge <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-cyan-400 to-emerald-400">
              Forge. Build. Ship.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            One unified orchestration layer for building, testing, securing and containerizing your software projects. Stop fighting tool fragmentation — connect your repository and ship with confidence.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 bg-dark-800 hover:bg-dark-700 text-gray-200 border border-gray-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition hover:-translate-y-0.5"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>View Interactive Demo</span>
            </Link>
          </div>

          {/* Visual Pipeline Showcase */}
          <div className="p-6 rounded-2xl glass-panel border border-gray-800/80 shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 mb-6 text-xs font-mono">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-bold text-white">devforge-pipeline-orchestrator v1.0</span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE ORCHESTRATION
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
              {[
                { stage: "GitHub", icon: GitBranch, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
                { stage: "Analyze", icon: Search, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
                { stage: "Build", icon: Wrench, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" },
                { stage: "Test", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
                { stage: "Security", icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
                { stage: "Docker", icon: Box, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/30" },
                { stage: "Deploy", icon: Rocket, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className={`p-4 rounded-xl ${item.bg} border flex flex-col items-center gap-2 transition-transform hover:-translate-y-1`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                    <span className="text-xs font-bold text-gray-200 font-mono">{item.stage}</span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <Check className="w-3 h-3" /> Auto
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Social Trust Badges */}
      <section className="py-10 bg-dark-800/50 border-b border-gray-800/80">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-around gap-6 text-xs text-gray-400 font-mono uppercase tracking-wider">
          <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-400" /> OWASP Security Rules</span>
          <span className="flex items-center gap-2"><Box className="w-4 h-4 text-cyan-400" /> Multi-Stage Docker</span>
          <span className="flex items-center gap-2"><GitBranch className="w-4 h-4 text-purple-400" /> GitHub Actions Sync</span>
          <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-amber-400" /> 0–100 Health Score</span>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-24 bg-dark-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-white">
              Developer Tool Fragmentation is Slowing Teams Down
            </h2>
            <p className="text-gray-400 text-xs md:text-sm">
              Beginners, students, and small engineering teams waste hours configuring separate builds, scanners, and containers. DevForge replaces manual glue scripts with one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Fragmented Way */}
            <div className="p-8 rounded-2xl bg-rose-950/10 border border-rose-900/40 space-y-6">
              <div className="flex items-center gap-3 text-rose-400 font-bold text-base">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>The Fragmented Developer Toolchain</span>
              </div>
              <ul className="space-y-4 text-xs text-gray-300 font-mono">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-sm">✕</span>
                  <span>Scattered logs across Jenkins, OWASP CLI, and Docker daemons</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-sm">✕</span>
                  <span>Manual writing of complex multi-stage Dockerfiles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-sm">✕</span>
                  <span>Unclear security vulnerability risk and dependency rot</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-sm">✕</span>
                  <span>Cryptic compilation errors without actionable resolution guides</span>
                </li>
              </ul>
            </div>

            {/* The DevForge Advantage */}
            <div className="p-8 rounded-2xl bg-emerald-950/10 border border-emerald-900/40 space-y-6">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>The Unified DevForge Advantage</span>
              </div>
              <ul className="space-y-4 text-xs text-gray-300 font-mono">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                  <span>Centralized unified log console for build, test & security</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                  <span>Auto-generated Dockerfiles & GitHub Actions CI/CD workflows</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                  <span>Real-time 0–100 Project Health Score with actionable remediation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                  <span>Optional AI Assistant providing beginner-friendly error fixes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target User Persona Cards */}
      <section className="py-20 bg-dark-800/40 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Designed for Modern Developers & Teams</h2>
            <p className="text-xs text-gray-400">Simple enough for beginners, powerful enough for technical judges and investors.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Students & Beginners", desc: "No complex setup required. Learn industry CI/CD, security, and Docker best practices effortlessly.", icon: Sparkles },
              { title: "Small Dev Teams", desc: "Standardize build pipelines and health scoring across all projects without dedicated DevOps engineers.", icon: Layers },
              { title: "Startups", desc: "Containerize and audit code quality fast so you can ship features to early users safely.", icon: Zap },
              { title: "Educational Institutions", desc: "Demonstrate full-stack DevOps workflows in computer science labs and Hackathons.", icon: Cpu }
            ].map((u, idx) => {
              const Icon = u.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-dark-900 border border-gray-800 space-y-3 glass-panel-hover">
                  <Icon className="w-6 h-6 text-brand-400" />
                  <h3 className="text-sm font-bold text-white">{u.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{u.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-dark-900 border-t border-gray-800 text-center text-xs text-gray-500 font-mono">
        DevForge — Forge. Build. Ship. &copy; 2026 Integrated Developer Infrastructure Platform.
      </footer>
    </div>
  );
};
