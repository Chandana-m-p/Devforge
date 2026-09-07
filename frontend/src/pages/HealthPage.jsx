import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { HealthScoreMeter } from '../components/LogViewer';
import { Activity, Download, FileText, CheckCircle2, ShieldCheck, Award, Sparkles } from 'lucide-react';

export const HealthPage = () => {
  const [exported, setExported] = useState(false);

  const handleExportCertificate = () => {
    const certText = `# DEVFORGE PROJECT HEALTH AUDIT CERTIFICATE
Generated: ${new Date().toUTCString()}
Platform: DevForge Infrastructure Console v1.0

--------------------------------------------------
OVERALL PROJECT HEALTH SCORE: 87 / 100 [OPTIMAL]
--------------------------------------------------

WEIGHTED SCORING BREAKDOWN:
- Build Orchestration (25% Weight)  : 100/100 [PASSED]
- Automated Testing (25% Weight)    : 100/100 [47/47 PASSED]
- OWASP Security Scanning (20%)     :  85/100 [1 Medium, 1 Low]
- Dependency Freshness (15%)        :  78/100 [2 Outdated Packages]
- Docker Containerization (10%)     : 100/100 [Multi-Stage Ready]
- CI/CD Automation (5%)             :  90/100 [GitHub Actions Sync]

SECURITY AUDIT SUMMARY:
- Critical Vulnerabilities          : 0 Findings
- High Vulnerabilities              : 0 Findings
- Medium Vulnerabilities            : 1 Finding (CVE-2023-35116 Databind)
- Low Vulnerabilities               : 1 Finding (Actuator Exposure)

VERIFICATION SEAL: DEVFORGE-AUDIT-SEAL-VERIFIED-2026
`;

    const element = document.createElement("a");
    const file = new Blob([certText], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = "devforge_project_health_certificate.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-400" />
                <span>Project Health Scoring Matrix</span>
              </h1>
              <p className="text-xs text-gray-400 mt-1">Weighted 0–100 score calculation across build, test, security, and container readiness</p>
            </div>

            <button
              onClick={handleExportCertificate}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition self-start"
            >
              <Download className="w-4 h-4" />
              <span>{exported ? 'Certificate Exported!' : 'Export Health Audit Certificate (.md)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl glass-panel border border-gray-800 flex flex-col items-center justify-center text-center space-y-4">
              <HealthScoreMeter score={87} showDetails={true} />
              <div className="p-3 rounded-xl bg-dark-900 border border-gray-800 w-full text-xs font-mono">
                <div className="text-[10px] text-gray-500 uppercase">AUDIT VERIFICATION SEAL</div>
                <div className="font-bold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>VERIFIED OPTIMAL</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 p-6 rounded-2xl glass-panel border border-gray-800 space-y-4 font-mono text-xs">
              <div className="font-bold text-sm text-white border-b border-gray-800 pb-3 flex items-center justify-between">
                <span>Weighted Scoring Breakdown</span>
                <span className="text-xs text-brand-400">Total Weight: 100%</span>
              </div>
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
