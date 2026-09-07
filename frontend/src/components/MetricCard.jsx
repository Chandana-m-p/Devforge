import React from 'react';

export const MetricCard = ({ title, value, subtext, icon: Icon, color = "brand", trend }) => {
  const colorStyles = {
    brand: {
      card: "from-brand-600/15 via-brand-700/5 to-transparent border-brand-500/30 text-brand-400",
      accent: "bg-gradient-to-r from-brand-500 to-indigo-600",
      glow: "shadow-brand-500/10"
    },
    emerald: {
      card: "from-emerald-600/15 via-emerald-700/5 to-transparent border-emerald-500/30 text-emerald-400",
      accent: "bg-gradient-to-r from-emerald-400 to-teal-500",
      glow: "shadow-emerald-500/10"
    },
    rose: {
      card: "from-rose-600/15 via-rose-700/5 to-transparent border-rose-500/30 text-rose-400",
      accent: "bg-gradient-to-r from-rose-500 to-pink-600",
      glow: "shadow-rose-500/10"
    },
    amber: {
      card: "from-amber-600/15 via-amber-700/5 to-transparent border-amber-500/30 text-amber-400",
      accent: "bg-gradient-to-r from-amber-400 to-orange-500",
      glow: "shadow-amber-500/10"
    },
    cyan: {
      card: "from-cyan-600/15 via-cyan-700/5 to-transparent border-cyan-500/30 text-cyan-400",
      accent: "bg-gradient-to-r from-cyan-400 to-blue-500",
      glow: "shadow-cyan-500/10"
    },
  };

  const selected = colorStyles[color] || colorStyles.brand;

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${selected.card} border backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${selected.glow}`}>
      {/* Neon Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${selected.accent}`} />

      <div className="flex items-center justify-between">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">{title}</div>
        {Icon && (
          <div className="p-2 rounded-xl bg-dark-900/80 border border-gray-800 shrink-0">
            <Icon className="w-4 h-4 opacity-90" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-3xl font-black text-white font-mono tracking-tight">{value}</div>
        {trend && (
          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
            {trend}
          </span>
        )}
      </div>

      {subtext && <div className="mt-1 text-[11px] text-gray-400 font-sans">{subtext}</div>}
    </div>
  );
};

export const StatusBadge = ({ status }) => {
  const st = (status || 'UNKNOWN').toUpperCase();

  const styles = {
    SUCCESS: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm shadow-emerald-500/10",
    PASSED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm shadow-emerald-500/10",
    RUNNING: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse",
    PENDING: "bg-gray-500/10 text-gray-400 border-gray-500/30",
    FAILED: "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-sm shadow-rose-500/10",
    SKIPPED: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    CRITICAL: "bg-rose-600 text-white font-bold shadow-md shadow-rose-600/20",
    HIGH: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    MEDIUM: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    LOW: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  };

  const style = styles[st] || "bg-gray-700 text-gray-300 border-gray-600";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[11px] font-mono font-bold uppercase tracking-wider ${style}`}>
      {st}
    </span>
  );
};
