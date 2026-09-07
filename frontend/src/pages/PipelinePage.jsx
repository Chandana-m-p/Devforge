import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { projectApi } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { StatusBadge } from '../components/MetricCard';
import { Workflow, Clock, RefreshCw } from 'lucide-react';

export const PipelinePage = () => {
  const { isDemoMode } = useAuth();
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    const fetchRuns = async () => {
      const res = await projectApi.getRecentRuns(isDemoMode);
      setRuns(res.data || []);
    };
    fetchRuns();
  }, [isDemoMode]);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <Workflow className="w-6 h-6 text-brand-400" />
              <span>Automated Pipeline Executions</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Real-time telemetry for all project build, test, and security stages</p>
          </div>

          <div className="space-y-4">
            {runs.map((run) => (
              <div key={run.id} className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4 font-mono text-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-3">
                  <div>
                    <div className="font-bold text-base text-white">{run.projectName}</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">Run ID: #{run.id} • Trigger: {run.triggerReason || 'Manual'}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={run.status} />
                    <span className="text-emerald-400 font-bold">Health: {run.healthScore || 87}/100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {(run.stages || [
                    { stageName: "ANALYZE", status: "SUCCESS" },
                    { stageName: "BUILD", status: "SUCCESS" },
                    { stageName: "TEST", status: "SUCCESS" },
                    { stageName: "DEPENDENCY_SCAN", status: "SUCCESS" },
                    { stageName: "SECURITY_SCAN", status: "SUCCESS" },
                    { stageName: "DOCKER_BUILD", status: "SUCCESS" },
                  ]).map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-dark-900 border border-gray-800 text-center space-y-1">
                      <div className="text-[10px] text-gray-500">{s.stageName}</div>
                      <StatusBadge status={s.status} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
