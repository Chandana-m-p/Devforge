import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Sparkles, Terminal, ArrowRight, Code } from 'lucide-react';
import { projectApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AIAssistantPage = () => {
  const { isDemoMode } = useAuth();
  const [log, setLog] = useState('java.lang.NullPointerException: Cannot invoke "com.devforge.entity.User.getEmail()" because "user" is null');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await projectApi.explainAI(log, "Standalone AI Panel", isDemoMode);
    setResponse(res.data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-brand-400" />
              <span>AI Error Explanation & Remediation Assistant</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Paste compilation errors or stack traces to receive plain-English diagnostics and code fixes</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-6">
            <form onSubmit={handleAsk} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 font-mono">
                  Stack Trace or Error Output
                </label>
                <textarea
                  rows="4"
                  value={log}
                  onChange={(e) => setLog(e.target.value)}
                  className="w-full bg-dark-900 border border-gray-700 rounded-xl p-3.5 text-xs text-gray-200 focus:outline-none focus:border-brand-500 font-mono"
                  placeholder="Paste error logs here..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-brand-600/30 transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? "Analyzing Root Cause..." : "Explain Error & Suggest Fix"}</span>
              </button>
            </form>

            {response && (
              <div className="pt-6 border-t border-gray-800 space-y-4 font-mono text-xs animate-fadeIn">
                <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-1">
                  <div className="text-[10px] text-gray-500 uppercase">DIAGNOSIS</div>
                  <div className="font-bold text-rose-400 text-sm">{response.whatWentWrong}</div>
                </div>

                <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-1">
                  <div className="text-[10px] text-gray-500 uppercase">REASON</div>
                  <div className="text-gray-300">{response.whyItHappened}</div>
                </div>

                <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-1">
                  <div className="text-[10px] text-gray-500 uppercase">ACTIONABLE FIX</div>
                  <div className="text-emerald-400 font-bold">{response.howToFix}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-gray-800 space-y-2">
                  <div className="text-[10px] text-gray-500 uppercase">SUGGESTED CODE SNIPPET</div>
                  <pre className="text-xs overflow-x-auto">{response.exampleSolution}</pre>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
