import React from 'react';
import { LogOut, AlertTriangle, X } from 'lucide-react';

export const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-dark-800 border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg transition"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
            <LogOut className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Sign Out of DevForge?</h2>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">Confirm session termination</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed font-sans bg-dark-900/60 p-3.5 rounded-xl border border-gray-800/80">
          You are about to sign out of your developer workstation. Your stored credentials and JWT token will be purged from this browser session.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-dark-900 hover:bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-2 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Confirm Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
