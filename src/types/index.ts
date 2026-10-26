export type TaskType = 'assignment' | 'reading' | 'summary' | 'exam' | 'miluim_makeup' | 'other';

export interface Task {
  id: string;
  title: string;
  courseId: string;
  dueDate: string; // YYYY-MM-DD
  type: TaskType;
  completed: boolean;
  urgent?: boolean;
  estimatedHours?: number;
  description?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  lecturer: string;
  teachingAssistant?: string;
  semester: string;
  color: string; // Tailwind color class or hex
  examDateA?: string;
  examDateB?: string;
  classroom?: string;
  dayAndTime?: string;
}

export type FileType = 'pdf' | 'pptx' | 'docx' | 'note' | 'link';

export interface VaultFile {
  id: string;
  courseId: string;
  name: string;
  type: FileType;
  size?: string;
  uploadDate: string;
  week: number;
  topic?: string;
  tags?: string[];
  contentPreview?: string;
}

export interface KeyConcept {
  term: string;
  definition: string;
  importance: 'high' | 'medium' | 'critical';
}

export interface AISummary {
  id: string;
  courseId: string;
  title: string;
  sourceDocName: string;
  week?: number;
  keyTakeaways: string[];
  keyConcepts: KeyConcept[];
  examTips: string[];
  createdAt: string;
}

export type ComprehensionStatus = 'mastered' | 'in_progress' | 'needs_help';
export type AttendanceStatus = 'attended' | 'missed' | 'miluim';

export interface AcademicTopic {
  id: string;
  courseId: string;
  week: number;
  title: string;
  comprehensionStatus: ComprehensionStatus;
  attendanceStatus: AttendanceStatus;
  hasSummary: boolean;
  notes?: string;
}

export interface CourseGradeItem {
  id: string;
  courseId: string;
  name: string;
  weightPercent: number;
  grade?: number; // 0-100
  isFinalExam?: boolean;
  dueDate?: string;
}

export interface MissedLesson {
  id: string;
  courseId: string;
  date: string;
  topic: string;
  summaryAcquired: boolean;
  recordingWatched: boolean;
  notes?: string;
}

export interface MiluimPeriod {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  orderType: 'צו 8' | 'תעסוקה מבצעית' | 'אימון' | 'אחר';
  totalDays: number;
  notes?: string;
  missedLessons: MissedLesson[];
}

export interface Flashcard {
  id: string;
  courseId: string;
  topic: string;
  question: string;
  answer: string;
  masteryLevel: 0 | 1 | 2; // 0: new/difficult, 1: learning, 2: mastered
  lastReviewed?: string;
}

export type ActiveTab = 'dashboard' | 'vault' | 'copilot' | 'tracker' | 'miluim' | 'flashcards';
