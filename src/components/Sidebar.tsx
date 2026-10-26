import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import {
  LayoutDashboard,
  FolderLock,
  Sparkles,
  LineChart,
  ShieldAlert,
  BrainCircuit
} from 'lucide-react';

interface TabItem {
  id: ActiveTab;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  badge?: number;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, urgentTasksCount, unacquiredSummariesCount } = useApp();

  const tabs: TabItem[] = [
    {
      id: 'dashboard',
      label: 'לוח בקרה ודד-ליינים',
      sublabel: 'Daily Action Board',
      icon: LayoutDashboard,
      badge: urgentTasksCount > 0 ? urgentTasksCount : undefined,
      badgeColor: 'bg-rose-500 text-white'
    },
    {
      id: 'vault',
      label: 'כספת קורסים וחומרים',
      sublabel: 'Course Vault',
      icon: FolderLock
    },
    {
      id: 'copilot',
      label: 'עוזר למידה ומחולל AI',
      sublabel: 'AI Study Copilot',
      icon: Sparkles,
      badgeColor: 'bg-indigo-500 text-white'
    },
    {
      id: 'tracker',
      label: 'מעקב אקדמי וציונים',
      sublabel: 'Academic Tracker',
      icon: LineChart
    },
    {
      id: 'miluim',
      label: 'מילואים והיעדרויות',
      sublabel: 'Miluim & Absence',
      icon: ShieldAlert,
      badge: unacquiredSummariesCount > 0 ? unacquiredSummariesCount : undefined,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'flashcards',
      label: 'כרטיסיות זיכרון ומבחנים',
      sublabel: 'Flashcards & Quiz',
      icon: BrainCircuit
    }
  ];

  return (
    <nav className="bg-white border-b lg:border-b-0 lg:border-l border-slate-200 lg:w-72 shrink-0 p-3 lg:p-4 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible">
      <div className="hidden lg:block px-3 py-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        מודולים מרכזיים
      </div>

      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-between w-full p-2.5 lg:p-3 rounded-xl font-medium transition-all duration-200 text-right shrink-0 lg:shrink select-none ${
              isActive
                ? 'bg-gradient-to-r from-indigo-50 to-indigo-100/60 text-indigo-700 shadow-xs border border-indigo-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="block text-sm font-semibold leading-tight">{tab.label}</span>
                <span className="text-[11px] text-slate-400 hidden lg:block">{tab.sublabel}</span>
              </div>
            </div>

            {tab.badge !== undefined && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${tab.badgeColor || 'bg-slate-200 text-slate-700'}`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}

      <div className="hidden lg:block mt-auto pt-4 border-t border-slate-100">
        <div className="p-3 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-50 rounded-2xl border border-indigo-100/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-slate-700">סנכרון מקומי מופעל</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            כל הנתונים, המשימות והסיכומים נשמרים ישירות במחשב שלך ומותאמים לעבודה ב-RTL.
          </p>
        </div>
      </div>
    </nav>
  );
};
