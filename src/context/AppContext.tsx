import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  Task,
  VaultFile,
  AISummary,
  AcademicTopic,
  CourseGradeItem,
  MiluimPeriod,
  Flashcard,
  ActiveTab,
  ComprehensionStatus,
  AttendanceStatus
} from '../types';
import {
  initialCourses,
  initialTasks,
  initialVaultFiles,
  initialAISummaries,
  initialAcademicTopics,
  initialGradeItems,
  initialMiluimPeriods,
  initialFlashcards
} from '../data/mockData';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;

  // Data lists
  courses: Course[];
  tasks: Task[];
  files: VaultFile[];
  aiSummaries: AISummary[];
  academicTopics: AcademicTopic[];
  gradeItems: CourseGradeItem[];
  miluimPeriods: MiluimPeriod[];
  flashcards: Flashcard[];

  // Actions
  toggleTask: (taskId: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  deleteTask: (taskId: string) => void;

  addVaultFile: (file: Omit<VaultFile, 'id' | 'uploadDate'>) => void;
  deleteVaultFile: (fileId: string) => void;

  createAISummary: (summary: Omit<AISummary, 'id' | 'createdAt'>) => void;

  updateComprehension: (topicId: string, status: ComprehensionStatus) => void;
  updateAttendance: (topicId: string, status: AttendanceStatus) => void;
  toggleSummaryAcquired: (topicId: string) => void;
  addAcademicTopic: (topic: Omit<AcademicTopic, 'id'>) => void;

  updateGrade: (gradeItemId: string, grade: number) => void;
  addGradeItem: (item: Omit<CourseGradeItem, 'id'>) => void;

  toggleMiluimSummaryAcquired: (periodId: string, missedLessonId: string) => void;
  toggleMiluimRecordingWatched: (periodId: string, missedLessonId: string) => void;
  addMiluimPeriod: (period: Omit<MiluimPeriod, 'id'>) => void;

  updateFlashcardMastery: (cardId: string, level: 0 | 1 | 2) => void;
  addFlashcard: (card: Omit<Flashcard, 'id'>) => void;

  // Stats / Computed
  overallGPA: number;
  totalCredits: number;
  urgentTasksCount: number;
  unacquiredSummariesCount: number;
  totalMiluimDays: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Load from localStorage or defaults
  const [courses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('runi_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('runi_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [files, setFiles] = useState<VaultFile[]>(() => {
    const saved = localStorage.getItem('runi_files');
    return saved ? JSON.parse(saved) : initialVaultFiles;
  });

  const [aiSummaries, setAiSummaries] = useState<AISummary[]>(() => {
    const saved = localStorage.getItem('runi_ai_summaries');
    return saved ? JSON.parse(saved) : initialAISummaries;
  });

  const [academicTopics, setAcademicTopics] = useState<AcademicTopic[]>(() => {
    const saved = localStorage.getItem('runi_academic_topics');
    return saved ? JSON.parse(saved) : initialAcademicTopics;
  });

  const [gradeItems, setGradeItems] = useState<CourseGradeItem[]>(() => {
    const saved = localStorage.getItem('runi_grade_items');
    return saved ? JSON.parse(saved) : initialGradeItems;
  });

  const [miluimPeriods, setMiluimPeriods] = useState<MiluimPeriod[]>(() => {
    const saved = localStorage.getItem('runi_miluim_periods');
    return saved ? JSON.parse(saved) : initialMiluimPeriods;
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('runi_flashcards');
    return saved ? JSON.parse(saved) : initialFlashcards;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('runi_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('runi_files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('runi_ai_summaries', JSON.stringify(aiSummaries));
  }, [aiSummaries]);

  useEffect(() => {
    localStorage.setItem('runi_academic_topics', JSON.stringify(academicTopics));
  }, [academicTopics]);

  useEffect(() => {
    localStorage.setItem('runi_grade_items', JSON.stringify(gradeItems));
  }, [gradeItems]);

  useEffect(() => {
    localStorage.setItem('runi_miluim_periods', JSON.stringify(miluimPeriods));
  }, [miluimPeriods]);

  useEffect(() => {
    localStorage.setItem('runi_flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  // Actions
  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: 'task_' + Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const addVaultFile = (file: Omit<VaultFile, 'id' | 'uploadDate'>) => {
    const newFile: VaultFile = {
      ...file,
      id: 'file_' + Date.now(),
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setFiles(prev => [newFile, ...prev]);
  };

  const deleteVaultFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const createAISummary = (summary: Omit<AISummary, 'id' | 'createdAt'>) => {
    const newSummary: AISummary = {
      ...summary,
      id: 'summary_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAiSummaries(prev => [newSummary, ...prev]);
  };

  const updateComprehension = (topicId: string, status: ComprehensionStatus) => {
    setAcademicTopics(prev =>
      prev.map(t => (t.id === topicId ? { ...t, comprehensionStatus: status } : t))
    );
  };

  const updateAttendance = (topicId: string, status: AttendanceStatus) => {
    setAcademicTopics(prev =>
      prev.map(t => (t.id === topicId ? { ...t, attendanceStatus: status } : t))
    );
  };

  const toggleSummaryAcquired = (topicId: string) => {
    setAcademicTopics(prev =>
      prev.map(t => (t.id === topicId ? { ...t, hasSummary: !t.hasSummary } : t))
    );
  };

  const addAcademicTopic = (topic: Omit<AcademicTopic, 'id'>) => {
    const newTopic: AcademicTopic = {
      ...topic,
      id: 'topic_' + Date.now()
    };
    setAcademicTopics(prev => [...prev, newTopic]);
  };

  const updateGrade = (gradeItemId: string, grade: number) => {
    setGradeItems(prev =>
      prev.map(g => (g.id === gradeItemId ? { ...g, grade } : g))
    );
  };

  const addGradeItem = (item: Omit<CourseGradeItem, 'id'>) => {
    const newItem: CourseGradeItem = {
      ...item,
      id: 'grade_' + Date.now()
    };
    setGradeItems(prev => [...prev, newItem]);
  };

  const toggleMiluimSummaryAcquired = (periodId: string, missedLessonId: string) => {
    setMiluimPeriods(prev =>
      prev.map(period => {
        if (period.id !== periodId) return period;
        return {
          ...period,
          missedLessons: period.missedLessons.map(lesson =>
            lesson.id === missedLessonId
              ? { ...lesson, summaryAcquired: !lesson.summaryAcquired }
              : lesson
          )
        };
      })
    );
  };

  const toggleMiluimRecordingWatched = (periodId: string, missedLessonId: string) => {
    setMiluimPeriods(prev =>
      prev.map(period => {
        if (period.id !== periodId) return period;
        return {
          ...period,
          missedLessons: period.missedLessons.map(lesson =>
            lesson.id === missedLessonId
              ? { ...lesson, recordingWatched: !lesson.recordingWatched }
              : lesson
          )
        };
      })
    );
  };

  const addMiluimPeriod = (period: Omit<MiluimPeriod, 'id'>) => {
    const newPeriod: MiluimPeriod = {
      ...period,
      id: 'miluim_' + Date.now()
    };
    setMiluimPeriods(prev => [newPeriod, ...prev]);
  };

  const updateFlashcardMastery = (cardId: string, level: 0 | 1 | 2) => {
    setFlashcards(prev =>
      prev.map(c =>
        c.id === cardId
          ? { ...c, masteryLevel: level, lastReviewed: new Date().toISOString().split('T')[0] }
          : c
      )
    );
  };

  const addFlashcard = (card: Omit<Flashcard, 'id'>) => {
    const newCard: Flashcard = {
      ...card,
      id: 'card_' + Date.now()
    };
    setFlashcards(prev => [newCard, ...prev]);
  };

  // Computed GPA calculation
  const courseGrades = courses.map(course => {
    const items = gradeItems.filter(g => g.courseId === course.id && g.grade !== undefined);
    if (items.length === 0) return null;
    const totalWeight = items.reduce((sum, item) => sum + item.weightPercent, 0);
    const weightedSum = items.reduce((sum, item) => sum + (item.grade || 0) * (item.weightPercent / 100), 0);
    const normalizedGrade = totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0;
    return {
      courseId: course.id,
      credits: course.credits,
      average: Math.round(normalizedGrade * 10) / 10
    };
  }).filter((c): c is { courseId: string; credits: number; average: number } => c !== null);

  const totalCreditsWithGrades = courseGrades.reduce((sum, c) => sum + c.credits, 0);
  const overallGPA =
    totalCreditsWithGrades > 0
      ? Math.round(
          (courseGrades.reduce((sum, c) => sum + c.average * c.credits, 0) / totalCreditsWithGrades) *
            10
        ) / 10
      : 91.5;

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const urgentTasksCount = tasks.filter(t => !t.completed && (t.urgent || t.dueDate <= '2026-10-30')).length;
  const unacquiredSummariesCount =
    academicTopics.filter(t => !t.hasSummary && t.attendanceStatus === 'miluim').length +
    miluimPeriods.flatMap(p => p.missedLessons).filter(l => !l.summaryAcquired).length;
  const totalMiluimDays = miluimPeriods.reduce((sum, p) => sum + p.totalDays, 0);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCourseId,
        setSelectedCourseId,
        courses,
        tasks,
        files,
        aiSummaries,
        academicTopics,
        gradeItems,
        miluimPeriods,
        flashcards,
        toggleTask,
        addTask,
        deleteTask,
        addVaultFile,
        deleteVaultFile,
        createAISummary,
        updateComprehension,
        updateAttendance,
        toggleSummaryAcquired,
        addAcademicTopic,
        updateGrade,
        addGradeItem,
        toggleMiluimSummaryAcquired,
        toggleMiluimRecordingWatched,
        addMiluimPeriod,
        updateFlashcardMastery,
        addFlashcard,
        overallGPA,
        totalCredits,
        urgentTasksCount,
        unacquiredSummariesCount,
        totalMiluimDays
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
