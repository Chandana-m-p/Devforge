import React from 'react';

export const MetricCard = ({ title, value, subtext, icon: Icon, color = "brand", trend }) => {
  const colorStyles = {
    brand: "from-brand-600/20 to-brand-700/10 border-brand-500/30 text-brand-400",
    emerald: "from-emerald-600/20 to-emerald-700/10 border-emerald-500/30 text-emerald-400",
    rose: "from-rose-600/20 to-rose-700/10 border-rose-500/30 text-rose-400",
    amber: "from-amber-600/20 to-amber-700/10 border-amber-500/30 text-amber-400",
    cyan: "from-cyan-600/20 to-cyan-700/10 border-cyan-500/30 text-cyan-400",
  };

  const selectedColor = colorStyles[color] || colorStyles.brand;

  return (
    <div className={`p-5 rounded-xl bg-gradient-to-br ${selectedColor} border backdrop-blur-md relative overflow-hidden transition-transform hover:-translate-y-0.5`}>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</div>
        {Icon && <Icon className="w-5 h-5 opacity-80" />}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-3xl font-extrabold text-white font-mono tracking-tight">{value}</div>
        {trend && (
          <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {trend}
          </span>
        )}
      </div>

      {subtext && <div className="mt-1 text-xs text-gray-400">{subtext}</div>}
    </div>
  );
};

export const StatusBadge = ({ status }) => {
  const st = (status || 'UNKNOWN').toUpperCase();

  const styles = {
    SUCCESS: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    PASSED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    RUNNING: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse",
    PENDING: "bg-gray-500/10 text-gray-400 border-gray-500/30",
    FAILED: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    SKIPPED: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    CRITICAL: "bg-rose-600 text-white font-bold",
    HIGH: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    MEDIUM: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    LOW: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  };

  const style = styles[st] || "bg-gray-700 text-gray-300 border-gray-600";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded border text-[11px] font-mono font-medium uppercase tracking-wide ${style}`}>
      {st}
    </span>
  );
};
