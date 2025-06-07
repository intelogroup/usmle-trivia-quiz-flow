
import { QuizConfig } from "@/components/QuizConfigurationScreen";

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

const QUIZ_HISTORY_KEY = 'medquiz_history';
const USER_PROGRESS_KEY = 'medquiz_progress';

export const saveQuizResult = (result: QuizResult): void => {
  try {
    const existingHistory = getQuizHistory();
    const updatedHistory = [result, ...existingHistory].slice(0, 50); // Keep last 50 quizzes
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(updatedHistory));
    updateUserProgress(result);
  } catch (error) {
    console.error('Failed to save quiz result:', error);
  }
};

export const getQuizHistory = (): QuizResult[] => {
  try {
    const history = localStorage.getItem(QUIZ_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to get quiz history:', error);
    return [];
  }
};

export const getRecentQuizzes = (limit: number = 3): QuizResult[] => {
  return getQuizHistory().slice(0, limit);
};

export const getUserProgress = (): UserProgress => {
  try {
    const progress = localStorage.getItem(USER_PROGRESS_KEY);
    return progress ? JSON.parse(progress) : {
      totalQuizzes: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      averageScore: 0,
      subjectProgress: {},
      systemProgress: {},
      lastQuizDate: '',
      currentStreak: 0
    };
  } catch (error) {
    console.error('Failed to get user progress:', error);
    return {
      totalQuizzes: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      averageScore: 0,
      subjectProgress: {},
      systemProgress: {},
      lastQuizDate: '',
      currentStreak: 0
    };
  }
};

const updateUserProgress = (result: QuizResult): void => {
  try {
    const progress = getUserProgress();
    
    progress.totalQuizzes += 1;
    progress.totalQuestions += result.totalQuestions;
    progress.totalCorrect += result.score;
    progress.averageScore = Math.round((progress.totalCorrect / progress.totalQuestions) * 100);
    progress.lastQuizDate = result.date;
    
    // Update subject progress
    result.config.subjects.forEach(subject => {
      if (!progress.subjectProgress[subject]) {
        progress.subjectProgress[subject] = { correct: 0, total: 0 };
      }
      progress.subjectProgress[subject].total += result.totalQuestions;
      progress.subjectProgress[subject].correct += result.score;
    });
    
    // Update system progress
    result.config.systems.forEach(system => {
      if (!progress.systemProgress[system]) {
        progress.systemProgress[system] = { correct: 0, total: 0 };
      }
      progress.systemProgress[system].total += result.totalQuestions;
      progress.systemProgress[system].correct += result.score;
    });
    
    // Update streak
    const today = new Date().toDateString();
    const lastQuizDate = new Date(result.date).toDateString();
    if (today === lastQuizDate) {
      progress.currentStreak += 1;
    }
    
    localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to update user progress:', error);
  }
};

export const generateQuizName = (config: QuizConfig): string => {
  if (config.subjects.length === 1 && config.systems.length === 1) {
    return `${config.subjects[0]} - ${config.systems[0].split(' ')[0]}`;
  } else if (config.subjects.length === 1) {
    return `${config.subjects[0]} Focus`;
  } else if (config.systems.length === 1) {
    return `${config.systems[0].split(' ')[0]} Study`;
  } else {
    return 'Custom Quiz';
  }
};
