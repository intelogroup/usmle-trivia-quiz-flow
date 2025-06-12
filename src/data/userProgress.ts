
import { UserProgressData } from './types';

// Mock user progress data with detailed lesson tracking
let userProgress: UserProgressData = {
  'cardio-basics': {
    completed: false,
    completedLessons: 1,
    earnedPoints: 40,
    unlockedLessons: 2,
    completedLessonIds: ['lesson-1']
  },
  'resp-fundamentals': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'renal-physiology': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'nervous-system': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'digestive-system': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'intro-physiology': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'cell-biology-genetics': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'medical-biochemistry': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  }
};

// Function to retrieve user progress from local storage (or initialize)
export const getUserProgress = (): UserProgressData => {
  return userProgress;
};

// Function to update user progress (e.g., when a lesson is completed)
export const updateUserProgress = (moduleId: string, lessonId: string, points: number) => {
  if (!userProgress[moduleId]) {
    userProgress[moduleId] = {
      completed: false,
      completedLessons: 0,
      earnedPoints: 0,
      unlockedLessons: 1,
      completedLessonIds: []
    };
  }

  const module = getAllModules().find(m => m.id === moduleId);
  const currentLessonIndex = module?.lessons.findIndex(lesson => lesson.id === lessonId) ?? -1;
  if (currentLessonIndex !== -1 && currentLessonIndex + 1 < (module?.lessons.length ?? 0)) {
    userProgress[moduleId].unlockedLessons = Math.max(userProgress[moduleId].unlockedLessons, currentLessonIndex + 2);
  }

  userProgress[moduleId].completedLessons += 1;
  userProgress[moduleId].earnedPoints += points;
  userProgress[moduleId].completedLessonIds = [...(userProgress[moduleId].completedLessonIds || []), lessonId];

  if (userProgress[moduleId].completedLessons >= (module?.lessons.length ?? 0)) {
    userProgress[moduleId].completed = true;
  }

  console.log(`Updated progress for module ${moduleId}:`, userProgress[moduleId]);
};

// Function to save user progress
export const saveUserProgress = (moduleId: string, lessonIndex: number, completedLessons: number, isModuleComplete: boolean, earnedPoints: number) => {
  if (!userProgress[moduleId]) {
    userProgress[moduleId] = {
      completed: false,
      completedLessons: 0,
      earnedPoints: 0,
      unlockedLessons: 1,
      completedLessonIds: [],
      currentLesson: 0
    };
  }

  userProgress[moduleId].currentLesson = lessonIndex;
  userProgress[moduleId].completedLessons = completedLessons;
  userProgress[moduleId].completed = isModuleComplete;
  userProgress[moduleId].earnedPoints = earnedPoints;

  console.log(`Saved progress for module ${moduleId}:`, userProgress[moduleId]);
};

// Import function to get all modules (will be defined in moduleRegistry.ts)
import { getAllModules } from './moduleRegistry';
