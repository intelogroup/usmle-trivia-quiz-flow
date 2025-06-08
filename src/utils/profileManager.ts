
import { UserProfile, Achievement, SubjectStats } from "./types";
import { getUserProfile } from "./dataManager";

const USER_PROFILE_KEY = 'medquiz_user_profile';
const ACHIEVEMENTS_KEY = 'medquiz_achievements';
const SUBJECT_STATS_KEY = 'medquiz_subject_stats';

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
