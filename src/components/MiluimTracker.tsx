import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Calendar,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Plus,
  Tv,
  FileCheck,
  FileX,
  FileText,
  BadgeCheck,
  Send,
  ExternalLink
} from 'lucide-react';

export const MiluimTracker: React.FC = () => {
  const {
    miluimPeriods,
    courses,
    toggleMiluimSummaryAcquired,
    toggleMiluimRecordingWatched,
    addMiluimPeriod,
    totalMiluimDays
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);

  // New period state
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orderType, setOrderType] = useState<'צו 8' | 'תעסוקה מבצעית' | 'אימון' | 'אחר'>('צו 8');
  const [notes, setNotes] = useState('');

  const getCourse = (id: string) => courses.find(c => c.id === id);

  const handleAddPeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    addMiluimPeriod({
      title: title.trim(),
      startDate,
      endDate,
      orderType,
      totalDays: diffDays > 0 ? diffDays : 1,
      notes: notes.trim() || undefined,
      missedLessons: [
        {
          id: 'ml_new_' + Date.now(),
          courseId: courses[0]?.id || 'c1',
          date: startDate,
          topic: 'שיעור שהוחמץ במהלך תקופת השירות',
          summaryAcquired: false,
          recordingWatched: false,
          notes: 'יש לפנות לסגל לקבלת חומרי השלמה'
        }
      ]
    });

    setTitle('');
    setStartDate('');
    setEndDate('');
    setNotes('');
    setShowAddModal(false);
  };

  const allMissedLessons = miluimPeriods.flatMap(p =>
    p.missedLessons.map(l => ({ ...l, periodId: p.id, periodTitle: p.title }))
  );

  const pendingSummaries = allMissedLessons.filter(l => !l.summaryAcquired);
  const pendingRecordings = allMissedLessons.filter(l => !l.recordingWatched);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-l from-emerald-950 via-slate-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-400/20">
              <Shield className="w-3.5 h-3.5" />
              <span>Miluim & Absence Hub</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white font-rubik tracking-tight">
              מעקב מילואים, השלמת שיעורים והתאמות
            </h2>
            <p className="text-sm text-emerald-100/90 max-w-xl leading-relaxed mt-1">
              שמירה על רצף לימודי מלא גם בזמן שירות. ניהול מרוכז של שיעורים שהוחמצו, צפייה בהקלטות, מעקב סיכומים ומיצוי זכויות סטודנטים במילואים.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="self-start sm:self-center flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>הזנת תקופת מילואים / היעדרות</span>
          </button>
        </div>
      </div>

      {/* Top Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Total Days */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">סה״כ ימי שירות</span>
            <span className="text-2xl font-black text-slate-900 font-rubik">{totalMiluimDays} ימים פעילים</span>
          </div>
        </div>

        {/* Missing Summaries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <FileX className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">סיכומים להשגה</span>
            <span className="text-2xl font-black text-slate-900 font-rubik">{pendingSummaries.length} שיעורים</span>
          </div>
        </div>

        {/* Pending Recordings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">הקלטות לצפייה</span>
            <span className="text-2xl font-black text-slate-900 font-rubik">{pendingRecordings.length} הרצאות</span>
          </div>
        </div>

      </div>

      {/* Missed Lessons Tracking Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-rubik">
              תמונת מצב שיעורים שהוחמצו והשלמות נדרשות
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              סמן האם השגת כבר את הסיכום והאם צפית בהקלטה של השיעור.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 mt-2">
          {allMissedLessons.map(lesson => {
            const course = getCourse(lesson.courseId);

            return (
              <div
                key={lesson.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-slate-50/50 p-2 rounded-2xl transition-colors"
              >
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2 flex-wrap">
                    {course && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: course.color }} />
                        {course.name}
                      </span>
                    )}
                    <span className="text-xs font-mono text-slate-400">{lesson.date}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {lesson.periodTitle}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-800">{lesson.topic}</h4>
                  
                  {lesson.notes && (
                    <p className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-xl inline-block">
                      {lesson.notes}
                    </p>
                  )}
                </div>

                {/* Status Checkboxes */}
                <div className="flex items-center gap-3">
                  
                  {/* Summary Acquired Toggle */}
                  <button
                    onClick={() => toggleMiluimSummaryAcquired(lesson.periodId, lesson.id)}
                    className={`text-xs font-bold px-3 py-2 rounded-xl border flex items-center gap-2 transition-all ${
                      lesson.summaryAcquired
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    {lesson.summaryAcquired ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-rose-400" />
                    )}
                    <span>{lesson.summaryAcquired ? 'הסיכום הושג ✓' : 'חסר סיכום!'}</span>
                  </button>

                  {/* Recording Watched Toggle */}
                  <button
                    onClick={() => toggleMiluimRecordingWatched(lesson.periodId, lesson.id)}
                    className={`text-xs font-bold px-3 py-2 rounded-xl border flex items-center gap-2 transition-all ${
                      lesson.recordingWatched
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    {lesson.recordingWatched ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Tv className="w-4 h-4 text-amber-600" />
                    )}
                    <span>{lesson.recordingWatched ? 'נצפתה הקלטה ✓' : 'טרם נצפתה'}</span>
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Adjustments / Rights Checklist */}
      <div className="bg-gradient-to-br from-indigo-50/60 to-purple-50/40 p-6 rounded-3xl border border-indigo-100">
        <h3 className="text-base font-bold text-slate-900 font-rubik flex items-center gap-2 mb-2">
          <BadgeCheck className="w-5 h-5 text-indigo-600" />
          סל זכויות והתאמות אקדמיות למשרתי מילואים
        </h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          בהתאם לתקנון המוסד וחוק זכויות הסטודנט, הנך זכאי להתאמות הבאות בגין תקופת השירות:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-2xl border border-indigo-100 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 block mb-0.5">מועד בחינה מיוחד (מועד ג׳)</span>
              <span className="text-slate-500 leading-relaxed">
                זכאות אוטומטית למועד מיוחד לכל בחינה שהתקיימה במהלך השירות או עד 14 יום מסיומו.
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-indigo-100 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 block mb-0.5">צפייה בהקלטות והשלמת חומר</span>
              <span className="text-slate-500 leading-relaxed">
                פתיחת הרשאות מלאות לכל הקלטות ההרצאות והתרגולים שבוצעו במהלך ההיעדרות.
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-indigo-100 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 block mb-0.5">הארכות דד-ליין למטלות ותרגילים</span>
              <span className="text-slate-500 leading-relaxed">
                זכאות לדחיית הגשת תרגילי בית לפי מספר ימי השירות, בתיאום מול מתרגל הקורס.
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-indigo-100 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 block mb-0.5">נקודות זכות אקדמיות (2 נק״ז)</span>
              <span className="text-slate-500 leading-relaxed">
                הכרה בשירות מילואים ממושך כקורס בחירה כללי או נקודות זכות אקדמיות.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Period Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 mb-1 font-rubik">הזנת תקופת מילואים</h3>
            <p className="text-xs text-slate-500 mb-4">המערכת תמפה את השיעורים והמטלות שנפלו בתאריכים אלו.</p>

            <form onSubmit={handleAddPeriod} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">כותרת תקופת השירות</label>
                <input
                  type="text"
                  required
                  placeholder="למשל: צו 8 - תעסוקה מבצעית גזרה צפונית"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">מתאריך</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">עד תאריך</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">סוג הקריאה</label>
                <select
                  value={orderType}
                  onChange={e => setOrderType(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="צו 8">צו 8 חירום</option>
                  <option value="תעסוקה מבצעית">תעסוקה מבצעית יזומה</option>
                  <option value="אימון">אימון יחידה</option>
                  <option value="אחר">אחר</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">הערות והתאמות מבוקשות</label>
                <textarea
                  rows={2}
                  placeholder="מספר אישור מילואים, שמות חונכים או מתרגלים שפנית אליהם..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  className="text-xs font-bold px-5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                >
                  שמור תקופת שירות
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
