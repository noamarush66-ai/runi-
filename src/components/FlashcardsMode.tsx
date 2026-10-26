import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Flashcard } from '../types';
import {
  BrainCircuit,
  RotateCw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Zap,
  Trophy,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const FlashcardsMode: React.FC = () => {
  const {
    flashcards,
    courses,
    updateFlashcardMastery,
    addFlashcard,
    aiSummaries,
    setActiveTab
  } = useApp();

  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Flashcard form
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || '');
  const [newTopic, setNewTopic] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const filteredCards = flashcards.filter(c =>
    selectedCourseFilter === 'all' ? true : c.courseId === selectedCourseFilter
  );

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];
  const getCourse = (id: string) => courses.find(c => c.id === id);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (quizMode) {
      setQuizCompleted(true);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleRateMastery = (level: 0 | 1 | 2) => {
    if (!currentCard) return;
    updateFlashcardMastery(currentCard.id, level);

    if (quizMode) {
      if (level === 2) setQuizScore(prev => prev + 1);
    }

    handleNext();
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    addFlashcard({
      courseId: newCourseId,
      topic: newTopic.trim() || 'כללי',
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      masteryLevel: 0
    });

    setNewTopic('');
    setNewQuestion('');
    setNewAnswer('');
    setShowAddModal(false);
  };

  const resetQuiz = () => {
    setQuizScore(0);
    setCurrentIndex(0);
    setIsFlipped(false);
    setQuizCompleted(false);
  };

  // Mastery statistics
  const masteredCount = filteredCards.filter(c => c.masteryLevel === 2).length;
  const learningCount = filteredCards.filter(c => c.masteryLevel === 1).length;
  const newCount = filteredCards.filter(c => c.masteryLevel === 0).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Active Recall & Flashcards</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-rubik tracking-tight">
            כרטיסיות זיכרון ותרגול מהיר
          </h2>
          <p className="text-sm text-slate-500 max-w-xl">
            שינון מושגים ותרגול אקטיבי מותאם לנייד. חזור על הגדרות ונוסחאות בנסיעות ובהפסקות.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setQuizMode(!quizMode);
              resetQuiz();
            }}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all shadow-xs ${
              quizMode
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white hover:bg-slate-50 text-purple-700 border-purple-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{quizMode ? 'יציאה מבוחן' : 'הפעל בוחן מהיר'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="text-xs font-bold px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>כרטיסייה חדשה</span>
          </button>
        </div>
      </div>

      {/* Course Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => {
            setSelectedCourseFilter('all');
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all shrink-0 ${
            selectedCourseFilter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          כל הקורסים ({flashcards.length})
        </button>

        {courses.map(c => {
          const count = flashcards.filter(f => f.courseId === c.id).length;
          const isSelected = selectedCourseFilter === c.id;

          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCourseFilter(c.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all shrink-0 flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              <span>{c.name} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Mastery Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-bold w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-emerald-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            שולט: {masteredCount}
          </span>
          <span className="text-amber-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            בלמידה: {learningCount}
          </span>
          <span className="text-rose-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            לשיפור: {newCount}
          </span>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          כרטיסייה {filteredCards.length > 0 ? currentIndex + 1 : 0} מתוך {filteredCards.length}
        </div>
      </div>

      {/* Main Flashcard Interactive Area */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
          <BrainCircuit className="w-12 h-12 mx-auto text-slate-300 mb-2" />
          <p className="font-bold text-slate-700">אין כרטיסיות לקורס זה עדיין</p>
          <p className="text-xs text-slate-400 mt-1">
            לחץ על "כרטיסייה חדשה" או צור כרטיסיות אוטומטית מתוך מחולל הסיכומים ב-AI!
          </p>
        </div>
      ) : quizCompleted ? (
        /* Quiz Finished Screen */
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-lg space-y-4">
          <div className="w-20 h-20 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-rubik">כל הכבוד! סיימת את הבוחן</h3>
          <p className="text-sm text-slate-600">
            התוצאה שלך: <span className="font-black text-purple-700">{quizScore}</span> מתוך{' '}
            <span className="font-black text-slate-800">{filteredCards.length}</span> מושגים
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={resetQuiz}
              className="text-xs font-bold px-5 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 shadow-md transition-all"
            >
              התחל בוחן מחדש
            </button>
            <button
              onClick={() => {
                setQuizMode(false);
                resetQuiz();
              }}
              className="text-xs font-semibold px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              חזור למצב כרטיסיות
            </button>
          </div>
        </div>
      ) : (
        /* The Card */
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer select-none bg-white min-h-[300px] sm:min-h-[340px] rounded-3xl border-2 border-slate-200/90 hover:border-indigo-300 shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between relative group"
          >
            {/* Top Card Info */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {currentCard && (
                  <span className="font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCourse(currentCard.courseId)?.color }}
                    />
                    {getCourse(currentCard.courseId)?.name}
                  </span>
                )}
                {currentCard?.topic && (
                  <span className="text-slate-400 font-medium">#{currentCard.topic}</span>
                )}
              </div>

              <span className="flex items-center gap-1 text-slate-400 text-xs font-semibold group-hover:text-indigo-600 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                לחץ להפיכה
              </span>
            </div>

            {/* Center Content: Question vs Answer */}
            <div className="py-8 text-center max-w-xl mx-auto">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    שאלה / מושג
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-rubik leading-snug">
                    {currentCard?.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    תשובה והסבר
                  </span>
                  <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                    {currentCard?.answer}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Card Hint */}
            <div className="text-center text-[11px] text-slate-400 font-medium">
              {!isFlipped ? 'לחץ כדי לבדוק אם ידעת את התשובה' : 'דרג את רמת השליטה שלך כדי להתקדם'}
            </div>
          </div>

          {/* Controls & Rating Buttons */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Navigation arrows */}
            <div className="flex items-center gap-2 order-2 sm:order-1">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                title="הקודם"
              >
                <ChevronRight className="w-4 h-4 text-slate-700" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                title="הבא"
              >
                <ChevronLeft className="w-4 h-4 text-slate-700" />
              </button>
            </div>

            {/* Self-Rating Feedback Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center order-1 sm:order-2">
              <button
                onClick={() => handleRateMastery(0)}
                className="flex-1 sm:flex-none text-xs font-bold px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <XCircle className="w-4 h-4" />
                <span>לא זכרתי (0)</span>
              </button>

              <button
                onClick={() => handleRateMastery(1)}
                className="flex-1 sm:flex-none text-xs font-bold px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <HelpCircle className="w-4 h-4" />
                <span>כמעט (1)</span>
              </button>

              <button
                onClick={() => handleRateMastery(2)}
                className="flex-1 sm:flex-none text-xs font-bold px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>יודע מצוין! (2)</span>
              </button>
            </div>

            {/* Mobile tip */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 order-3">
              <Smartphone className="w-3.5 h-3.5" />
              <span>מותאם לנייד</span>
            </div>

          </div>
        </div>
      )}

      {/* Add Flashcard Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 mb-1 font-rubik">הוספת כרטיסיית זיכרון</h3>
            <p className="text-xs text-slate-500 mb-4">כתוב שאלה ותשובה ממוקדות לתרגול ושינון.</p>

            <form onSubmit={handleCreateCard} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">שייך לקורס</label>
                <select
                  value={newCourseId}
                  onChange={e => setNewCourseId(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">נושא / פרק</label>
                <input
                  type="text"
                  placeholder="למשל: עצי AVL, חוק החוזים, משפט בייס"
                  value={newTopic}
                  onChange={e => setNewTopic(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">השאלה / המושג</label>
                <textarea
                  rows={2}
                  required
                  placeholder="למשל: מהו גורם האיזון המותר בכל צומת בעץ AVL?"
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">התשובה / ההסבר המלא</label>
                <textarea
                  rows={3}
                  required
                  placeholder="התשובה המדויקת, כולל דוגמה או נוסחה..."
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold px-5 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                >
                  שמור כרטיסייה
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
