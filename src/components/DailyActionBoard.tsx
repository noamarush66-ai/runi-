import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Task, TaskType } from '../types';
import {
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  AlertCircle,
  FileText,
  BookOpen,
  Calendar,
  ShieldAlert,
  ArrowLeft,
  Trash2
} from 'lucide-react';

export const DailyActionBoard: React.FC = () => {
  const {
    tasks,
    courses,
    toggleTask,
    addTask,
    deleteTask,
    setActiveTab,
    setSelectedCourseId,
    overallGPA,
    unacquiredSummariesCount
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || '');
  const [newDueDate, setNewDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [newType, setNewType] = useState<TaskType>('assignment');
  const [newUrgent, setNewUrgent] = useState(false);
  const [newHours, setNewHours] = useState(2);
  const [newDesc, setNewDesc] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle.trim(),
      courseId: newCourseId,
      dueDate: newDueDate,
      type: newType,
      completed: false,
      urgent: newUrgent,
      estimatedHours: newHours,
      description: newDesc.trim() || undefined
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  // Filter tasks: this week vs upcoming
  const filteredTasks = tasks.filter(t => {
    if (filterType === 'all') return true;
    if (filterType === 'pending') return !t.completed;
    if (filterType === 'completed') return t.completed;
    return t.type === filterType;
  });

  const pendingTasks = filteredTasks.filter(t => !t.completed);
  const completedTasks = filteredTasks.filter(t => t.completed);

  const getCourse = (id: string) => courses.find(c => c.id === id);

  const getTypeLabel = (type: TaskType) => {
    switch (type) {
      case 'assignment':
        return { label: 'מטלה להגשה', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'reading':
        return { label: 'קריאת מאמר', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'summary':
        return { label: 'השלמת סיכום', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'exam':
        return { label: 'בוחן / מבחן', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'miluim_makeup':
        return { label: 'השלמת מילואים', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      default:
        return { label: 'משימה', bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-l from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-medium mb-3 border border-white/10">
            <Clock className="w-3.5 h-3.5" />
            <span>דד-ליינים ופוקוס יומי לסמסטר א׳</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold font-rubik tracking-tight text-white mb-2">
            לוח פעולות ודד-ליין יומי
          </h2>
          <p className="text-sm text-indigo-200/90 max-w-xl leading-relaxed">
            כל מה שדחוף ורלוונטי לימים הקרובים. סגור משימות, סמן השלמת סיכומים ושמור על רצף למידה גבוה.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="relative z-10 self-start sm:self-center flex items-center gap-2 bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>הוסף משימה / הגשה</span>
        </button>
      </div>

      {/* Quick Overview Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* GPA & Progress Widget */}
        <div
          onClick={() => setActiveTab('tracker')}
          className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">שקלול ציונים</span>
            <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
              למעקב מפורט <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900 font-rubik">{overallGPA}</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              מצטיין דיקאן
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            מבוסס על שקלול ציוני תרגילי בית, בחנים ועבודות הסמסטר.
          </p>
        </div>

        {/* Miluim & Makeup Alert Widget */}
        <div
          onClick={() => setActiveTab('miluim')}
          className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">התאמות והיעדרויות</span>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-rubik">{unacquiredSummariesCount}</span>
            <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold border border-amber-200">
              סיכומים להשלמה
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            שיעורים שנפלו על ימי מילואים ודורשים השגת חומר או צפייה בהקלטה.
          </p>
        </div>

        {/* Exams Alert Widget */}
        <div
          onClick={() => setActiveTab('vault')}
          className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">בחינות קרובות</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-sm font-bold text-slate-900">
            מבני נתונים: 12 בפברואר
          </div>
          <p className="text-xs text-slate-500 mt-1">
            מועד א׳ | נותרו 3 חודשים להתכונן ולסגור נושאים בעייתיים.
          </p>
        </div>

      </div>

      {/* Quick Course Launcher Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          גישה מהירה לקורסים שלך
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourseId(course.id);
                setActiveTab('vault');
              }}
              className="p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/70 hover:bg-indigo-50/40 text-right transition-all group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: course.color }}
                />
                <span className="text-xs font-mono text-slate-500">{course.code}</span>
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-700">
                {course.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{course.credits} נק״ז</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
        
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-rubik">
              משימות ומטלות להיום והשבוע הקרוב
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              נותרו {pendingTasks.length} משימות פתוחות
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'הכל' },
              { id: 'pending', label: 'דחופות ופתוחות' },
              { id: 'assignment', label: 'הגשות' },
              { id: 'reading', label: 'קריאה' },
              { id: 'miluim_makeup', label: 'מילואים' },
              { id: 'completed', label: 'הושלמו' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                  filterType === f.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="mt-5 space-y-3">
          {pendingTasks.length === 0 && completedTasks.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 mb-2" />
              <p className="font-semibold text-slate-700">אין משימות להצגה בסינון זה</p>
              <p className="text-xs text-slate-400">כל הכבוד, אתה עומד בכל הדד-ליינים!</p>
            </div>
          )}

          {pendingTasks.map(task => {
            const course = getCourse(task.courseId);
            const typeInfo = getTypeLabel(task.type);

            return (
              <div
                key={task.id}
                className="flex items-start justify-between gap-3 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 transition-all group"
              >
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                  >
                    <Circle className="w-5 h-5" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-800">{task.title}</span>
                      {task.urgent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                          דחוף
                        </span>
                      )}
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${typeInfo.bg}`}>
                        {typeInfo.label}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-500 leading-relaxed">{task.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      {course && (
                        <span className="flex items-center gap-1.5 font-medium text-slate-600">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: course.color }}
                          />
                          {course.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-mono text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        דד-ליין: {task.dueDate}
                      </span>
                      {task.estimatedHours && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          כ-{task.estimatedHours} שעות עבודה
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                  title="מחק משימה"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {/* Completed Tasks section */}
          {completedTasks.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-400 mb-2">
                הושלמו לאחרונה ({completedTasks.length})
              </div>
              <div className="space-y-2">
                {completedTasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-400"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-emerald-500 hover:text-slate-400 transition-colors shrink-0"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <span className="text-xs font-medium line-through text-slate-500">
                        {task.title}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 hover:text-rose-500 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 mb-1 font-rubik">הוספת משימה חדשה</h3>
            <p className="text-xs text-slate-500 mb-4">הזן את פרטי המטלה, סוגה והדד-ליין המיועד.</p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">שם המשימה / ההגשה</label>
                <input
                  type="text"
                  required
                  placeholder="למשל: תרגיל בית 4 באלגברה"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">שייך לקורס</label>
                  <select
                    value={newCourseId}
                    onChange={e => setNewCourseId(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">סוג המשימה</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as TaskType)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="assignment">הגשת תרגיל / עבודה</option>
                    <option value="reading">קריאת מאמר</option>
                    <option value="summary">השלמת סיכום</option>
                    <option value="exam">בוחן / מבחן</option>
                    <option value="miluim_makeup">השלמת מילואים</option>
                    <option value="other">אחר</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">דד-ליין (תאריך יעד)</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">הערכת שעות עבודה</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={newHours}
                    onChange={e => setNewHours(parseFloat(e.target.value))}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">הערות / הנחיות נוספות</label>
                <textarea
                  rows={2}
                  placeholder="עמודים רלוונטיים, קישור לפורום או שותפים להגשה..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgentCheck"
                  checked={newUrgent}
                  onChange={e => setNewUrgent(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="urgentCheck" className="text-xs font-bold text-rose-700 cursor-pointer">
                  סמן כמשימה דחופה בעדיפות עליונה
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-semibold px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100"
                >
                  הוסף ללוח
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
