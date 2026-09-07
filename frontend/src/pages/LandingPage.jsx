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
  Activity
} from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 border-b border-gray-800 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/10 border border-brand-500/30 text-brand-400 text-xs font-mono font-medium mb-8">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Unified Developer Infrastructure Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            DevForge <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400">
              Forge. Build. Ship.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            One unified orchestration layer for building, testing, securing and containerizing your software projects. Stop fighting tool fragmentation — connect your repository and ship with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 bg-dark-700 hover:bg-dark-600 text-gray-200 border border-gray-700 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>View Interactive Demo</span>
            </Link>
          </div>

          {/* Visual Pipeline Flow */}
          <div className="p-6 rounded-2xl glass-panel border border-gray-800 shadow-2xl max-w-5xl mx-auto">
            <div className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mb-6">
              DevForge Automated Pipeline Execution Architecture
            </div>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
              {[
                { stage: "GitHub", icon: GitBranch, color: "text-purple-400" },
                { stage: "Analyze", icon: Search, color: "text-blue-400" },
                { stage: "Build", icon: Wrench, color: "text-cyan-400" },
                { stage: "Test", icon: CheckCircle2, color: "text-emerald-400" },
                { stage: "Security", icon: ShieldCheck, color: "text-amber-400" },
                { stage: "Docker", icon: Box, color: "text-indigo-400" },
                { stage: "Deploy", icon: Rocket, color: "text-rose-400" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-dark-800/80 border border-gray-800 flex flex-col items-center gap-2">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                    <span className="text-xs font-bold text-gray-200 font-mono">{item.stage}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">✓ Auto</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement vs DevForge Solution */}
      <section className="py-20 bg-dark-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Developer Tool Fragmentation is Slowing Teams Down
            </h2>
            <p className="text-gray-400 text-sm">
              Beginners, students, and small engineering teams waste hours configuring separate builds, scanners, and containers. DevForge replaces manual glue scripts with one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Fragmented Way */}
            <div className="p-6 rounded-2xl bg-rose-950/10 border border-rose-900/30 space-y-4">
              <div className="flex items-center gap-3 text-rose-400 font-bold text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>The Fragmented Developer Toolchain</span>
              </div>
              <ul className="space-y-3 text-xs text-gray-300 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Scattered logs across Jenkins, OWASP CLI, and Docker daemons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Manual writing of complex multi-stage Dockerfiles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Unclear security vulnerability risk and dependency rot</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Cryptic compilation errors without actionable resolution guides</span>
                </li>
              </ul>
            </div>

            {/* The DevForge Way */}
            <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-900/30 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>The Unified DevForge Advantage</span>
              </div>
              <ul className="space-y-3 text-xs text-gray-300 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Centralized unified log console for build, test & security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Auto-generated Dockerfiles & GitHub Actions CI/CD workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Real-time 0–100 Project Health Score with actionable remediation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Optional AI Assistant providing beginner-friendly error fixes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16 bg-dark-800 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Designed for Modern Developers & Teams</h2>
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
                <div key={idx} className="p-5 rounded-xl bg-dark-900 border border-gray-800 space-y-3">
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
      <footer className="py-8 bg-dark-900 border-t border-gray-800 text-center text-xs text-gray-500 font-mono">
        DevForge — Forge. Build. Ship. &copy; 2026 Integrated Developer Infrastructure Platform.
      </footer>
    </div>
  );
};
