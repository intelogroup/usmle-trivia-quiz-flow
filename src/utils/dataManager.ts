
import { UserProfile, Achievement, WeeklyActivity, SubjectStats } from "./types";

const USER_PROFILE_KEY = 'medquiz_user_profile';
const ACHIEVEMENTS_KEY = 'medquiz_achievements';
const WEEKLY_ACTIVITY_KEY = 'medquiz_weekly_activity';
const SUBJECT_STATS_KEY = 'medquiz_subject_stats';

// Forward declaration to avoid circular import
let initializeLeaderboard: (() => void) | null = null;

// Initialize default data
export const initializeDefaultData = () => {
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

  // Initialize leaderboard if function is available
  if (initializeLeaderboard) {
    initializeLeaderboard();
  }
};

// Function to set the leaderboard initializer (called from leaderboardManager)
export const setLeaderboardInitializer = (fn: () => void) => {
  initializeLeaderboard = fn;
};

// Getter functions
export const getUserProfile = (): UserProfile => {
  initializeDefaultData();
  const profile = localStorage.getItem(USER_PROFILE_KEY);
  return profile ? JSON.parse(profile) : null;
};

export const getAchievements = (): Achievement[] => {
  initializeDefaultData();
  const achievements = localStorage.getItem(ACHIEVEMENTS_KEY);
  return achievements ? JSON.parse(achievements) : [];
};

export const getWeeklyActivity = (): WeeklyActivity[] => {
  initializeDefaultData();
  const activity = localStorage.getItem(WEEKLY_ACTIVITY_KEY);
  return activity ? JSON.parse(activity) : [];
};

export const getSubjectStats = (): SubjectStats[] => {
  initializeDefaultData();
  const stats = localStorage.getItem(SUBJECT_STATS_KEY);
  return stats ? JSON.parse(stats) : [];
};

// Initialize on import
initializeDefaultData();
