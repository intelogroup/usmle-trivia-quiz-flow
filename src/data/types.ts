
import React from 'react';

export interface LessonStep {
  id: string;
  system: string;
  subject: string;
  sentence: string;
  blanks: Array<{
    id: number;
    choices: string[];
    correct: number;
    explanation: string;
  }>;
  image?: string;
  imageDescription?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  pointsReward: number;
  content?: string[];
  type?: 'reading' | 'interactive';
  estimatedTime?: number;
  image?: string;
  imageDescription?: string;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
  system?: string;
  subject?: string;
  steps?: LessonStep[];
}

export interface LessonModule {
  id: string;
  system: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  totalPoints: number;
  unlockLevel: number;
  estimatedTime: number;
  previewAvailable: boolean;
  prerequisites?: string[];
  difficulty: string;
  lessons: Lesson[];
}

export interface UserModuleProgress {
  completed: boolean;
  completedLessons: number;
  earnedPoints: number;
  unlockedLessons: number;
  completedLessonIds: string[];
  currentLesson?: number;
}

export type UserProgressData = { [moduleId: string]: UserModuleProgress };
