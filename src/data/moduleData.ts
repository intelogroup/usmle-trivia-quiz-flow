export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  xpReward: number;
  content: string;
}

export interface LessonModule {
  id: string;
  system: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  totalXp: number;
  unlockLevel: number;
  estimatedTime: number;
  previewAvailable: boolean;
  prerequisites?: string[];
  difficulty: string;
  lessons: Lesson[];
}

// Mock module database
const moduleDatabase: LessonModule[] = [
  {
    id: 'cardio-basics',
    system: 'Cardiovascular System',
    title: 'Cardiovascular Basics',
    description: 'Understand the fundamentals of the cardiovascular system.',
    icon: '🫀',
    totalXp: 150,
    unlockLevel: 1,
    estimatedTime: 60,
    previewAvailable: false,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Anatomy of the Heart',
        description: 'Explore the structures of the heart.',
        duration: 15,
        xpReward: 25,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-2',
        title: 'Cardiac Cycle',
        description: 'Learn about the cardiac cycle.',
        duration: 20,
        xpReward: 35,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-3',
        title: 'Blood Pressure Regulation',
        description: 'Understand how blood pressure is regulated.',
        duration: 25,
        xpReward: 45,
        content: 'Lesson content goes here...'
      }
    ]
  },
  {
    id: 'resp-fundamentals',
    system: 'Respiratory System',
    title: 'Respiratory Fundamentals',
    description: 'Key concepts of the respiratory system.',
    icon: '🫁',
    totalXp: 120,
    unlockLevel: 1,
    estimatedTime: 45,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-4',
        title: 'Anatomy of the Lungs',
        description: 'Overview of lung structures.',
        duration: 15,
        xpReward: 20,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-5',
        title: 'Gas Exchange',
        description: 'The process of gas exchange in the lungs.',
        duration: 15,
        xpReward: 30,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-6',
        title: 'Breathing Mechanics',
        description: 'How we breathe.',
        duration: 15,
        xpReward: 30,
        content: 'Lesson content goes here...'
      }
    ]
  },
  {
    id: 'renal-physiology',
    system: 'Urogenital System',
    title: 'Renal Physiology',
    description: 'Explore kidney functions and fluid balance.',
    icon: '💧',
    totalXp: 180,
    unlockLevel: 2,
    estimatedTime: 70,
    previewAvailable: false,
    prerequisites: ['cardio-basics'],
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'lesson-7',
        title: 'Kidney Anatomy',
        description: 'Structures of the kidney.',
        duration: 20,
        xpReward: 30,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-8',
        title: 'Filtration Process',
        description: 'How kidneys filter blood.',
        duration: 25,
        xpReward: 40,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-9',
        title: 'Fluid Balance',
        description: 'Regulation of body fluids.',
        duration: 25,
        xpReward: 40,
        content: 'Lesson content goes here...'
      }
    ]
  },
  {
    id: 'neuro-anatomy',
    system: 'Nervous System',
    title: 'Neuroanatomy Overview',
    description: 'Basic brain and nerve structures.',
    icon: '🧠',
    totalXp: 200,
    unlockLevel: 3,
    estimatedTime: 80,
    previewAvailable: false,
    prerequisites: ['resp-fundamentals'],
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'lesson-10',
        title: 'Brain Structures',
        description: 'Main parts of the brain.',
        duration: 25,
        xpReward: 40,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-11',
        title: 'Nerve Pathways',
        description: 'How nerves transmit signals.',
        duration: 30,
        xpReward: 50,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-12',
        title: 'Spinal Cord',
        description: 'Function of the spinal cord.',
        duration: 25,
        xpReward: 40,
        content: 'Lesson content goes here...'
      }
    ]
  },
  {
    id: 'gastro-physiology',
    system: 'Digestive System',
    title: 'Gastrointestinal Physiology',
    description: 'Digestive processes and nutrient absorption.',
    icon: '🍔',
    totalXp: 220,
    unlockLevel: 4,
    estimatedTime: 90,
    previewAvailable: false,
    prerequisites: ['renal-physiology'],
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'lesson-13',
        title: 'Digestion Basics',
        description: 'Initial steps of digestion.',
        duration: 30,
        xpReward: 45,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-14',
        title: 'Nutrient Absorption',
        description: 'How nutrients are absorbed.',
        duration: 30,
        xpReward: 55,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-15',
        title: 'Waste Elimination',
        description: 'Process of waste removal.',
        duration: 30,
        xpReward: 50,
        content: 'Lesson content goes here...'
      }
    ]
  },
  {
    id: 'endo-hormones',
    system: 'Endocrine System',
    title: 'Endocrine Hormones',
    description: 'Hormone functions and regulation.',
    icon: '🧪',
    totalXp: 250,
    unlockLevel: 5,
    estimatedTime: 100,
    previewAvailable: false,
    prerequisites: ['neuro-anatomy'],
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'lesson-16',
        title: 'Hormone Types',
        description: 'Different types of hormones.',
        duration: 35,
        xpReward: 50,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-17',
        title: 'Regulation Mechanisms',
        description: 'How hormones are regulated.',
        duration: 35,
        xpReward: 60,
        content: 'Lesson content goes here...'
      },
      {
        id: 'lesson-18',
        title: 'Hormone Interactions',
        description: 'How hormones interact.',
        duration: 30,
        xpReward: 50,
        content: 'Lesson content goes here...'
      }
    ]
  }
];

// Mock user progress data with detailed lesson tracking
let userProgress = {
  'cardio-basics': {
    completed: false,
    completedLessons: 1,
    earnedXp: 25,
    unlockedLessons: 2,
    completedLessonIds: ['lesson-1']
  },
  'resp-fundamentals': {
    completed: false,
    completedLessons: 0,
    earnedXp: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  }
};

// Function to retrieve user progress from local storage (or initialize)
export const getUserProgress = () => {
  // For simplicity, using a mock. In real app, use local storage.
  return userProgress;
};

// Function to update user progress (e.g., when a lesson is completed)
export const updateUserProgress = (moduleId: string, lessonId: string, xp: number) => {
  if (!userProgress[moduleId]) {
    userProgress[moduleId] = {
      completed: false,
      completedLessons: 0,
      earnedXp: 0,
      unlockedLessons: 1,
      completedLessonIds: []
    };
  }

  // Unlock next lesson
  const module = moduleDatabase.find(m => m.id === moduleId);
  const currentLessonIndex = module?.lessons.findIndex(lesson => lesson.id === lessonId) ?? -1;
  if (currentLessonIndex !== -1 && currentLessonIndex + 1 < (module?.lessons.length ?? 0)) {
    userProgress[moduleId].unlockedLessons = Math.max(userProgress[moduleId].unlockedLessons, currentLessonIndex + 2);
  }

  userProgress[moduleId].completedLessons += 1;
  userProgress[moduleId].earnedXp += xp;
  userProgress[moduleId].completedLessonIds = [...(userProgress[moduleId].completedLessonIds || []), lessonId];

  // Check if module is completed
  if (userProgress[moduleId].completedLessons >= moduleDatabase.find(m => m.id === moduleId)!.lessons.length) {
    userProgress[moduleId].completed = true;
  }

  console.log(`Updated progress for module ${moduleId}:`, userProgress[moduleId]);
};

// Function to determine the highest unlocked level
export const getUnlockedLevel = (): number => {
  // Logic to determine unlocked level based on user progress
  // This is a placeholder; implement actual logic
  return 2;
};

// Function to calculate total user XP
export const getTotalUserXp = (): number => {
  // Logic to calculate total XP from all modules
  let totalXp = 0;
  for (const moduleId in userProgress) {
    totalXp += userProgress[moduleId].earnedXp || 0;
  }
  return totalXp;
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
