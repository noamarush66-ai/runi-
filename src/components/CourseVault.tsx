import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VaultFile, FileType } from '../types';
import {
  Folder,
  FileText,
  FileCode,
  FileSpreadsheet,
  Upload,
  Sparkles,
  Search,
  Tag,
  Calendar,
  ExternalLink,
  Trash2,
  Eye,
  Filter
} from 'lucide-react';

export const CourseVault: React.FC = () => {
  const {
    courses,
    files,
    selectedCourseId,
    setSelectedCourseId,
    addVaultFile,
    deleteVaultFile,
    setActiveTab,
    createAISummary
  } = useApp();

  const [activeCourseFilter, setActiveCourseFilter] = useState<string>(selectedCourseId || 'all');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewFile, setPreviewFile] = useState<VaultFile | null>(null);

  // Upload Form State
  const [fileName, setFileName] = useState('');
  const [fileCourse, setFileCourse] = useState(courses[0]?.id || '');
  const [fileType, setFileType] = useState<FileType>('pdf');
  const [fileWeek, setFileWeek] = useState(1);
  const [fileTopic, setFileTopic] = useState('');
  const [fileTags, setFileTags] = useState('שקפים, סיכום');
  const [fileContent, setFileContent] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    addVaultFile({
      name: fileName.trim(),
      courseId: fileCourse,
      type: fileType,
      week: Number(fileWeek),
      topic: fileTopic.trim() || undefined,
      tags: fileTags.split(',').map(t => t.trim()).filter(Boolean),
      size: '2.4 MB',
      contentPreview: fileContent.trim() || 'קובץ שהועלה בהצלחה לכספת הקורס.'
    });

    setFileName('');
    setFileTopic('');
    setFileContent('');
    setShowUploadModal(false);
  };

  const filteredFiles = files.filter(f => {
    const matchesCourse = activeCourseFilter === 'all' || f.courseId === activeCourseFilter;
    const matchesWeek = selectedWeek === 'all' || f.week === Number(selectedWeek);
    const matchesSearch =
      searchQuery === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.topic && f.topic.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCourse && matchesWeek && matchesSearch;
  });

  const getCourse = (courseId: string) => courses.find(c => c.id === courseId);

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-rose-500" />;
      case 'pptx':
        return <FileSpreadsheet className="w-6 h-6 text-amber-500" />;
      case 'docx':
        return <FileText className="w-6 h-6 text-blue-500" />;
      default:
        return <FileCode className="w-6 h-6 text-slate-500" />;
    }
  };

  const handleSendToCopilot = (file: VaultFile) => {
    const course = getCourse(file.courseId);
    createAISummary({
      courseId: file.courseId,
      title: `סיכום מבוסס AI: ${file.name.replace(/\.[^/.]+$/, '')}`,
      sourceDocName: file.name,
      week: file.week,
      keyTakeaways: [
        `סקירה מרכזית של נושא ${file.topic || file.name} מתוך קורס ${course?.name || ''}.`,
        'מושגי היסוד המוצגים במסמך מהווים חלק עיקרי מהשאלות הפתוחות במבחן הסופי.',
        'דגש על הבנת העקרונות והמודלים התיאורטיים שנסקרו בהרצאה.'
      ],
      keyConcepts: [
        {
          term: file.topic || 'מושג מרכזי',
          definition: file.contentPreview || 'הגדרה ותמצית מתוך המסמך שנלמד בכיתה.',
          importance: 'critical'
        }
      ],
      examTips: [
        'מומלץ לתרגל את הדוגמאות המופיעות בסוף הקובץ.',
        'שים לב להבדלים בין המודל התיאורטי ליישום המעשי.'
      ]
    });
    setActiveTab('copilot');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <Folder className="w-3.5 h-3.5" />
            <span>Course Vault & File Hub</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-rubik tracking-tight">
            כספת הקורסים וניהול קבצים
          </h2>
          <p className="text-sm text-slate-500 max-w-xl">
            מרכז את כל המצגות, המאמרים וסיכומי השיעור לפי קורסים ושבועות. חפש במהירות או סכם מסמך באמצעות ה-AI.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="self-start sm:self-center flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-100 transition-all active:scale-95 text-sm"
        >
          <Upload className="w-4 h-4" />
          <span>העלאת חומר חדש</span>
        </button>
      </div>

      {/* Course Folders Grid */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          תיקיות לפי קורסים
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveCourseFilter('all')}
            className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between ${
              activeCourseFilter === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div>
              <div className="font-bold text-sm">כל הקורסים</div>
              <div className={`text-xs mt-0.5 ${activeCourseFilter === 'all' ? 'text-indigo-100' : 'text-slate-400'}`}>
                {files.length} קבצים בסך הכל
              </div>
            </div>
            <Folder className="w-5 h-5 opacity-80" />
          </button>

          {courses.map(course => {
            const courseFilesCount = files.filter(f => f.courseId === course.id).length;
            const isSelected = activeCourseFilter === course.id;

            return (
              <button
                key={course.id}
                onClick={() => setActiveCourseFilter(course.id)}
                className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-200 hover:bg-slate-50/70 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                    <span className="text-[11px] font-mono opacity-70">{course.code}</span>
                  </div>
                  <div className="font-bold text-sm line-clamp-1">{course.name}</div>
                  <div className={`text-xs mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {courseFilesCount} קבצים
                  </div>
                </div>
                <Folder className="w-5 h-5 opacity-80" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          <input
            type="text"
            placeholder="חיפוש לפי שם קובץ או נושא..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Week Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-400 shrink-0">שבוע:</span>
          {['all', '1', '2', '3', '4', '5'].map(w => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                selectedWeek === w
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {w === 'all' ? 'כל השבועות' : `שבוע ${w}`}
            </button>
          ))}
        </div>
      </div>

      {/* Files List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="text-sm font-bold text-slate-900">
            רשימת קבצים ({filteredFiles.length})
          </div>
          <div className="text-xs text-slate-400">
            תומך בכל הפורמטים הנפוצים (PDF, PPTX, DOCX, סיכומים)
          </div>
        </div>

        {filteredFiles.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Folder className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-700">לא נמצאו קבצים בתיקייה זו</p>
            <p className="text-xs text-slate-400">לחץ על ״העלאת חומר חדש״ כדי להוסיף קובץ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredFiles.map(file => {
              const course = getCourse(file.courseId);

              return (
                <div
                  key={file.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                          {getFileIcon(file.type)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                            {file.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            {course && (
                              <span className="font-semibold text-slate-700 flex items-center gap-1">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: course.color }}
                                />
                                {course.name}
                              </span>
                            )}
                            <span>•</span>
                            <span>שבוע {file.week}</span>
                            {file.size && (
                              <>
                                <span>•</span>
                                <span>{file.size}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteVaultFile(file.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                        title="מחק קובץ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {file.topic && (
                      <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl mb-3 border border-slate-100">
                        <span className="font-bold text-slate-700 ml-1">נושא:</span>
                        {file.topic}
                      </div>
                    )}

                    {file.tags && file.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap mb-3">
                        {file.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => setPreviewFile(file)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      צפייה בתקציר
                    </button>

                    <button
                      onClick={() => handleSendToCopilot(file)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      סכם ב-AI
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 mb-1 font-rubik">העלאת קובץ חדש לכספת</h3>
            <p className="text-xs text-slate-500 mb-4">הוסף סיכומי שיעור, מצגות מרצה או מאמרים לקורס.</p>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">שם הקובץ המלא</label>
                <input
                  type="text"
                  required
                  placeholder="למשל: הרצאה 06 - ערימות בינאריות.pdf"
                  value={fileName}
                  onChange={e => setFileName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">קורס</label>
                  <select
                    value={fileCourse}
                    onChange={e => setFileCourse(e.target.value)}
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">סוג הקובץ</label>
                  <select
                    value={fileType}
                    onChange={e => setFileType(e.target.value as FileType)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="pdf">מסמך PDF</option>
                    <option value="pptx">מצגת PowerPoint</option>
                    <option value="docx">סיכום Word / Docx</option>
                    <option value="note">הערה / פתק דיגיטלי</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">שבוע סמסטר</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={fileWeek}
                    onChange={e => setFileWeek(Number(e.target.value))}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">נושא הלימוד</label>
                  <input
                    type="text"
                    placeholder="למשל: שאילתות מתקדמות"
                    value={fileTopic}
                    onChange={e => setFileTopic(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">תקציר או טקסט לחילוץ AI</label>
                <textarea
                  rows={3}
                  placeholder="הדבק פה תוכן או נקודות עיקריות מההרצאה כדי שה-AI יוכל לסכם אותן..."
                  value={fileContent}
                  onChange={e => setFileContent(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="text-xs font-semibold px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100"
                >
                  העלה לכספת
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-base font-bold text-slate-900 font-rubik flex items-center gap-2">
                {getFileIcon(previewFile.type)}
                {previewFile.name}
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                סגור
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-slate-500">
                <span className="font-bold">נושא:</span> {previewFile.topic || 'כללי'} |{' '}
                <span className="font-bold">שבוע:</span> {previewFile.week} |{' '}
                <span className="font-bold">גודל:</span> {previewFile.size}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed max-h-60 overflow-y-auto">
                {previewFile.contentPreview || 'אין תצוגה מקדימה זמינה עבור קובץ זה.'}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => {
                  handleSendToCopilot(previewFile);
                  setPreviewFile(null);
                }}
                className="text-xs font-bold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                צור סיכום AI עכשיו
              </button>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
