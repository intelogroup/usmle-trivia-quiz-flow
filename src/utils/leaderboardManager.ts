
import { LeaderboardEntry } from "./types";
import { getUserProfile, setLeaderboardInitializer } from "./dataManager";

const LEADERBOARD_KEY = 'medquiz_leaderboard';

export const initializeLeaderboard = () => {
  if (!localStorage.getItem(LEADERBOARD_KEY)) {
    generateMockLeaderboard();
  }
};

// Set the initializer function in dataManager
setLeaderboardInitializer(initializeLeaderboard);

// Generate mock leaderboard with current user
export const generateMockLeaderboard = () => {
  const userProfile = getUserProfile();
  
  // Get basic user progress from localStorage directly to avoid circular import
  const progressData = localStorage.getItem('medquiz_progress');
  const userProgress = progressData ? JSON.parse(progressData) : {
    totalCorrect: 0,
    currentStreak: 0,
    averageScore: 0
  };
  
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

export const getLeaderboard = (): LeaderboardEntry[] => {
  const leaderboard = localStorage.getItem(LEADERBOARD_KEY);
  return leaderboard ? JSON.parse(leaderboard) : generateMockLeaderboard();
};
