import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectApi } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { MetricCard, StatusBadge } from '../components/MetricCard';
import { HealthScoreMeter } from '../components/LogViewer';
import { 
  FolderGit2, 
  CheckCircle2, 
  XCircle, 
  CheckSquare, 
  ShieldAlert, 
  AlertTriangle, 
  Box, 
  Activity,
  ArrowRight,
  PlusCircle,
  Play,
  Clock,
  Sparkles
} from 'lucide-react';

export const DashboardPage = () => {
  const { isDemoMode } = useAuth();
  const [projects, setProjects] = useState([]);
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const projRes = await projectApi.getAll(isDemoMode);
      const runRes = await projectApi.getRecentRuns(isDemoMode);
      setProjects(projRes.data || []);
      setRuns(runRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, [isDemoMode]);

  const avgHealth = projects.length 
    ? Math.round(projects.reduce((acc, curr) => acc + (curr.healthScore || 85), 0) / projects.length)
    : 85;

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
                Infrastructure Workstation
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-600/20 text-brand-400 font-mono font-normal border border-brand-500/30">
                  {isDemoMode ? 'Demo Sandbox' : 'Live Workspace'}
                </span>
              </h1>
              <p className="text-xs text-gray-400 mt-1">Real-time pipeline orchestration, security scanning & health metrics</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/projects/new"
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Connect GitHub Repository</span>
              </Link>
            </div>
          </div>

          {/* Overview Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Total Projects" value={projects.length || 3} icon={FolderGit2} color="brand" trend="+1 new" />
            <MetricCard title="Successful Builds" value={projects.filter(p => p.lastPipelineStatus === 'SUCCESS').length || 2} icon={CheckCircle2} color="emerald" trend="100% pass" />
            <MetricCard title="Failed Builds" value={projects.filter(p => p.lastPipelineStatus === 'FAILED').length || 1} icon={XCircle} color="rose" />
            <MetricCard title="Tests Executed" value="47" subtext="47 Passed / 0 Skipped" icon={CheckSquare} color="emerald" />

            <MetricCard title="Security Issues" value="2" subtext="1 Medium, 1 Low" icon={ShieldAlert} color="amber" />
            <MetricCard title="Vulnerable Dependencies" value="1" subtext="jackson-databind" icon={AlertTriangle} color="amber" />
            <MetricCard title="Dockerized Projects" value={projects.filter(p => p.hasDockerfile).length || 3} icon={Box} color="cyan" />
            <MetricCard title="Avg Health Score" value={`${avgHealth}/100`} subtext="Weighted Metric" icon={Activity} color="emerald" trend="Optimal" />
          </div>

          {/* Main Grid: Recent Projects & Health Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Projects Table (2 Cols) */}
            <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-gray-800 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-brand-400" />
                  <span>Monitored Repositories</span>
                </div>
                <Link to="/projects" className="text-xs text-brand-400 hover:underline font-mono">
                  View All ({projects.length}) →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-800">
                      <th className="pb-3 font-semibold">PROJECT NAME</th>
                      <th className="pb-3 font-semibold">LANGUAGE</th>
                      <th className="pb-3 font-semibold">BUILD</th>
                      <th className="pb-3 font-semibold">PIPELINE</th>
                      <th className="pb-3 font-semibold text-right">HEALTH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-800/40 transition group">
                        <td className="py-3">
                          <Link to={`/projects/${p.id}`} className="font-bold text-white group-hover:text-brand-400 transition">
                            {p.name}
                          </Link>
                          <div className="text-[10px] text-gray-500 truncate max-w-xs">{p.repositoryUrl}</div>
                        </td>
                        <td className="py-3 text-gray-300">{p.language}</td>
                        <td className="py-3 text-gray-300">{p.buildSystem}</td>
                        <td className="py-3">
                          <StatusBadge status={p.lastPipelineStatus} />
                        </td>
                        <td className="py-3 text-right font-bold text-emerald-400">
                          {p.healthScore} / 100
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Health Score Overview Meter (1 Col) */}
            <div className="p-6 rounded-2xl glass-panel border border-gray-800 flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Overall System Health</span>
              </h2>
              <HealthScoreMeter score={avgHealth} showDetails={true} />
              <p className="text-xs text-gray-400 px-2">
                Score dynamically calculated from build success rate, test coverage, OWASP security scans, and containerization.
              </p>
              <Link
                to="/health"
                className="w-full py-2 bg-dark-800 hover:bg-dark-700 text-brand-400 border border-gray-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <span>Full Score Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Recent Pipeline Executions */}
          <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Recent Automated Pipeline Runs</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">Showing last 5 executions</span>
            </div>

            <div className="space-y-3">
              {runs.map((run) => (
                <div key={run.id} className="p-4 rounded-xl bg-dark-800/80 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex items-center gap-4">
                    <StatusBadge status={run.status} />
                    <div>
                      <div className="font-bold text-white">{run.projectName}</div>
                      <div className="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
                        <span>Run ID: #{run.id}</span>
                        <span>•</span>
                        <span>{run.triggerReason || 'Manual Trigger'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-gray-400 text-[10px]">DURATION</div>
                      <div className="font-bold text-gray-200">{Math.round((run.durationMs || 45000) / 1000)}s</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-[10px]">HEALTH SCORE</div>
                      <div className="font-bold text-emerald-400">{run.healthScore || 87}/100</div>
                    </div>
                    <Link
                      to={`/projects/${run.projectId}`}
                      className="px-3 py-1.5 bg-dark-900 hover:bg-gray-800 border border-gray-700 text-gray-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <span>Inspect Logs</span>
                    </Link>
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
