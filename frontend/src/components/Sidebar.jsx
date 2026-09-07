import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderGit2, 
  PlusCircle, 
  Workflow, 
  ShieldAlert, 
  Box, 
  Terminal, 
  Activity, 
  Sparkles, 
  Settings, 
  User,
  Layers,
  CheckSquare
} from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Projects', path: '/projects', icon: FolderGit2 },
    { label: 'Add Project', path: '/projects/new', icon: PlusCircle },
    { label: 'Recent Pipeline', path: '/pipeline/recent', icon: Workflow },
    { label: 'Test Results', path: '/tests', icon: CheckSquare },
    { label: 'Security & Scans', path: '/security', icon: ShieldAlert },
    { label: 'Containerization', path: '/docker', icon: Box },
    { label: 'Unified Logs', path: '/logs', icon: Terminal },
    { label: 'Health Scoring', path: '/health', icon: Activity },
    { label: 'AI Assistant', path: '/ai-assistant', icon: Sparkles },
  ];

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-dark-800 border-r border-gray-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0">
      <div className="p-4">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          Infrastructure Workstation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-brand-600/20 text-brand-400 border-l-2 border-brand-500 font-semibold'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          Account & Config
        </div>
        <nav className="space-y-1">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-brand-600/20 text-brand-400 font-semibold'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
