
import { LessonModule } from './types';
import { physiologyModules } from './modules/physiologyModules';
import { cellBiologyModules } from './modules/cellBiologyModules';
import { biochemistryModules } from './modules/biochemistryModules';
import { systemModules } from './modules/systemModules';

// Combined module database
const moduleDatabase: LessonModule[] = [
  ...physiologyModules,
  ...cellBiologyModules,
  ...biochemistryModules,
  ...systemModules
];

// Function to determine the highest unlocked level
export const getUnlockedLevel = (): number => {
  return 2;
};

// Function to calculate total user points
export const getTotalUserPoints = (): number => {
  const { getUserProgress } = require('./userProgress');
  const userProgress = getUserProgress();
  let totalPoints = 0;
  for (const moduleId in userProgress) {
    totalPoints += userProgress[moduleId].earnedPoints || 0;
  }
  return totalPoints;
};

export const getModulesBySystem = (system: string): LessonModule[] => {
  return moduleDatabase.filter(module => module.system === system);
};

export const getModuleById = (moduleId: string): LessonModule | null => {
  return moduleDatabase.find(module => module.id === moduleId) || null;
};

export const getAllModules = (): LessonModule[] => {
  return moduleDatabase;
};

// Re-export user progress functions
export { getUserProgress, updateUserProgress, saveUserProgress } from './userProgress';
