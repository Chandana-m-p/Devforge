import React from 'react';
import { Navbar } from '../components/Navbar';
import { Cpu, Shield, Award } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-white">About DevForge</h1>
          <p className="text-gray-400 text-sm">Forge. Build. Ship. — Unified Developer Infrastructure Platform</p>
        </div>

        <div className="p-8 rounded-2xl glass-panel border border-gray-800 space-y-6 text-sm leading-relaxed text-gray-300">
          <p>
            DevForge is an integrated developer infrastructure platform designed to bridge the gap between source code repositories and continuous delivery. Built for students, startups, and engineering teams, DevForge orchestrates build tools, testing frameworks, vulnerability scanners, and containerization into one cohesive workflow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800 font-mono text-xs">
            <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-1">
              <div className="font-bold text-brand-400">Mission</div>
              <div>Eliminate DevOps tool fragmentation for early-stage developers.</div>
            </div>
            <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-1">
              <div className="font-bold text-emerald-400">Quality Standard</div>
              <div>Real full-stack architecture with production-ready abstractions.</div>
            </div>
            <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-1">
              <div className="font-bold text-cyan-400">Academic & Judging</div>
              <div>Designed for seamless evaluation with instant Demo Mode.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
