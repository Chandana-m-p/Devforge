import React from 'react';
import { Navbar } from '../components/Navbar';
import { Cpu, Database, Server, Sparkles, Box } from 'lucide-react';

export const ArchitecturePage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 py-16 px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold text-white">System Architecture</h1>
          <p className="text-gray-400 text-sm">Decoupled full-stack architecture with modular AI microservice and database abstractions.</p>
        </div>

        <div className="p-8 rounded-2xl glass-panel border border-gray-800 space-y-8 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-5 rounded-xl bg-dark-900 border border-gray-800 space-y-2">
              <Cpu className="w-6 h-6 text-brand-400 mx-auto" />
              <div className="font-bold text-white text-sm">React Frontend</div>
              <div className="text-gray-400 text-[11px]">Vite, Tailwind CSS, Lucide Icons</div>
            </div>

            <div className="p-5 rounded-xl bg-dark-900 border border-gray-800 space-y-2">
              <Server className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="font-bold text-white text-sm">Spring Boot Backend</div>
              <div className="text-gray-400 text-[11px]">Java 17, JWT, JPA, Execution Engine</div>
            </div>

            <div className="p-5 rounded-xl bg-dark-900 border border-gray-800 space-y-2">
              <Sparkles className="w-6 h-6 text-purple-400 mx-auto" />
              <div className="font-bold text-white text-sm">Python AI Microservice</div>
              <div className="text-gray-400 text-[11px]">FastAPI, Uvicorn, Rule Engine</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-gray-800 leading-relaxed overflow-x-auto whitespace-pre">
{`+-------------------------------------------------------------------------+
|                              DevForge Web UI                            |
|                       (React 18 + Tailwind CSS + Vite)                  |
+------------------------------------+------------------------------------+
                                     | REST API + JWT
                                     v
+-------------------------------------------------------------------------+
|                        Spring Boot 3.x Backend Service                  |
|          (Pipeline Orchestrator / OWASP Scanner / Docker Generator)     |
+-------------------+----------------+------------------+-----------------+
                    |                |                  |
                    v                v                  v
          +-------------------+ +---------+   +-------------------+
          | PostgreSQL / H2   | | Build   |   | Python FastAPI AI |
          | Database Storage  | | Engine  |   | Error Assistant   |
          +-------------------+ +---------+   +-------------------+`}
          </div>
        </div>
      </main>
    </div>
  );
};
