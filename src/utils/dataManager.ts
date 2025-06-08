
import { UserProfile, Achievement, WeeklyActivity, SubjectStats } from "./types";

const USER_PROFILE_KEY = 'medquiz_user_profile';
const ACHIEVEMENTS_KEY = 'medquiz_achievements';
const WEEKLY_ACTIVITY_KEY = 'medquiz_weekly_activity';
const SUBJECT_STATS_KEY = 'medquiz_subject_stats';

// Forward declaration to avoid circular import
let initializeLeaderboard: (() => void) | null = null;
let isInitializing = false; // Flag to prevent circular initialization

// Initialize default data
export const initializeDefaultData = () => {
  // Prevent circular initialization
  if (isInitializing) return;
  isInitializing = true;

  try {
    if (!localStorage.getItem(USER_PROFILE_KEY)) {
      const defaultProfile: UserProfile = {
        id: 'user_001',
        name: 'jim kali',
        avatar: 'JK',
        level: 1,
        totalXP: 0,
        joinDate: new Date().toISOString(),
        studyStreak: 0,
        lastStudyDate: '',
        weeklyGoal: 5,
        preferences: {
          notifications: true,
          darkMode: true,
          soundEffects: false
        }
      };
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(defaultProfile));
    }

    if (!localStorage.getItem(ACHIEVEMENTS_KEY)) {
      const defaultAchievements: Achievement[] = [
        { id: 'first_quiz', title: 'First Quiz', description: 'Completed your first quiz', icon: '🏆', unlocked: false, progress: 0, maxProgress: 1 },
        { id: 'study_streak', title: 'Study Streak', description: '7 days in a row', icon: '🔥', unlocked: false, progress: 0, maxProgress: 7 },
        { id: 'perfect_score', title: 'Perfect Score', description: '100% on a quiz', icon: '🎯', unlocked: false, progress: 0, maxProgress: 1 },
        { id: 'knowledge_seeker', title: 'Knowledge Seeker', description: 'Completed 10 quizzes', icon: '📚', unlocked: false, progress: 0, maxProgress: 10 }
      ];
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(defaultAchievements));
    }

    if (!localStorage.getItem(WEEKLY_ACTIVITY_KEY)) {
      const defaultActivity: WeeklyActivity[] = [];
      localStorage.setItem(WEEKLY_ACTIVITY_KEY, JSON.stringify(defaultActivity));
    }

    if (!localStorage.getItem(SUBJECT_STATS_KEY)) {
      const defaultStats: SubjectStats[] = [
        { subject: 'Anatomy', totalQuestions: 0, correctAnswers: 0, averageScore: 0, lastPracticed: '', improvement: 0 },
        { subject: 'Physiology', totalQuestions: 0, correctAnswers: 0, averageScore: 0, lastPracticed: '', improvement: 0 },
        { subject: 'Pathology', totalQuestions: 0, correctAnswers: 0, averageScore: 0, lastPracticed: '', improvement: 0 },
        { subject: 'Pharmacology', totalQuestions: 0, correctAnswers: 0, averageScore: 0, lastPracticed: '', improvement: 0 },
        { subject: 'Microbiology', totalQuestions: 0, correctAnswers: 0, averageScore: 0, lastPracticed: '', improvement: 0 },
        { subject: 'Immunology', totalQuestions: 0, correctAnswers: 0, averageScore: 0, lastPracticed: '', improvement: 0 }
      ];
      localStorage.setItem(SUBJECT_STATS_KEY, JSON.stringify(defaultStats));
    }
  } finally {
    isInitializing = false;
  }

  // Initialize leaderboard after basic data is set up
  if (initializeLeaderboard) {
    initializeLeaderboard();
  }
};

// Function to set the leaderboard initializer (called from leaderboardManager)
export const setLeaderboardInitializer = (fn: () => void) => {
  initializeLeaderboard = fn;
};

// Getter functions - only initialize if data doesn't exist
export const getUserProfile = (): UserProfile => {
  let profile = localStorage.getItem(USER_PROFILE_KEY);
  if (!profile) {
    initializeDefaultData();
    profile = localStorage.getItem(USER_PROFILE_KEY);
  }
  return profile ? JSON.parse(profile) : null;
};

export const getAchievements = (): Achievement[] => {
  let achievements = localStorage.getItem(ACHIEVEMENTS_KEY);
  if (!achievements) {
    initializeDefaultData();
    achievements = localStorage.getItem(ACHIEVEMENTS_KEY);
  }
  return achievements ? JSON.parse(achievements) : [];
};

export const getWeeklyActivity = (): WeeklyActivity[] => {
  let activity = localStorage.getItem(WEEKLY_ACTIVITY_KEY);
  if (!activity) {
    initializeDefaultData();
    activity = localStorage.getItem(WEEKLY_ACTIVITY_KEY);
  }
  return activity ? JSON.parse(activity) : [];
};

export const getSubjectStats = (): SubjectStats[] => {
  let stats = localStorage.getItem(SUBJECT_STATS_KEY);
  if (!stats) {
    initializeDefaultData();
    stats = localStorage.getItem(SUBJECT_STATS_KEY);
  }
  return stats ? JSON.parse(stats) : [];
};

// Initialize on import, but only if no data exists
if (!localStorage.getItem(USER_PROFILE_KEY)) {
  initializeDefaultData();
}
