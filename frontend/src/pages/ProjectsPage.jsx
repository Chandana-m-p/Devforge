import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectApi } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { StatusBadge } from '../components/MetricCard';
import { FolderGit2, PlusCircle, Search, Play, ExternalLink, Activity, Box, ShieldCheck } from 'lucide-react';

export const ProjectsPage = () => {
  const { isDemoMode } = useAuth();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await projectApi.getAll(isDemoMode);
      setProjects(res.data || []);
    };
    fetchProjects();
  }, [isDemoMode]);

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Monitored Projects Catalog</h1>
              <p className="text-xs text-gray-400 mt-1">Integrated GitHub repositories with continuous health monitoring</p>
            </div>
            <Link
              to="/projects/new"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition self-start"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Import New Repository</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="mb-6 relative max-w-md">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search projects by name or language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark-800 border border-gray-700 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-gray-200 focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl glass-panel border border-gray-800 flex flex-col justify-between space-y-4 hover:border-brand-500/40 transition">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-base text-white hover:text-brand-400 transition">
                      <Link to={`/projects/${p.id}`}>{p.name}</Link>
                    </div>
                    <StatusBadge status={p.lastPipelineStatus} />
                  </div>

                  <a
                    href={p.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gray-400 flex items-center gap-1 hover:text-brand-400 transition font-mono mb-4 truncate"
                  >
                    <span>{p.repositoryUrl}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                    <div className="p-2 rounded bg-dark-900 border border-gray-800">
                      <div className="text-[10px] text-gray-500">LANGUAGE</div>
                      <div className="font-semibold text-gray-200">{p.language}</div>
                    </div>
                    <div className="p-2 rounded bg-dark-900 border border-gray-800">
                      <div className="text-[10px] text-gray-500">BUILD SYSTEM</div>
                      <div className="font-semibold text-gray-200">{p.buildSystem}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-emerald-400">{p.healthScore}</span>
                    <span className="text-gray-500">/100</span>
                  </div>

                  <Link
                    to={`/projects/${p.id}`}
                    className="px-3.5 py-1.5 bg-brand-600/20 hover:bg-brand-600/30 text-brand-400 border border-brand-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Manage Workstation</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
