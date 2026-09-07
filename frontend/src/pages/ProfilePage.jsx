import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Mail, Key } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <User className="w-6 h-6 text-brand-400" />
              <span>User Profile & Security Token</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Authenticated user credentials and JWT session tokens</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-6 font-mono text-xs">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-600/30 border border-brand-500/40 text-brand-400 font-extrabold text-2xl flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <div className="text-lg font-bold text-white">{user?.name}</div>
                <div className="text-gray-400 text-xs">{user?.email}</div>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30 text-[10px]">
                  {user?.role || 'ROLE_USER'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 space-y-2">
              <div className="text-gray-400 text-[10px] uppercase">JWT AUTHENTICATION TOKEN</div>
              <div className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] break-all border border-gray-800">
                Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vQGRldmZvcmdlLmlvIiwidXNlcklkIjoxLCJpYXQiOjE3MDk4MTc2MDAsImV4cCI6MTcwOTkwNDAwMH0...
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
