import { Course, Task, VaultFile, AISummary, AcademicTopic, CourseGradeItem, MiluimPeriod, Flashcard } from '../types';

export const initialCourses: Course[] = [
  {
    id: 'c1',
    name: 'מבני נתונים ואלגוריתמים',
    code: 'CS-201',
    credits: 4,
    lecturer: 'פרופ׳ דן שחר',
    teachingAssistant: 'עומר לוי',
    semester: 'סמסטר א׳ 2026',
    color: '#3b82f6', // blue
    examDateA: '2026-02-12',
    examDateB: '2026-03-20',
    classroom: 'בניין ארסון, אולם 102',
    dayAndTime: 'ימי ראשון 10:00 - 13:00'
  },
  {
    id: 'c2',
    name: 'הסתברות וסטטיסטיקה למדעים',
    code: 'STAT-104',
    credits: 3.5,
    lecturer: 'ד״ר מיכל אבן',
    teachingAssistant: 'רוני ברק',
    semester: 'סמסטר א׳ 2026',
    color: '#8b5cf6', // purple
    examDateA: '2026-02-18',
    examDateB: '2026-03-27',
    classroom: 'בניין תקשורת, חדר 205',
    dayAndTime: 'ימי שלישי 12:00 - 15:00'
  },
  {
    id: 'c3',
    name: 'מבוא למערכות מסדי נתונים',
    code: 'DB-301',
    credits: 3,
    lecturer: 'ד״r יוסי כהן',
    teachingAssistant: 'מאיה אלון',
    semester: 'סמסטר א׳ 2026',
    color: '#10b981', // green
    examDateA: '2026-02-25',
    examDateB: '2026-04-05',
    classroom: 'אולם כנסים ראשי',
    dayAndTime: 'ימי רביעי 14:00 - 17:00'
  },
  {
    id: 'c4',
    name: 'משפט וטכנולוגיה בעידן המידע',
    code: 'LAW-110',
    credits: 2,
    lecturer: 'עו״ד אורית דגן',
    semester: 'סמסטר א׳ 2026',
    color: '#f59e0b', // amber
    examDateA: '2026-02-08',
    classroom: 'בניין משפטים, חדר 12',
    dayAndTime: 'ימי חמישי 09:00 - 11:00'
  }
];

export const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'הגשת תרגיל בית 3: עצי AVL ועצי חיפוש בינאריים',
    courseId: 'c1',
    dueDate: '2026-10-27',
    type: 'assignment',
    completed: false,
    urgent: true,
    estimatedHours: 4,
    description: 'לממש עץ AVL עם רוטציות שמאל-ימין ולבדוק מקרי קצה בריצה.'
  },
  {
    id: 't2',
    title: 'קריאת מאמר: פרטיות מידע ו-GDPR לקראת שיעור חמישי',
    courseId: 'c4',
    dueDate: '2026-10-28',
    type: 'reading',
    completed: false,
    urgent: false,
    estimatedHours: 1.5,
    description: 'עמודים 12-28, לשים דגש על פסיקת ביהמ״ש העליון.'
  },
  {
    id: 't3',
    title: 'תרגול לקראת בוחן אמצע בהסתברות',
    courseId: 'c2',
    dueDate: '2026-10-30',
    type: 'exam',
    completed: false,
    urgent: true,
    estimatedHours: 5,
    description: 'חזרה על משתנים מקריים בדידים, תוחלת ושונות ומשפט בייס.'
  },
  {
    id: 't4',
    title: 'השלמת סיכום שיעור 4 שהוחמץ עקב מילואים',
    courseId: 'c3',
    dueDate: '2026-10-29',
    type: 'miluim_makeup',
    completed: false,
    urgent: true,
    estimatedHours: 2,
    description: 'השגת הסיכום מדניאל ועבודה על שאילתות JOIN מורכבות ב-SQL.'
  },
  {
    id: 't5',
    title: 'הגשת דו״ח מעבדה ב-SQL: נרמול טבלאות BCNF',
    courseId: 'c3',
    dueDate: '2026-11-03',
    type: 'assignment',
    completed: true,
    estimatedHours: 3
  }
];

export const initialVaultFiles: VaultFile[] = [
  {
    id: 'f1',
    courseId: 'c1',
    name: 'הרצאה 04 - עצי AVL ואיזון עצים.pdf',
    type: 'pdf',
    size: '3.8 MB',
    uploadDate: '2026-10-18',
    week: 4,
    topic: 'עצי חיפוש בינאריים',
    tags: ['שקפים', 'מבחן', 'חשוב'],
    contentPreview: 'מבוא לעצי AVL: הגדרת גורם איזון BF = h(L) - h(R). עץ מאוזן מוגדר כאשר לכל צומת |BF| <= 1. סוגי רוטציות: LL, RR, LR, RL.'
  },
  {
    id: 'f2',
    courseId: 'c1',
    name: 'סיכום סטודנטים מקיף - שבועות 1-5.docx',
    type: 'docx',
    size: '1.2 MB',
    uploadDate: '2026-10-22',
    week: 5,
    topic: 'סיכום מצטבר',
    tags: ['סיכום', 'חובה'],
    contentPreview: 'סיכום מקיף של כל שיעורי הסמסטר: סיבוכיות זמן ריצה, מבני נתונים לינאריים (תור, מחסנית, רשימה מקושרת), טבלאות גיבוב ועצים.'
  },
  {
    id: 'f3',
    courseId: 'c2',
    name: 'מצגת שיעור 03 - משתנים מקריים רציפים.pptx',
    type: 'pptx',
    size: '8.4 MB',
    uploadDate: '2026-10-15',
    week: 3,
    topic: 'התפלגויות רציפות',
    tags: ['שקפים מרצה'],
    contentPreview: 'פונקציית צפיפות f(x), פונקציית התפלגות מצטברת F(x), התפלגות אחידה, מעריכית ונורמלית standard normal distribution.'
  },
  {
    id: 'f4',
    courseId: 'c3',
    name: 'דף נוסחאות ותרגול SQL מתקדם.pdf',
    type: 'pdf',
    size: '950 KB',
    uploadDate: '2026-10-20',
    week: 4,
    topic: 'SQL ושאילתות',
    tags: ['דף נוסחאות', 'מעבדה'],
    contentPreview: 'פקודות SQL נפוצות: SELECT, WHERE, GROUP BY, HAVING, ORDER BY. סוגי JOIN: INNER, LEFT, RIGHT, FULL OUTER. תתי שאילתות מקושרות.'
  },
  {
    id: 'f5',
    courseId: 'c4',
    name: 'מאמר חובה: אתיקה ו-AI במשפט הישראלי.pdf',
    type: 'pdf',
    size: '2.1 MB',
    uploadDate: '2026-10-12',
    week: 2,
    topic: 'אתיקה ובינה מלאכותית',
    tags: ['מאמר חובה', 'מבחן'],
    contentPreview: 'ניתוח סוגיות אחריות נזיקית בשימוש באלגוריתמים אוטונומיים, זכויות יוצרים של יצירות שנוצרו על ידי מודלי שפה (LLM) והגנת הפרטיות.'
  }
];

export const initialAISummaries: AISummary[] = [
  {
    id: 's1',
    courseId: 'c1',
    title: 'סיכום AI ממוקד: עצי AVL ורוטציות איזון',
    sourceDocName: 'הרצאה 04 - עצי AVL ואיזון עצים.pdf',
    week: 4,
    createdAt: '2026-10-22',
    keyTakeaways: [
      'עץ AVL שומר על גובה O(log n) בכל רגע נתון על ידי שמירת גורם איזון של {-1, 0, 1}.',
      'במקרה של הפרת איזון כתוצאה מהכנסה או מחיקה, מבצעים פעולת תיקון בסיבוכיות O(1) באמצעות רוטציה בודדת או כפולה.',
      'מחיקה עלולה לדרוש שרשרת רוטציות עד לשורש (O(log n)), בעוד שהכנסה דורשת לכל היותר רוטציה אחת או שתיים (O(1)).',
      'במבחן שואלים תדיר על זיהוי סוג הרוטציה הנדרש ושרטוט העץ לאחר הכנסת איבר ספציפי.'
    ],
    keyConcepts: [
      {
        term: 'גורם איזון (Balance Factor - BF)',
        definition: 'ההפרש בין גובה תת-העץ השמאלי לגובה תת-העץ הימני: BF(v) = height(left) - height(right).',
        importance: 'critical'
      },
      {
        term: 'רוטציית LL / RR',
        definition: 'רוטציה פשוטה (Single Rotation) המבוצעת כאשר האי-איזון נוצר באותו כיוון (שמאל-שמאל או ימין-ימין).',
        importance: 'high'
      },
      {
        term: 'רוטציית LR / RL',
        definition: 'רוטציה כפולה (Double Rotation) – קודם מסובבים את תת-העץ הפנימי ולאחר מכן את הצומת הראשי.',
        importance: 'critical'
      }
    ],
    examTips: [
      'טיפ זהב למבחן: תמיד סמנו את גורמי האיזון בכל צומת בדרך מלמטה למעלה מיד לאחר הכנסת הערך.',
      'שימו לב לשאלת מילכוד: האם עץ ריק הוא עץ AVL חוקי? כן, גובהו 1- ואיזונו 0.'
    ]
  },
  {
    id: 's2',
    courseId: 'c2',
    title: 'תקציר AI: משפט הגבול המרכזי והתפלגות נורמלית',
    sourceDocName: 'מצגת שיעור 03 - משתנים מקריים רציפים.pptx',
    week: 3,
    createdAt: '2026-10-23',
    keyTakeaways: [
      'סכום של מספר רב של משתנים מקריים בלתי-תלויים ושווי-התפלגות שואף להתפלגות נורמלית, ללא תלות בהתפלגות המקורית.',
      'כלל ה-68-95-99.7 הוא כלי מפתח לחישובים מהירים במבחן (הסתברות במרחק של 1, 2 ו-3 סטיות תקן).',
      'תקנון (Standardization): המרת כל משתנה X למשתנה נורמלי סטנדרטי Z=(X-μ)/σ מאפשרת שימוש בטבלת Z.'
    ],
    keyConcepts: [
      {
        term: 'משפט הגבול המרכזי (CLT)',
        definition: 'קובע שתחת תנאים רחבים, הממוצע של מדגם גדול מתפלג נורמלית סביב התוחלת האמיתית.',
        importance: 'critical'
      },
      {
        term: 'ציון תקן (Z-Score)',
        definition: 'מבטא כמה סטיות תקן ערך נתון רחוק מהממוצע: Z = (X - μ) / σ.',
        importance: 'high'
      }
    ],
    examTips: [
      'בבחינה יש תמיד לבדוק האם גודל המדגם n >= 30 לפני החלת משפט הגבול המרכזי.',
      'שימו לב לתיקון רציפות (Continuity Correction) בעת קירוב התפלגות בינומית בדידה לנורמלית רציפה (הוספה/הפחתה של 0.5).'
    ]
  }
];

export const initialAcademicTopics: AcademicTopic[] = [
  // Course 1
  { id: 'top-1-1', courseId: 'c1', week: 1, title: 'סיבוכיות ואסימפטוטיקה (Big-O, Omega, Theta)', comprehensionStatus: 'mastered', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-1-2', courseId: 'c1', week: 2, title: 'מבני נתונים לינאריים: מחסניות, תורים ורשימות מקושרות', comprehensionStatus: 'mastered', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-1-3', courseId: 'c1', week: 3, title: 'טבלאות גיבוב (Hash Tables) ופתרון התנגשויות', comprehensionStatus: 'in_progress', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-1-4', courseId: 'c1', week: 4, title: 'עצי חיפוש בינאריים ועצי AVL', comprehensionStatus: 'in_progress', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-1-5', courseId: 'c1', week: 5, title: 'ערימות בינאריות ותורי עדיפויות (Heaps)', comprehensionStatus: 'needs_help', attendanceStatus: 'miluim', hasSummary: false, notes: 'הוחמץ עקב צו 8. צריך להשיג סיכום מעומר!' },
  
  // Course 2
  { id: 'top-2-1', courseId: 'c2', week: 1, title: 'מרחב מדגם, מאורעות ואקסיומות ההסתברות', comprehensionStatus: 'mastered', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-2-2', courseId: 'c2', week: 2, title: 'הסתברות מותנית, נוסחת ההסתברות הכוללת ומשפט בייס', comprehensionStatus: 'mastered', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-2-3', courseId: 'c2', week: 3, title: 'משתנים מקריים בדידים: ברנולי, בינומי, פואסון וגיאומטרי', comprehensionStatus: 'in_progress', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-2-4', courseId: 'c2', week: 4, title: 'משתנים מקריים רציפים ופונקציית צפיפות', comprehensionStatus: 'needs_help', attendanceStatus: 'miluim', hasSummary: true, notes: 'השגתי סיכום אך עדיין לא פתרתי תרגילי חישוב אינטגרלים.' },

  // Course 3
  { id: 'top-3-1', courseId: 'c3', week: 1, title: 'מודל ישויות-קשרים (ERD) ותרגום לטבלאות', comprehensionStatus: 'mastered', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-3-2', courseId: 'c3', week: 2, title: 'אלגברה יחסית (Relational Algebra)', comprehensionStatus: 'mastered', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-3-3', courseId: 'c3', week: 3, title: 'שפת SQL: שאילתות בסיסיות, סינונים ופונקציות צבירה', comprehensionStatus: 'in_progress', attendanceStatus: 'attended', hasSummary: true },
  { id: 'top-3-4', courseId: 'c3', week: 4, title: 'שאילתות JOIN מתקדמות ותתי-שאילתות מקושרות', comprehensionStatus: 'needs_help', attendanceStatus: 'miluim', hasSummary: false, notes: 'חומר קריטי למבחן! להשלים דחוף מתוך ההקלטה של האוניברסיטה.' }
];

export const initialGradeItems: CourseGradeItem[] = [
  // Course 1
  { id: 'g-1-1', courseId: 'c1', name: 'תרגיל בית 1 (סיבוכיות)', weightPercent: 5, grade: 96, isFinalExam: false },
  { id: 'g-1-2', courseId: 'c1', name: 'תרגיל בית 2 (מחסניות)', weightPercent: 5, grade: 90, isFinalExam: false },
  { id: 'g-1-3', courseId: 'c1', name: 'תרגיל בית 3 (עצי AVL)', weightPercent: 5, isFinalExam: false, dueDate: '2026-10-27' },
  { id: 'g-1-4', courseId: 'c1', name: 'בוחן אמצע סמסטר', weightPercent: 15, grade: 88, isFinalExam: false },
  { id: 'g-1-5', courseId: 'c1', name: 'מבחן סופי (מועד א׳)', weightPercent: 70, isFinalExam: true },

  // Course 2
  { id: 'g-2-1', courseId: 'c2', name: 'מטלות שבועיות (הגשת חובה)', weightPercent: 15, grade: 94, isFinalExam: false },
  { id: 'g-2-2', courseId: 'c2', name: 'בוחן אמצע ממוחשב', weightPercent: 15, isFinalExam: false, dueDate: '2026-10-30' },
  { id: 'g-2-3', courseId: 'c2', name: 'מבחן סופי (מועד א׳)', weightPercent: 70, isFinalExam: true },

  // Course 3
  { id: 'g-3-1', courseId: 'c3', name: 'פרויקט מעבדה SQL חלק א׳', weightPercent: 15, grade: 98, isFinalExam: false },
  { id: 'g-3-2', courseId: 'c3', name: 'פרויקט מעבדה SQL חלק ב׳', weightPercent: 15, isFinalExam: false, dueDate: '2026-11-15' },
  { id: 'g-3-3', courseId: 'c3', name: 'מבחן סופי (מועד א׳)', weightPercent: 70, isFinalExam: true },

  // Course 4
  { id: 'g-4-1', courseId: 'c4', name: 'נייר עמדה בנושא פרטיות ו-AI', weightPercent: 30, grade: 92, isFinalExam: false },
  { id: 'g-4-2', courseId: 'c4', name: 'מבחן בית מסכם', weightPercent: 70, isFinalExam: true }
];

export const initialMiluimPeriods: MiluimPeriod[] = [
  {
    id: 'm1',
    title: 'שירות מילואים פעיל - צו 8 סבב סתיו',
    startDate: '2026-10-14',
    endDate: '2026-10-21',
    orderType: 'צו 8',
    totalDays: 8,
    notes: 'זכאות להתאמות: 2 נקודות זכות אקדמיות, מועד בחינה מיוחד (מועד ג׳), הקלטות פתוחות, וסיוע חונך אקדמי.',
    missedLessons: [
      {
        id: 'ml-1',
        courseId: 'c1',
        date: '2026-10-18',
        topic: 'שבוע 5: ערימות בינאריות ותורי עדיפויות (Heaps)',
        summaryAcquired: false,
        recordingWatched: false,
        notes: 'נדרש לפנות למתרגל עומר לקבלת הארכה לתרגיל'
      },
      {
        id: 'ml-2',
        courseId: 'c2',
        date: '2026-10-20',
        topic: 'שבוע 4: משתנים מקריים רציפים וחישוב אינטגרלים כפולים',
        summaryAcquired: true,
        recordingWatched: true,
        notes: 'הסיכום הושלם בהצלחה מטל. נותר לפתור שאלות מבחן.'
      },
      {
        id: 'ml-3',
        courseId: 'c3',
        date: '2026-10-21',
        topic: 'שבוע 4: שאילתות JOIN מורכבות ותתי שאילתות ב-SQL',
        summaryAcquired: false,
        recordingWatched: false,
        notes: 'נפתח חלון צפייה בהקלטה עד 01.11.2026'
      }
    ]
  }
];

export const initialFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    courseId: 'c1',
    topic: 'עצי AVL',
    question: 'מהו גורם האיזון (Balance Factor) החוקי בכל צומת בעץ AVL?',
    answer: 'גורם האיזון חייב להיות שייך לקבוצה {-1, 0, 1}. כל ערך אחר (כגון 2 או 2-) דורש ביצוע רוטציה מיידית לאיזון העץ.',
    masteryLevel: 2,
    lastReviewed: '2026-10-24'
  },
  {
    id: 'fc-2',
    courseId: 'c1',
    topic: 'עצי AVL',
    question: 'מתי נדרשת רוטציה כפולה (Double Rotation כגון LR או RL)?',
    answer: 'כאשר הצומת המפר אי-איזון והצומת שגרם לאי-האיזון נמצאים בכיוונים מנוגדים. למשל: תת-עץ שמאל נוטה לימין (LR) או תת-עץ ימין נוטה לשמאל (RL).',
    masteryLevel: 1,
    lastReviewed: '2026-10-25'
  },
  {
    id: 'fc-3',
    courseId: 'c2',
    topic: 'הסתברות',
    question: 'מהו משפט בייס (Bayes\' Theorem) ומתי משתמשים בו?',
    answer: 'P(A|B) = [P(B|A) * P(A)] / P(B). משתמשים בו להיפוך התניה – חישוב הסתברות בדיעבד לסיבה מסוימת בהינתן התוצאה שנצפתה.',
    masteryLevel: 2,
    lastReviewed: '2026-10-23'
  },
  {
    id: 'fc-4',
    courseId: 'c2',
    topic: 'הסתברות רציפה',
    question: 'מהי תכונת "חוסר הזיכרון" (Memoryless Property) ואיזו התפלגות רציפה מקיימת אותה?',
    answer: 'P(X > s + t | X > s) = P(X > t). ההתפלגות המעריכית (Exponential Distribution) היא ההתפלגות הרציפה היחידה בעלת תכונה זו.',
    masteryLevel: 0,
    lastReviewed: '2026-10-25'
  },
  {
    id: 'fc-5',
    courseId: 'c3',
    topic: 'SQL',
    question: 'מה ההבדל המרכזי בין WHERE לבין HAVING ב-SQL?',
    answer: 'WHERE מסנן שורות לפני ביצוע הקיבוץ (GROUP BY). HAVING מסנן קבוצות שלמות לאחר ביצוע הקיבוץ ופונקציות הצבירה (כמו COUNT, AVG).',
    masteryLevel: 2,
    lastReviewed: '2026-10-24'
  },
  {
    id: 'fc-6',
    courseId: 'c3',
    topic: 'נרמול מסדי נתונים',
    question: 'מהי הצורה הנורמלית השלישית (3NF)?',
    answer: 'טבלה נמצאת ב-3NF אם היא ב-2NF ואין בה תלות טרנזיטיבית בין שדות שאינם מפתח (כלומר שדה שאינו מפתח לא תלוי בשדה אחר שאינו מפתח).',
    masteryLevel: 1,
    lastReviewed: '2026-10-22'
  }
];
