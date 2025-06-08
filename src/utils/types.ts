
export interface QuizResult {
  id: string;
  name: string;
  config: QuizConfig;
  score: number;
  totalQuestions: number;
  answers: (number | null)[];
  correctAnswers: number[];
  questions: any[];
  startTime: string;
  endTime: string;
  duration: string;
  date: string;
}

export interface UserProgress {
  totalQuizzes: number;
  totalQuestions: number;
  totalCorrect: number;
  averageScore: number;
  subjectProgress: { [key: string]: { correct: number; total: number } };
  systemProgress: { [key: string]: { correct: number; total: number } };
  lastQuizDate: string;
  currentStreak: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  totalXP: number;
  joinDate: string;
  studyStreak: number;
  lastStudyDate: string;
  weeklyGoal: number;
  rank: number; // Added missing rank property
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    soundEffects: boolean;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
}

export interface WeeklyActivity {
  date: string;
  quizzesTaken: number;
  averageScore: number;
  studyTime: number; // in minutes
}

export interface SubjectStats {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  averageScore: number;
  lastPracticed: string;
  improvement: number; // percentage change from last week
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  streak: number;
  accuracy: number;
  isCurrentUser?: boolean;
}

// Import QuizConfig type
import { QuizConfig } from "@/components/QuizConfigurationScreen";
