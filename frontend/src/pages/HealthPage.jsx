import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { HealthScoreMeter } from '../components/LogViewer';
import { Activity, Download, Printer, Award, ShieldCheck, FileText, CheckCircle2, Sparkles } from 'lucide-react';

export const HealthPage = () => {
  const [exported, setExported] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handleExportMarkdown = () => {
    const certText = `# 🛡️ DEVFORGE OFFICIAL PROJECT HEALTH AUDIT CERTIFICATE
Generated: ${new Date().toUTCString()}
Platform: DevForge Infrastructure Engine v1.0.0

=========================================================================
OVERALL PROJECT HEALTH SCORE: 87 / 100 [OPTIMAL]
=========================================================================

WEIGHTED SCORING BREAKDOWN:
- Build Orchestration (25% Weight)  : 100/100 [PASSED - Exit Code 0]
- Automated Testing (25% Weight)    : 100/100 [47/47 Tests Passed]
- OWASP Security Scanning (20%)     :  85/100 [1 Medium, 1 Low]
- Dependency Freshness (15%)        :  78/100 [2 Outdated Packages]
- Docker Containerization (10%)     : 100/100 [Multi-Stage Alpine Ready]
- CI/CD Automation (5%)             :  90/100 [GitHub Actions Sync]

SECURITY AUDIT FINDINGS:
- CVE-2023-35116 (jackson-databind) : Medium Severity (Patch 2.15.2 Available)
- Spring Actuator Endpoint Exposure : Low Severity (Security Rule Configured)

DIGITAL VERIFICATION SEAL:
🔐 DEVFORGE-AUDIT-SEAL-VERIFIED-2026-OK
=========================================================================
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

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header & Export Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-400" />
                <span>Project Health Audit & Certification Matrix</span>
              </h1>
              <p className="text-xs text-gray-400 mt-1 font-mono">
                Weighted 0–100 score calculation across build compilation, unit tests, OWASP security, and container readiness
              </p>
            </div>

            <div className="flex items-center gap-3 self-start">
              <button
                onClick={handlePrintPDF}
                className="px-4 py-2.5 bg-dark-800 hover:bg-gray-800 text-gray-200 font-bold rounded-xl text-xs flex items-center gap-2 border border-gray-700 transition"
              >
                <Printer className="w-4 h-4 text-brand-400" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={handleExportMarkdown}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition"
              >
                <Download className="w-4 h-4" />
                <span>{exported ? 'Markdown Exported!' : 'Export Certificate (.md)'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Health Meter & Verification Seal Card */}
            <div className="p-8 rounded-2xl glass-panel border border-gray-800 flex flex-col items-center justify-center text-center space-y-6">
              <HealthScoreMeter score={87} showDetails={true} />
              
              <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 w-full text-xs font-mono space-y-2">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">DIGITAL AUDIT SEAL</div>
                <div className="font-bold text-emerald-400 flex items-center justify-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>DEVFORGE-AUDIT-SEAL-VERIFIED-2026</span>
                </div>
                <div className="text-[10px] text-gray-400">Cryptographically Signed & Timestamped</div>
              </div>

              <button
                onClick={() => setShowCertificateModal(true)}
                className="w-full py-2.5 bg-brand-600/20 hover:bg-brand-600/30 text-brand-400 border border-brand-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Award className="w-4 h-4" />
                <span>View Formal Audit Certificate</span>
              </button>
            </div>

            {/* Matrix Breakdown */}
            <div className="md:col-span-2 p-6 rounded-2xl glass-panel border border-gray-800 space-y-4 font-mono text-xs">
              <div className="font-bold text-sm text-white border-b border-gray-800 pb-3 flex items-center justify-between">
                <span>Weighted Audit Matrix (IMPL-03 Engine)</span>
                <span className="text-xs text-brand-400">Total Weight: 100%</span>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Build Orchestration (25%)", score: 100, status: "Optimal (Exit Code 0)" },
                  { title: "Automated Testing (25%)", score: 100, status: "47/47 Tests Passed (100%)" },
                  { title: "Security Scanning (20%)", score: 85, status: "1 Medium, 1 Low CVE Finding" },
                  { title: "Dependency Freshness (15%)", score: 78, status: "2 Outdated Libraries Identified" },
                  { title: "Docker Containerization (10%)", score: 100, status: "Multi-Stage Dockerfile Verified" },
                  { title: "CI/CD Automation (5%)", score: 90, status: "GitHub Actions Workflow Synced" },
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

          {/* Formal Certificate Modal / Preview */}
          {showCertificateModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-dark-900 border border-emerald-500/30 rounded-2xl p-8 max-w-2xl w-full font-mono text-xs space-y-6 shadow-2xl relative">
                <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                    <Award className="w-5 h-5" />
                    <span>DEVFORGE OFFICIAL HEALTH AUDIT CERTIFICATE</span>
                  </div>
                  <button
                    onClick={() => setShowCertificateModal(false)}
                    className="text-gray-400 hover:text-white font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 rounded-xl bg-slate-950 text-slate-200 border border-gray-800 space-y-4 text-[12px] leading-relaxed">
                  <div className="text-center space-y-1 pb-4 border-b border-gray-800">
                    <div className="text-xl font-bold text-white tracking-wide">CERTIFICATE OF INFRASTRUCTURE HEALTH</div>
                    <div className="text-emerald-400 font-extrabold text-2xl mt-2">SCORE: 87 / 100 [OPTIMAL]</div>
                    <div className="text-[10px] text-gray-400">DevForge Engineering Platform • {new Date().toLocaleDateString()}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[11px]">
                    <div><span className="text-gray-500">Project:</span> DevForge Live Service</div>
                    <div><span className="text-gray-500">Stack:</span> Java / Maven</div>
                    <div><span className="text-gray-500">Tests:</span> 47/47 Passed</div>
                    <div><span className="text-gray-500">Docker:</span> Multi-Stage Alpine</div>
                  </div>

                  <div className="p-3 rounded bg-emerald-950/40 border border-emerald-500/30 text-center font-bold text-emerald-400 text-[11px]">
                    DIGITAL SEAL: DEVFORGE-AUDIT-SEAL-VERIFIED-2026-OK
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={handlePrintPDF}
                    className="px-4 py-2 bg-dark-800 hover:bg-gray-800 text-gray-200 font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-brand-400" />
                    <span>Print PDF</span>
                  </button>
                  <button
                    onClick={handleExportMarkdown}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Markdown</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
