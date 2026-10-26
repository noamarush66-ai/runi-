import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Award, Shield, AlertTriangle, Calendar, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { overallGPA, totalMiluimDays, urgentTasksCount, unacquiredSummariesCount, totalCredits } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-rubik text-slate-900 tracking-tight">Runi</h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                Academic Hub
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">מרכז השליטה האקדמי שלך לסמסטר א׳</p>
          </div>
        </div>

        {/* Quick Highlights / Badges */}
        <div className="hidden sm:flex items-center gap-3">
          {/* GPA Widget */}
          <div className="flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/70 text-emerald-800 px-3 py-1.5 rounded-xl shadow-xs">
            <Award className="w-4 h-4 text-emerald-600" />
            <div className="text-right">
              <span className="text-[11px] font-medium text-emerald-600 block leading-none">ממוצע ציונים</span>
              <span className="text-sm font-bold leading-tight">{overallGPA}</span>
            </div>
          </div>

          {/* Credits Widget */}
          <div className="flex items-center gap-2 bg-slate-100/80 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl">
            <BookOpen className="w-4 h-4 text-slate-500" />
            <div className="text-right">
              <span className="text-[11px] font-medium text-slate-500 block leading-none">נק״ז רשומות</span>
              <span className="text-sm font-bold leading-tight">{totalCredits}</span>
            </div>
          </div>

          {/* Miluim Badge */}
          {totalMiluimDays > 0 && (
            <div className="flex items-center gap-2 bg-amber-50/90 border border-amber-200/80 text-amber-900 px-3 py-1.5 rounded-xl shadow-xs">
              <Shield className="w-4 h-4 text-amber-600" />
              <div className="text-right">
                <span className="text-[11px] font-medium text-amber-700 block leading-none">שירות מילואים</span>
                <span className="text-sm font-bold leading-tight">{totalMiluimDays} ימים פעילים</span>
              </div>
            </div>
          )}

          {/* Urgent Alerts Badge */}
          {(urgentTasksCount > 0 || unacquiredSummariesCount > 0) && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-800 px-3 py-1.5 rounded-xl animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <div className="text-right">
                <span className="text-[11px] font-medium text-rose-600 block leading-none">דורש טיפול</span>
                <span className="text-sm font-bold leading-tight">
                  {urgentTasksCount} משימות דחופות
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Date / Semester Indicator */}
        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>שבוע 5 לסמסטר</span>
        </div>

      </div>
    </header>
  );
};
