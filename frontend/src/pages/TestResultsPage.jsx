import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { MetricCard, StatusBadge } from '../components/MetricCard';
import { CheckSquare, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const TestResultsPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <CheckSquare className="w-6 h-6 text-emerald-400" />
              <span>Automated Test Execution Results</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">JUnit 5, pytest, and Vitest test suite outcomes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Total Tests Executed" value="47" icon={CheckSquare} color="brand" />
            <MetricCard title="Passed" value="47" icon={CheckCircle2} color="emerald" trend="100%" />
            <MetricCard title="Failed" value="0" icon={XCircle} color="rose" />
            <MetricCard title="Duration" value="1.84s" icon={Clock} color="cyan" />
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4 font-mono text-xs">
            <div className="font-bold text-sm text-white border-b border-gray-800 pb-3">Test Suite Breakdown</div>
            <div className="space-y-3">
              {[
                { name: "com.devforge.api.UserControllerTest", total: 14, passed: 14, failed: 0, duration: "420ms" },
                { name: "com.devforge.service.PipelineServiceTest", total: 18, passed: 18, failed: 0, duration: "710ms" },
                { name: "com.devforge.security.JwtTokenProviderTest", total: 15, passed: 15, failed: 0, duration: "510ms" }
              ].map((suite, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-dark-900 border border-gray-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{suite.name}</div>
                    <div className="text-[10px] text-gray-400 mt-1">Duration: {suite.duration}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-400 font-bold">{suite.passed}/{suite.total} Passed</span>
                    <StatusBadge status="SUCCESS" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
