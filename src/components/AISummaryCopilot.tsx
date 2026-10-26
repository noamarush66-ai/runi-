import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AISummary, KeyConcept } from '../types';
import {
  Sparkles,
  BookOpen,
  CheckCircle,
  AlertCircle,
  FileText,
  Copy,
  BrainCircuit,
  ArrowRight,
  Flame,
  Check,
  Send
} from 'lucide-react';

export const AISummaryCopilot: React.FC = () => {
  const { courses, aiSummaries, createAISummary, addFlashcard, setActiveTab } = useApp();

  const [selectedSummaryId, setSelectedSummaryId] = useState<string>(aiSummaries[0]?.id || '');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exportedToCards, setExportedToCards] = useState(false);

  const activeSummary = aiSummaries.find(s => s.id === selectedSummaryId) || aiSummaries[0];
  const getCourse = (id: string) => courses.find(c => c.id === id);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !docTitle.trim()) return;

    setIsGenerating(true);

    // Simulate smart AI generation
    setTimeout(() => {
      const generatedTitle = docTitle.trim() || 'סיכום AI מהיר';
      
      // Extract key terms or generate smart structured takeaways
      const takeaways = [
        `תמצית ממוקדת של ${generatedTitle}: החומר מתמקד במודלים ובעקרונות הליבה שנלמדו.`,
        'הדגש המרכזי הוא על יישום אלגוריתמי וניתוח סיבוכיות במקרי קצה.',
        'נמצא כי שאלות מבחן רבות מתבססות על הוכחת נכונות המודל והשוואה בין חלופות.',
        'נקודות מפתח להגשה: שים לב להגדרות פורמליות ואי-תלות בין משתנים.'
      ];

      const concepts: KeyConcept[] = [
        {
          term: docTitle ? `${docTitle} - עיקרון יסוד` : 'מודל עבודה מרכזי',
          definition: inputText.slice(0, 140) || 'הגדרה פורמלית של הנושא כפי שנלמד בהרצאות ומצגות הקורס.',
          importance: 'critical'
        },
        {
          term: 'מקרי קצה ותנאי עצירה',
          definition: 'מצבים בהם הקלט ריק, יחיד או מנוון הדורשים טיפול נפרד.',
          importance: 'high'
        }
      ];

      const examTips = [
        'טיפ לבחינה: מרצים נוטים לבקש שרטוט או סימולציה שלבי ביצוע על קלט קטן.',
        'וודא שאתה זוכר את הנוסחה הבסיסית בעל-פה.'
      ];

      createAISummary({
        courseId,
        title: `סיכום ממוקד: ${generatedTitle}`,
        sourceDocName: generatedTitle,
        week: 5,
        keyTakeaways: takeaways,
        keyConcepts: concepts,
        examTips: examTips
      });

      setIsGenerating(false);
      setInputText('');
      setDocTitle('');
      setSelectedSummaryId(aiSummaries[0]?.id || '');
    }, 1200);
  };

  const handleExportToFlashcards = () => {
    if (!activeSummary) return;

    activeSummary.keyConcepts.forEach(concept => {
      addFlashcard({
        courseId: activeSummary.courseId,
        topic: activeSummary.title,
        question: `מהי ההגדרה והחשיבות של: ${concept.term}?`,
        answer: concept.definition,
        masteryLevel: 0
      });
    });

    setExportedToCards(true);
    setTimeout(() => {
      setExportedToCards(false);
      setActiveTab('flashcards');
    }, 1000);
  };

  const handleCopySummary = () => {
    if (!activeSummary) return;
    const text = `
${activeSummary.title}
קורס: ${getCourse(activeSummary.courseId)?.name || ''}

עיקרי הדברים:
${activeSummary.keyTakeaways.map(t => '• ' + t).join('\n')}

מושגי מפתח למבחן:
${activeSummary.keyConcepts.map(c => `• ${c.term}: ${c.definition}`).join('\n')}

טיפים למבחן:
${activeSummary.examTips.map(tip => '★ ' + tip).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-l from-purple-950 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold mb-2 border border-purple-400/20">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>AI Study Copilot</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white font-rubik tracking-tight">
            מחולל סיכומים חכם ודגשי מבחן
          </h2>
          <p className="text-sm text-purple-200/90 max-w-xl leading-relaxed mt-1">
            העלה מאמרים, שקופיות מרצה או סיכומי שיעור. ה-AI יסנן את התוכן ויפיק עבורך תקציר ממוקד, מושגי מפתח למבחן וכרטיסיות זיכרון בלחיצת כפתור.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: AI Generator Form & Saved Summaries List */}
        <div className="space-y-4">
          
          {/* Generation Box */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1 font-rubik flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              מחולל סיכום חדש
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              הדבק קטע ממאמר או תאר נושא כדי לקבל תקציר ממוקד מבחן.
            </p>

            <form onSubmit={handleGenerate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">שייך לקורס</label>
                <select
                  value={courseId}
                  onChange={e => setCourseId(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">כותרת המאמר / ההרצאה</label>
                <input
                  type="text"
                  placeholder="למשל: שיעור 06 - ערימות בינאריות"
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">תוכן המאמר / נקודות מפתח</label>
                <textarea
                  rows={4}
                  placeholder="הדבק כאן תוכן מתוך המאמר, מצגת המרצה או הערות שלך..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating || (!inputText && !docTitle)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-indigo-100 transition-all active:scale-95"
              >
                {isGenerating ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ה-AI מעבד ומנתח את החומר...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    חולל תקציר ומושגי מפתח
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List of Saved Summaries */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              סיכומים שמורים במערכת ({aiSummaries.length})
            </div>
            <div className="space-y-2">
              {aiSummaries.map(s => {
                const course = getCourse(s.courseId);
                const isSelected = activeSummary?.id === s.id;

                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSummaryId(s.id)}
                    className={`w-full text-right p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-300 shadow-xs text-indigo-950'
                        : 'bg-white border-slate-100 hover:border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {course && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: course.color }}
                        />
                      )}
                      <span className="text-[11px] font-bold text-slate-500">
                        {course?.name}
                      </span>
                    </div>
                    <div className="text-xs font-bold line-clamp-1">{s.title}</div>
                    <div className="text-[10px] text-slate-400 mt-1">נוצר בתאריך {s.createdAt}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Active Summary Display */}
        <div className="lg:col-span-2">
          {activeSummary ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
              
              {/* Summary Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {getCourse(activeSummary.courseId)?.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      מקור: {activeSummary.sourceDocName}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 font-rubik">
                    {activeSummary.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySummary}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'הועתק!' : 'העתק הכל'}
                  </button>

                  <button
                    onClick={handleExportToFlashcards}
                    className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-all active:scale-95"
                  >
                    <BrainCircuit className="w-3.5 h-3.5" />
                    {exportedToCards ? 'יוצא בהצלחה!' : 'ייצא ככרטיסיות זיכרון'}
                  </button>
                </div>
              </div>

              {/* Key Takeaways Section */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-rubik flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  עיקרי הדברים (Key Takeaways)
                </h4>
                <div className="space-y-2">
                  {activeSummary.keyTakeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs text-slate-700 leading-relaxed"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Concepts for Exams */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-rubik flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  מושגי מפתח קריטיים למבחן
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeSummary.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-slate-900">{concept.term}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              concept.importance === 'critical'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {concept.importance === 'critical' ? 'חובה למבחן' : 'חשוב'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {concept.definition}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Tips */}
              {activeSummary.examTips && activeSummary.examTips.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                    <Flame className="w-4 h-4 text-amber-600" />
                    דגשים ומלכודות נפוצות בבחינה
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-900/90 leading-relaxed">
                    {activeSummary.examTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="font-bold text-slate-700">בחר סיכום מהרשימה או חולל סיכום חדש</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
