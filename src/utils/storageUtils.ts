
import { QuizConfig } from "@/components/QuizConfigurationScreen";
import { getUserProfile, updateUserProfile, getAchievements, updateAchievements, getSubjectStats, updateSubjectStats, generateMockLeaderboard } from "./dataStore";

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
    const updatedHistory = [result, ...existingHistory].slice(0, 50);
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(updatedHistory));
    updateUserProgress(result);
    updateStreakAndProfile(result);
    checkAndUnlockAchievements(result);
    updateSubjectStatistics(result);
    generateMockLeaderboard(); // Regenerate leaderboard with new data
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
    
    localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to update user progress:', error);
  }
};

const updateStreakAndProfile = (result: QuizResult): void => {
  const userProfile = getUserProfile();
  const today = new Date().toDateString();
  const lastQuizDate = new Date(result.date).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  let newStreak = userProfile.studyStreak;
  
  if (today === lastQuizDate) {
    if (userProfile.lastStudyDate === yesterday) {
      newStreak += 1;
    } else if (userProfile.lastStudyDate !== today) {
      newStreak = 1;
    }
  }
  
  // Update user progress streak too
  const progress = getUserProgress();
  progress.currentStreak = newStreak;
  localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(progress));
  
  updateUserProfile({
    studyStreak: newStreak,
    lastStudyDate: today,
    totalXP: userProfile.totalXP + (result.score * 10) + (newStreak * 5)
  });
};

const checkAndUnlockAchievements = (result: QuizResult): void => {
  const achievements = getAchievements();
  const progress = getUserProgress();
  let updated = false;

  achievements.forEach(achievement => {
    if (!achievement.unlocked) {
      switch (achievement.id) {
        case 'first_quiz':
          if (progress.totalQuizzes >= 1) {
            achievement.unlocked = true;
            achievement.unlockedDate = new Date().toISOString();
            achievement.progress = 1;
            updated = true;
          }
          break;
        case 'study_streak':
          const userProfile = getUserProfile();
          achievement.progress = userProfile.studyStreak;
          if (userProfile.studyStreak >= 7) {
            achievement.unlocked = true;
            achievement.unlockedDate = new Date().toISOString();
            updated = true;
          }
          break;
        case 'perfect_score':
          const percentage = (result.score / result.totalQuestions) * 100;
          if (percentage === 100) {
            achievement.unlocked = true;
            achievement.unlockedDate = new Date().toISOString();
            achievement.progress = 1;
            updated = true;
          }
          break;
        case 'knowledge_seeker':
          achievement.progress = progress.totalQuizzes;
          if (progress.totalQuizzes >= 10) {
            achievement.unlocked = true;
            achievement.unlockedDate = new Date().toISOString();
            updated = true;
          }
          break;
      }
    }
  });

  if (updated) {
    updateAchievements(achievements);
  }
};

const updateSubjectStatistics = (result: QuizResult): void => {
  const stats = getSubjectStats();
  
  result.config.subjects.forEach(subject => {
    const stat = stats.find(s => s.subject === subject);
    if (stat) {
      const oldAverage = stat.averageScore;
      stat.totalQuestions += result.totalQuestions;
      stat.correctAnswers += result.score;
      stat.averageScore = Math.round((stat.correctAnswers / stat.totalQuestions) * 100);
      stat.lastPracticed = result.date;
      stat.improvement = stat.averageScore - oldAverage;
    }
  });
  
  updateSubjectStats(stats);
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
