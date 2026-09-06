import React from 'react';
import {
  LayoutDashboard,
  Plus,
  Clock,
  Info,
  BookOpen,
  ExternalLink,
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  screeningCount?: number;
  orientation?: 'vertical' | 'horizontal';
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  screeningCount = 0,
  orientation = 'vertical',
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Patient risk metrics & overview',
    },
    {
      id: 'screening',
      label: 'New Screening',
      icon: Plus,
      description: 'Upload & analyze retinal image',
    },
    {
      id: 'history',
      label: 'History',
      icon: Clock,
      badge: screeningCount > 0 ? screeningCount : undefined,
      description: 'Patient logs & referral slips',
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      description: 'SIH project & clinical background',
    },
  ];

  if (orientation === 'horizontal') {
    return (
      <nav id="app-navigation-mobile" aria-label="Mobile Navigation" className="bg-white border-b border-slate-200 px-4 py-2 flex md:hidden overflow-x-auto space-x-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-tab-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${
                  isActive ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between">
      <nav id="app-navigation" aria-label="Main Navigation" className="space-y-1 px-3 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                    isActive ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Support / Manual Training widget from Clean Minimalism */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-xl p-4 text-white text-xs space-y-1 shadow-xs">
          <p className="text-slate-400 font-medium">Support</p>
          <button
            onClick={() => onSelectTab('about')}
            className="text-left font-medium text-white hover:text-blue-300 underline underline-offset-2 flex items-center gap-1 transition-colors"
          >
            <span>Manual & Training</span>
            <BookOpen className="w-3.5 h-3.5" />
          </button>
          <p className="text-[10px] text-slate-400 pt-1">
            APTOS 2019 • ICDR Standard
          </p>
        </div>
      </div>
    </div>
  );
};

