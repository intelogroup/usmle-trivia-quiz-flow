
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

const USER_PROFILE_KEY = 'medquiz_user_profile';
const ACHIEVEMENTS_KEY = 'medquiz_achievements';
const WEEKLY_ACTIVITY_KEY = 'medquiz_weekly_activity';
const SUBJECT_STATS_KEY = 'medquiz_subject_stats';
const LEADERBOARD_KEY = 'medquiz_leaderboard';

// Initialize default data
const initializeDefaultData = () => {
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

  if (!localStorage.getItem(LEADERBOARD_KEY)) {
    generateMockLeaderboard();
  }
};

// Generate mock leaderboard with current user
const generateMockLeaderboard = () => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  
  const userPoints = Math.max(userProgress.totalCorrect * 100 + userProgress.currentStreak * 50, 500);
  
  const mockUsers = [
    { name: "DrBrainiac", basePoints: 9850, streak: 15, accuracy: 94 },
    { name: "MedStudent2023", basePoints: 9720, streak: 12, accuracy: 91 },
    { name: "USMLEMaster", basePoints: 9580, streak: 8, accuracy: 89 },
    { name: "FutureMD", basePoints: 9350, streak: 6, accuracy: 87 },
    { name: "PathologyPro", basePoints: 9200, streak: 10, accuracy: 85 },
    { name: "AnatomyAce", basePoints: 9050, streak: 4, accuracy: 83 },
  ];

  const allEntries = [
    ...mockUsers.map((user, index) => ({
      name: user.name,
      points: user.basePoints + Math.floor(Math.random() * 200),
      avatar: user.name.substring(0, 2).toUpperCase(),
      streak: user.streak,
      accuracy: user.accuracy,
      isCurrentUser: false
    })),
    {
      name: userProfile.name,
      points: userPoints,
      avatar: userProfile.avatar,
      streak: userProgress.currentStreak,
      accuracy: userProgress.averageScore,
      isCurrentUser: true
    }
  ].sort((a, b) => b.points - a.points);

  const leaderboard: LeaderboardEntry[] = allEntries.map((entry, index) => ({
    rank: index + 1,
    ...entry
  }));

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
  return leaderboard;
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

export const getLeaderboard = (): LeaderboardEntry[] => {
  initializeDefaultData();
  const leaderboard = localStorage.getItem(LEADERBOARD_KEY);
  return leaderboard ? JSON.parse(leaderboard) : generateMockLeaderboard();
};

// Update functions
export const updateUserProfile = (updates: Partial<UserProfile>): void => {
  const currentProfile = getUserProfile();
  const updatedProfile = { ...currentProfile, ...updates };
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updatedProfile));
};

export const updateAchievements = (achievements: Achievement[]): void => {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
};

export const updateSubjectStats = (stats: SubjectStats[]): void => {
  localStorage.setItem(SUBJECT_STATS_KEY, JSON.stringify(stats));
};

// Calculate dynamic stats
export const calculateWeeklyProgress = () => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const today = new Date();
  const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  
  const thisWeekQuizzes = getQuizHistory().filter(quiz => {
    const quizDate = new Date(quiz.date);
    return quizDate >= weekStart;
  });

  return {
    completed: thisWeekQuizzes.length,
    goal: userProfile.weeklyGoal,
    percentage: Math.min((thisWeekQuizzes.length / userProfile.weeklyGoal) * 100, 100)
  };
};

export const getWeakestSubjects = (): { subject: string; score: number; description: string }[] => {
  const stats = getSubjectStats();
  return stats
    .filter(stat => stat.totalQuestions > 0)
    .map(stat => ({
      subject: stat.subject,
      score: stat.averageScore,
      description: stat.averageScore < 70 ? 'Needs focus' : 'Room for improvement'
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);
};

// Initialize on import
initializeDefaultData();
