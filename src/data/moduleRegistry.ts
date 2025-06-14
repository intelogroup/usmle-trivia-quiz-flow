
import { LessonModule } from './types';
import { physiologyModules } from './modules/physiologyModules';
import { cellBiologyModules } from './modules/cellBiologyModules';
import { biochemistryModules } from './modules/biochemistryModules';
import { systemModules } from './modules/systemModules';
import { anatomyModules } from './modules/anatomyModules';

// Combined module database
const moduleDatabase: LessonModule[] = [
  ...physiologyModules,
  ...cellBiologyModules,
  ...biochemistryModules,
  ...systemModules,
  ...anatomyModules
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
  console.log(`Looking for modules in system: "${system}"`);
  console.log('Available modules:', moduleDatabase.map(m => ({ id: m.id, system: m.system, title: m.title })));
  
  // Handle special case for module-selection screen
  if (system === 'module-selection') {
    return moduleDatabase;
  }
  
  const filteredModules = moduleDatabase.filter(module => module.system === system);
  console.log(`Found ${filteredModules.length} modules for system "${system}"`);
  return filteredModules;
};

export const getModuleById = (moduleId: string): LessonModule | null => {
  console.log(`Looking for module with ID: "${moduleId}"`);
  const module = moduleDatabase.find(module => module.id === moduleId);
  if (!module) {
    console.log('Available module IDs:', moduleDatabase.map(m => m.id));
  }
  return module || null;
};

export const getAllModules = (): LessonModule[] => {
  return moduleDatabase;
};

// Re-export user progress functions
export { getUserProgress, updateUserProgress, saveUserProgress } from './userProgress';
