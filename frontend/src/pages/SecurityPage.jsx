import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { MetricCard, StatusBadge } from '../components/MetricCard';
import { ShieldAlert, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
              <span>OWASP & Security Scanning Dashboard</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Continuous vulnerability scanning, dependency auditing, and custom rule enforcement</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <MetricCard title="Critical" value="0" icon={ShieldAlert} color="rose" />
            <MetricCard title="High" value="0" icon={ShieldAlert} color="rose" />
            <MetricCard title="Medium" value="1" icon={AlertTriangle} color="amber" />
            <MetricCard title="Low" value="1" icon={ShieldCheck} color="brand" />
            <MetricCard title="Security Rating" value="85%" icon={ShieldCheck} color="emerald" />
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4 font-mono text-xs">
            <div className="font-bold text-sm text-white border-b border-gray-800 pb-3">Active Security Vulnerability Findings</div>
            <div className="space-y-4">
              {[
                {
                  title: "Outdated Jackson Databind Dependency (CVE-2023-35116)",
                  severity: "MEDIUM",
                  target: "pom.xml",
                  desc: "Potential denial of service via cyclic JSON data structures.",
                  fix: "Upgrade jackson-databind to >= 2.15.2"
                },
                {
                  title: "Spring Boot Actuator Health Endpoint Exposed",
                  severity: "LOW",
                  target: "src/main/resources/application.yml",
                  desc: "Health endpoint displays internal telemetry without role check.",
                  fix: "Set management.endpoint.health.show-details=when_authorized"
                }
              ].map((f, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{f.title}</span>
                    <StatusBadge status={f.severity} />
                  </div>
                  <div className="text-[11px] text-gray-400">Target File: {f.target}</div>
                  <div className="text-[11px] text-gray-300">{f.desc}</div>
                  <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                    💡 Recommendation: {f.fix}
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
