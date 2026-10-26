import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DailyActionBoard } from './components/DailyActionBoard';
import { CourseVault } from './components/CourseVault';
import { AISummaryCopilot } from './components/AISummaryCopilot';
import { AcademicTracker } from './components/AcademicTracker';
import { MiluimTracker } from './components/MiluimTracker';
import { FlashcardsMode } from './components/FlashcardsMode';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto pb-20">
      {activeTab === 'dashboard' && <DailyActionBoard />}
      {activeTab === 'vault' && <CourseVault />}
      {activeTab === 'copilot' && <AISummaryCopilot />}
      {activeTab === 'tracker' && <AcademicTracker />}
      {activeTab === 'miluim' && <MiluimTracker />}
      {activeTab === 'flashcards' && <FlashcardsMode />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-heebo text-slate-800 antialiased selection:bg-indigo-600 selection:text-white" dir="rtl">
        <Navbar />
        
        <div className="flex-1 flex flex-col lg:flex-row">
          <Sidebar />
          <MainContent />
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Runi Hub © 2026 - מערכת ניהול אקדמית אישית לסטודנטים</span>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="hover:text-indigo-600 cursor-pointer">פורטל הסטודנטים</span>
              <span>•</span>
              <span className="hover:text-indigo-600 cursor-pointer">מודל (Moodle)</span>
              <span>•</span>
              <span className="hover:text-indigo-600 cursor-pointer">ספרייה אקדמית</span>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;
