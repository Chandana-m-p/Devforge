import React from 'react';
import { Navbar } from '../components/Navbar';
import { 
  GitBranch, 
  Search, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  Box, 
  Workflow, 
  Terminal, 
  Activity, 
  Sparkles 
} from 'lucide-react';

export const FeaturesPage = () => {
  const features = [
    { title: "GitHub Integration", desc: "Connect repositories directly via API without exposing personal secrets.", icon: GitBranch },
    { title: "Automatic Project Detection", desc: "Auto-detects Java, Python, JS, TS, Maven, Gradle, and npm frameworks.", icon: Search },
    { title: "Build Orchestration", desc: "Automated execution of clean compilation commands with exit code validation.", icon: Wrench },
    { title: "Automated Unit Testing", desc: "Runs JUnit, pytest, or Vitest suites and aggregates pass/fail rates.", icon: CheckCircle2 },
    { title: "OWASP Security Scans", desc: "Integrated dependency check & custom security rule analysis.", icon: ShieldCheck },
    { title: "Docker Containerization", desc: "Multi-stage Dockerfile generation and docker-compose manifest previews.", icon: Box },
    { title: "CI/CD Pipeline Generator", desc: "1-click generation of production-ready GitHub Actions YAML workflows.", icon: Workflow },
    { title: "Centralized Console Logs", desc: "Unified log console with search, level filters, and download capabilities.", icon: Terminal },
    { title: "0–100 Health Score", desc: "Weighted score calculating build, test, security, and dependency health.", icon: Activity },
    { title: "AI Error Assistant", desc: "Beginner-friendly root cause explanations and code fixes for failures.", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold text-white">DevForge Core Capabilities</h1>
          <p className="text-gray-400 text-sm">One unified developer platform eliminating manual DevOps setup.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-3">
                <Icon className="w-6 h-6 text-brand-400" />
                <h3 className="text-base font-bold text-white">{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
