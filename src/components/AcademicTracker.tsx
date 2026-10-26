import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LineChart,
  Award,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileCheck,
  FileX,
  Target,
  Plus,
  ArrowUpRight,
  Calculator
} from 'lucide-react';

export const AcademicTracker: React.FC = () => {
  const {
    courses,
    academicTopics,
    gradeItems,
    updateComprehension,
    updateAttendance,
    toggleSummaryAcquired,
    updateGrade,
    addGradeItem,
    addAcademicTopic
  } = useApp();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);

  // New Grade Item State
  const [newGradeName, setNewGradeName] = useState('');
  const [newGradeWeight, setNewGradeWeight] = useState(10);
  const [newGradeVal, setNewGradeVal] = useState<number | ''>('');

  // New Topic State
  const [newTopicWeek, setNewTopicWeek] = useState(6);
  const [newTopicTitle, setNewTopicTitle] = useState('');

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  // Topics for selected course
  const courseTopics = academicTopics.filter(t => t.courseId === currentCourse?.id);

  // Grades for selected course
  const courseGrades = gradeItems.filter(g => g.courseId === currentCourse?.id);

  // Calculate weighted course average
  const gradedItems = courseGrades.filter(g => g.grade !== undefined && g.grade !== null);
  const totalGradedWeight = gradedItems.reduce((sum, g) => sum + g.weightPercent, 0);
  const currentWeightedGrade =
    totalGradedWeight > 0
      ? Math.round(
          (gradedItems.reduce((sum, g) => sum + (g.grade || 0) * (g.weightPercent / 100), 0) /
            totalGradedWeight) *
            100 *
            10
        ) / 10
      : 0;

  // Final Exam item (if any)
  const finalExamItem = courseGrades.find(g => g.isFinalExam);

  // Comprehension stats
  const masteredCount = courseTopics.filter(t => t.comprehensionStatus === 'mastered').length;
  const inProgressCount = courseTopics.filter(t => t.comprehensionStatus === 'in_progress').length;
  const needsHelpCount = courseTopics.filter(t => t.comprehensionStatus === 'needs_help').length;
  const missingSummariesCount = courseTopics.filter(t => !t.hasSummary).length;

  const handleCreateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGradeName.trim()) return;

    addGradeItem({
      courseId: currentCourse.id,
      name: newGradeName.trim(),
      weightPercent: Number(newGradeWeight),
      grade: newGradeVal === '' ? undefined : Number(newGradeVal)
    });

    setNewGradeName('');
    setNewGradeVal('');
    setShowAddGradeModal(false);
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    addAcademicTopic({
      courseId: currentCourse.id,
      week: Number(newTopicWeek),
      title: newTopicTitle.trim(),
      comprehensionStatus: 'in_progress',
      attendanceStatus: 'attended',
      hasSummary: true
    });

    setNewTopicTitle('');
    setShowAddTopicModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <LineChart className="w-3.5 h-3.5" />
            <span>Academic Tracker</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-rubik tracking-tight">
            מעקב אקדמי, ציונים והבנת החומר
          </h2>
          <p className="text-sm text-slate-500 max-w-xl">
            שקיפות מלאה לכל קורס: משקלול ציונים, מדד שליטה בחומר הלימוד וניהול חוסרים ונוכחות.
          </p>
        </div>

        {/* Course Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {courses.map(c => {
            const isSelected = c.id === currentCourse?.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCourseId(c.id)}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Stats Cards for Current Course */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Weighted Course Grade Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase mb-2">
            <span>ציון משוקלל נוכחי</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-rubik">
              {currentWeightedGrade > 0 ? currentWeightedGrade : 'טרם הוזן'}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            מתוך {totalGradedWeight}% מסך מטלות הקורס
          </div>
        </div>

        {/* Comprehension Mastery Ratio */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase mb-2">
            <span>מדד שליטה בחומר</span>
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-indigo-600 font-rubik">
              {courseTopics.length > 0 ? Math.round((masteredCount / courseTopics.length) * 100) : 0}%
            </span>
            <div className="text-xs text-slate-500">
              <div>{masteredCount} שולט לחלוטין</div>
              <div>{needsHelpCount} דורש חיזוק</div>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${(masteredCount / (courseTopics.length || 1)) * 100}%` }}
            />
            <div
              className="bg-amber-400 h-full"
              style={{ width: `${(inProgressCount / (courseTopics.length || 1)) * 100}%` }}
            />
            <div
              className="bg-rose-500 h-full"
              style={{ width: `${(needsHelpCount / (courseTopics.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Missing Summaries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase mb-2">
            <span>סיכומים חסרים</span>
            <FileX className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-rubik">
            {missingSummariesCount}
          </div>
          <div className="text-xs text-rose-600 font-semibold mt-2">
            {missingSummariesCount > 0 ? 'יש להשלים מסטודנטים או הקלטות' : 'כל הסיכומים קיימים!'}
          </div>
        </div>

        {/* Lecturer & Schedule Info */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="text-xs text-slate-400 font-bold uppercase mb-1">פרטי הקורס</div>
          <div>
            <div className="text-sm font-bold text-white line-clamp-1">{currentCourse?.lecturer}</div>
            <div className="text-xs text-slate-300 mt-0.5">{currentCourse?.dayAndTime}</div>
            <div className="text-[11px] text-slate-400 mt-1">{currentCourse?.classroom}</div>
          </div>
          <div className="text-[11px] text-indigo-300 font-medium mt-2 pt-2 border-t border-slate-800">
            מועד א׳: {currentCourse?.examDateA || 'טרם פורסם'}
          </div>
        </div>

      </div>

      {/* Topics Comprehension & Attendance Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-rubik">
              מעקב נושאים שבועי, רמת הבנה ונוכחות
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              סמן בלחיצה את רמת השליטה שלך בכל נושא ואם יש בידיך סיכום מסודר.
            </p>
          </div>

          <button
            onClick={() => setShowAddTopicModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            הוסף נושא שבועי
          </button>
        </div>

        <div className="divide-y divide-slate-100 mt-2">
          {courseTopics.map(topic => (
            <div
              key={topic.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 group"
            >
              <div className="space-y-1 max-w-md">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                    שבוע {topic.week}
                  </span>
                  <span className="text-sm font-bold text-slate-800">{topic.title}</span>
                </div>
                {topic.notes && (
                  <p className="text-xs text-amber-700 bg-amber-50/70 px-2.5 py-1 rounded-lg border border-amber-200/60 inline-block">
                    {topic.notes}
                  </p>
                )}
              </div>

              {/* Status Controls */}
              <div className="flex items-center gap-3 flex-wrap">
                
                {/* Attendance toggle */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => updateAttendance(topic.id, 'attended')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      topic.attendanceStatus === 'attended'
                        ? 'bg-white text-slate-800 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    נכחתי
                  </button>
                  <button
                    onClick={() => updateAttendance(topic.id, 'missed')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      topic.attendanceStatus === 'missed'
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    היעדרות
                  </button>
                  <button
                    onClick={() => updateAttendance(topic.id, 'miluim')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      topic.attendanceStatus === 'miluim'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    מילואים
                  </button>
                </div>

                {/* Comprehension Badge Buttons */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => updateComprehension(topic.id, 'mastered')}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      topic.comprehensionStatus === 'mastered'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    שולט לחלוטין
                  </button>

                  <button
                    onClick={() => updateComprehension(topic.id, 'in_progress')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      topic.comprehensionStatus === 'in_progress'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    בטיפול
                  </button>

                  <button
                    onClick={() => updateComprehension(topic.id, 'needs_help')}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      topic.comprehensionStatus === 'needs_help'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    דורש חיזוק
                  </button>
                </div>

                {/* Summary acquired button */}
                <button
                  onClick={() => toggleSummaryAcquired(topic.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                    topic.hasSummary
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  {topic.hasSummary ? <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> : <FileX className="w-3.5 h-3.5 text-rose-600" />}
                  <span>{topic.hasSummary ? 'יש סיכום' : 'חסר סיכום'}</span>
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grades Breakdown Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-rubik">
              פירוט ציונים, מטלות ומשקלולים
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              הזן או עדכן ציונים. הממוצע המשוקלל מתעדכן אוטומטית.
            </p>
          </div>

          <button
            onClick={() => setShowAddGradeModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            הוסף פריט ציון
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase">
                <th className="pb-3 pr-2">מטלה / בחינה</th>
                <th className="pb-3">משקל באחוזים</th>
                <th className="pb-3">ציון שניתן</th>
                <th className="pb-3">סטטוס</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courseGrades.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 pr-2">
                    <span className="font-bold text-slate-800 text-sm block">{item.name}</span>
                    {item.dueDate && (
                      <span className="text-[11px] text-slate-400">מועד הגשה: {item.dueDate}</span>
                    )}
                  </td>
                  <td className="py-3.5 font-bold font-mono text-slate-600">
                    {item.weightPercent}%
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="טרם הוזן"
                        value={item.grade !== undefined ? item.grade : ''}
                        onChange={e => {
                          const val = e.target.value;
                          updateGrade(item.id, val === '' ? 0 : Number(val));
                        }}
                        className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <span className="text-slate-400">/ 100</span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    {item.grade !== undefined ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        הושלם
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                        ממתין לציון
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Grade Modal */}
      {showAddGradeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 mb-1 font-rubik">הוספת פריט ציון</h3>
            <p className="text-xs text-slate-500 mb-4">עבור קורס {currentCourse?.name}</p>

            <form onSubmit={handleCreateGrade} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">שם המטלה / בוחן</label>
                <input
                  type="text"
                  required
                  placeholder="למשל: תרגיל בית 4"
                  value={newGradeName}
                  onChange={e => setNewGradeName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">משקל באחוזים (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newGradeWeight}
                    onChange={e => setNewGradeWeight(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ציון (אם קיים)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="השאר ריק אם אין"
                    value={newGradeVal}
                    onChange={e => setNewGradeVal(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddGradeModal(false)}
                  className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100"
                >
                  הוסף
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Topic Modal */}
      {showAddTopicModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 mb-1 font-rubik">הוספת נושא לימוד שבועי</h3>
            <p className="text-xs text-slate-500 mb-4">עבור קורס {currentCourse?.name}</p>

            <form onSubmit={handleCreateTopic} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">שבוע סמסטר</label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={newTopicWeek}
                  onChange={e => setNewTopicWeek(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">כותרת הנושא</label>
                <input
                  type="text"
                  required
                  placeholder="למשל: תכנות דינמי ואלגוריתמי קירוב"
                  value={newTopicTitle}
                  onChange={e => setNewTopicTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTopicModal(false)}
                  className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100"
                >
                  שמור נושא
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
