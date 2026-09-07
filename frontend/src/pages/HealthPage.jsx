import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { HealthScoreMeter } from '../components/LogViewer';
import { Activity } from 'lucide-react';

export const HealthPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <Activity className="w-6 h-6 text-emerald-400" />
              <span>Project Health Scoring Matrix</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Weighted 0–100 score calculation across build, test, security, and container readiness</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl glass-panel border border-gray-800 flex flex-col items-center justify-center text-center">
              <HealthScoreMeter score={87} showDetails={true} />
            </div>

            <div className="md:col-span-2 p-6 rounded-2xl glass-panel border border-gray-800 space-y-4 font-mono text-xs">
              <div className="font-bold text-sm text-white border-b border-gray-800 pb-3">Weighted Scoring Breakdown</div>
              <div className="space-y-3">
                {[
                  { title: "Build Orchestration (25%)", score: 100, status: "Optimal" },
                  { title: "Automated Testing (25%)", score: 100, status: "47/47 Passed" },
                  { title: "Security Scanning (20%)", score: 85, status: "1 Medium, 1 Low" },
                  { title: "Dependency Freshness (15%)", score: 78, status: "2 Outdated Libraries" },
                  { title: "Docker Containerization (10%)", score: 100, status: "Dockerfile & Compose Ready" },
                  { title: "CI/CD Automation (5%)", score: 90, status: "GitHub Actions Configured" },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-dark-900 border border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{item.status}</div>
                    </div>
                    <div className="text-right font-bold text-emerald-400 text-sm">
                      {item.score}/100
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
