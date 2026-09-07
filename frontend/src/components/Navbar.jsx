import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cpu, LogOut, Sparkles, Layers } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout, isDemoMode, toggleDemoMode } = useAuth();

  return (
    <header className="h-16 bg-dark-800 border-b border-gray-800 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="font-extrabold text-lg text-white tracking-wider flex items-center gap-2">
              DevForge <span className="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-500 font-mono">v1.0</span>
            </div>
            <div className="text-[11px] text-gray-400 font-mono tracking-tight">Forge. Build. Ship.</div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Demo Mode Toggle Button */}
        <button
          onClick={toggleDemoMode}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all border ${
            isDemoMode
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
          }`}
          title="Toggle between Live API and Realistic Demo Mode"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isDemoMode ? 'Demo Mode Active' : 'Live API Connected'}</span>
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition"
            >
              <Layers className="w-4 h-4" />
              Console
            </Link>
            <div className="h-6 w-[1px] bg-gray-800" />
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <div className="w-8 h-8 rounded-full bg-brand-600/30 border border-brand-500/40 text-brand-400 font-bold flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block">
                <div className="font-medium text-white">{user?.name}</div>
                <div className="text-[10px] text-gray-400">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-rose-400 transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-xs text-gray-300 hover:text-white font-medium px-3 py-1.5">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-md shadow-brand-600/20 transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
