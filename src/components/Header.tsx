import React from 'react';
import { Eye, RotateCcw, Plus, Activity, Menu } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onReset?: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onReset,
  onToggleSidebar,
}) => {
  const getHeaderTitles = () => {
    switch (activeTab) {
      case 'screening':
        return {
          title: 'Patient Analysis',
          subtitle: 'ID: SIH-2024-0042 • Current Session',
        };
      case 'history':
        return {
          title: 'Screening Register',
          subtitle: 'Historical Patient Records & Referral Slips',
        };
      case 'about':
        return {
          title: 'Clinical Protocol',
          subtitle: 'APTOS 2019 Scale & SIH Architecture',
        };
      case 'dashboard':
      default:
        return {
          title: 'Triage Dashboard',
          subtitle: 'Primary Health Care DR Risk Overview',
        };
    }
  };

  const { title, subtitle } = getHeaderTitles();

  return (
    <header
      id="main-header"
      className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 z-20 shrink-0 select-none"
    >
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Reset
          </button>
        )}
        
        {activeTab !== 'screening' ? (
          <button
            id="header-start-screening-btn"
            onClick={() => onNavigate('screening')}
            className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-colors flex items-center gap-1.5 sm:gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Screening</span>
          </button>
        ) : (
          <button
            id="header-dashboard-btn"
            onClick={() => onNavigate('dashboard')}
            className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors flex items-center gap-1.5 sm:gap-2"
          >
            <Activity className="w-4 h-4 text-blue-600" />
            <span>View Dashboard</span>
          </button>
        )}
      </div>
    </header>
  );
};

