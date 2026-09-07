import React from 'react';
import { Navbar } from '../components/Navbar';
import { GitBranch, Search, Play, Activity } from 'lucide-react';

export const HowItWorksPage = () => {
  const steps = [
    { step: "01", title: "Connect Repository", desc: "Paste your GitHub URL or import your repo. Secrets are kept safe in the backend.", icon: GitBranch },
    { step: "02", title: "Automatic Analysis", desc: "DevForge analyzes code structure, detecting languages, frameworks, and build tools.", icon: Search },
    { step: "03", title: "Automated Pipeline Execution", desc: "Builds, tests, scans dependencies, audits security, and generates Docker images.", icon: Play },
    { step: "04", title: "Inspect Unified Health & AI Fixes", desc: "Review your 0–100 Health Score, inspect logs, and resolve errors with AI.", icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold text-white">How DevForge Works</h1>
          <p className="text-gray-400 text-sm">Four simple steps from code commit to containerized delivery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold font-mono text-brand-400">{s.step}</span>
                  <Icon className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
