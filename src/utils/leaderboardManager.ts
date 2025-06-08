
import { LeaderboardEntry } from "./types";
import { setLeaderboardInitializer } from "./dataManager";

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
  // Get user profile directly from localStorage to avoid circular dependency
  const profileData = localStorage.getItem('medquiz_user_profile');
  const userProfile = profileData ? JSON.parse(profileData) : {
    name: 'jim kali',
    avatar: 'JK'
  };
  
  // Get basic user progress from localStorage directly to avoid circular import
  const progressData = localStorage.getItem('medquiz_progress');
  const userProgress = progressData ? JSON.parse(progressData) : {
    totalCorrect: 0,
    currentStreak: 0,
    averageScore: 0
  };
  
  const userPoints = Math.max(userProgress.totalCorrect * 100 + userProgress.currentStreak * 50, 500);
  
  const mockUsers = [
    { 
      name: "DrBrainiac", 
      fullName: "Dr. Sarah Johnson", 
      basePoints: 9850, 
      streak: 15, 
      accuracy: 94, 
      country: "US", 
      university: "Harvard Medical School", 
      year: "4th",
      bio: "Passionate about neurology and helping fellow students succeed."
    },
    { 
      name: "MedStudent2023", 
      fullName: "Alex Chen", 
      basePoints: 9720, 
      streak: 12, 
      accuracy: 91, 
      country: "CA", 
      university: "University of Toronto", 
      year: "3rd",
      bio: "Future surgeon with a love for anatomy and precision."
    },
    { 
      name: "USMLEMaster", 
      fullName: "Priya Patel", 
      basePoints: 9580, 
      streak: 8, 
      accuracy: 89, 
      country: "IN", 
      university: "AIIMS New Delhi", 
      year: "4th",
      bio: "Preparing for USMLE while maintaining top grades."
    },
    { 
      name: "FutureMD", 
      fullName: "James Wilson", 
      basePoints: 9350, 
      streak: 6, 
      accuracy: 87, 
      country: "UK", 
      university: "Oxford University", 
      year: "2nd",
      bio: "Aspiring pediatrician dedicated to continuous learning."
    },
    { 
      name: "PathologyPro", 
      fullName: "Maria Rodriguez", 
      basePoints: 9200, 
      streak: 10, 
      accuracy: 85, 
      country: "MX", 
      university: "UNAM", 
      year: "3rd",
      bio: "Fascinated by pathology and diagnostic medicine."
    },
    { 
      name: "AnatomyAce", 
      fullName: "David Kim", 
      basePoints: 9050, 
      streak: 4, 
      accuracy: 83, 
      country: "KR", 
      university: "Seoul National University", 
      year: "1st",
      bio: "First-year student with exceptional anatomy knowledge."
    },
  ];

  const allEntries = [
    ...mockUsers.map((user, index) => ({
      name: user.name,
      fullName: user.fullName,
      points: user.basePoints + Math.floor(Math.random() * 200),
      avatar: user.name.substring(0, 2).toUpperCase(),
      country: user.country,
      streak: user.streak,
      accuracy: user.accuracy,
      isCurrentUser: false,
      dateJoined: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      university: user.university,
      year: user.year,
      totalStudyTime: Math.floor(Math.random() * 500) + 100,
      strongestSubjects: [
        { subject: "Anatomy", score: Math.floor(Math.random() * 20) + 80 },
        { subject: "Physiology", score: Math.floor(Math.random() * 20) + 75 },
        { subject: "Pathology", score: Math.floor(Math.random() * 20) + 70 }
      ],
      weakestSubjects: [
        { subject: "Pharmacology", score: Math.floor(Math.random() * 30) + 50 },
        { subject: "Microbiology", score: Math.floor(Math.random() * 30) + 45 }
      ],
      achievements: Math.floor(Math.random() * 10) + 5,
      bio: user.bio
    })),
    {
      name: userProfile.name,
      fullName: "Jim Kali",
      points: userPoints,
      avatar: userProfile.avatar,
      country: "US",
      streak: userProgress.currentStreak,
      accuracy: userProgress.averageScore,
      isCurrentUser: true,
      dateJoined: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      university: "Local Medical School",
      year: "2nd",
      totalStudyTime: 250,
      strongestSubjects: [
        { subject: "Anatomy", score: 78 },
        { subject: "Physiology", score: 82 },
        { subject: "Pathology", score: 75 }
      ],
      weakestSubjects: [
        { subject: "Pharmacology", score: 65 },
        { subject: "Microbiology", score: 60 }
      ],
      achievements: 8,
      bio: "Medical student focused on improving knowledge through consistent practice."
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
