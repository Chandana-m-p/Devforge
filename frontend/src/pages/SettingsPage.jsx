import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Settings, Sliders, Shield, Database, Cpu } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <Settings className="w-6 h-6 text-brand-400" />
              <span>Platform Settings & Infrastructure Config</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Configure Spring Boot backend, PostgreSQL, and Python AI microservice integration</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-6 font-mono text-xs">
            <div className="space-y-4">
              <div className="font-bold text-sm text-white">Database & Backend Endpoint</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-dark-900 rounded-xl border border-gray-800">
                  <div className="text-[10px] text-gray-500">SPRING BOOT API</div>
                  <div className="font-bold text-emerald-400 mt-1">http://localhost:8080/api</div>
                </div>
                <div className="p-3.5 bg-dark-900 rounded-xl border border-gray-800">
                  <div className="text-[10px] text-gray-500">PRIMARY DATABASE</div>
                  <div className="font-bold text-cyan-400 mt-1">PostgreSQL 15 / H2 Fallback</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 space-y-4">
              <div className="font-bold text-sm text-white">AI Microservice Endpoint</div>
              <div className="p-3.5 bg-dark-900 rounded-xl border border-gray-800">
                <div className="text-[10px] text-gray-500">FASTAPI SERVICE URL</div>
                <div className="font-bold text-purple-400 mt-1">http://localhost:8000 (Optional)</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
