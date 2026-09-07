import React, { useState, useEffect, useRef } from 'react';
import { Copy, Download, Search, Check, Terminal, Radio } from 'lucide-react';

export const LogViewer = ({ logs, title = "Pipeline Stage Execution Log", isStreaming = false }) => {
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('');
  const logEndRef = useRef(null);

  useEffect(() => {
    if (isStreaming && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isStreaming]);

  const handleCopy = () => {
    navigator.clipboard.writeText(logs || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([logs || ''], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "devforge_execution_log.log";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredLogs = logs
    ? logs.split('\n').filter(line => line.toLowerCase().includes(filter.toLowerCase())).join('\n')
    : 'No logs recorded.';

  return (
    <div className="rounded-xl border border-gray-800 bg-dark-900 overflow-hidden font-mono text-xs shadow-2xl">
      <div className="bg-dark-800 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-gray-300 font-semibold">
          <Terminal className="w-4 h-4 text-brand-400" />
          <span>{title}</span>
          {isStreaming && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE TELEMETRY STREAMING
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search logs..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-dark-900 border border-gray-700 rounded px-2.5 py-1 pl-8 text-xs text-gray-200 focus:outline-none focus:border-brand-500 w-36 md:w-48"
            />
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
            title="Copy Logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
            title="Download Logs"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="p-4 bg-slate-950 text-slate-200 overflow-x-auto max-h-96 text-[12px] leading-relaxed whitespace-pre-wrap selection:bg-brand-600 selection:text-white">
        {filteredLogs}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export const HealthScoreMeter = ({ score = 85, showDetails = true }) => {
  const getScoreColor = (s) => {
    if (s >= 90) return { stroke: '#10B981', text: 'text-emerald-400', label: 'Optimal Health' };
    if (s >= 75) return { stroke: '#F59E0B', text: 'text-amber-400', label: 'Good Health' };
    return { stroke: '#EF4444', text: 'text-rose-400', label: 'Attention Needed' };
  };

  const config = getScoreColor(score);
  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#1F2937"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={config.stroke}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-3xl font-extrabold font-mono ${config.text}`}>
            {score}
          </span>
          <span className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">/ 100</span>
        </div>
      </div>
      {showDetails && (
        <div className="mt-3 text-center">
          <div className={`text-xs font-semibold ${config.text}`}>{config.label}</div>
          <div className="text-[11px] text-gray-400">DevForge Health Indicator</div>
        </div>
      )}
    </div>
  );
};
