export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  xpReward: number;
  content: string[];
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

// Mock module database with comprehensive data
const moduleDatabase: LessonModule[] = [
  {
    id: 'cardio-basics',
    system: 'Cardiovascular System',
    title: 'Heart Fundamentals',
    description: 'Master the essential concepts of cardiac anatomy and physiology.',
    icon: '🫀',
    totalXp: 200,
    unlockLevel: 1,
    estimatedTime: 75,
    previewAvailable: false,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Heart Anatomy',
        description: 'Explore the four chambers and major vessels of the heart.',
        duration: 15,
        xpReward: 25,
        content: [
          'The heart is a muscular organ that pumps blood throughout your body.',
          'It has four chambers: two atria (upper chambers) and two ventricles (lower chambers).',
          'The right side pumps blood to the lungs, while the left side pumps blood to the rest of the body.',
          'Major vessels include the aorta, pulmonary artery, and vena cava.'
        ],
        type: 'interactive',
        estimatedTime: 15,
        quiz: {
          question: 'How many chambers does the human heart have?',
          options: ['2', '3', '4', '5'],
          correct: 2,
          explanation: 'The human heart has four chambers: two atria and two ventricles.'
        }
      },
      {
        id: 'lesson-2',
        title: 'Cardiac Cycle',
        description: 'Understanding systole and diastole phases.',
        duration: 20,
        xpReward: 35,
        content: [
          'The cardiac cycle is the sequence of events that occurs in one heartbeat.',
          'It consists of two main phases: systole (contraction) and diastole (relaxation).',
          'During systole, the heart contracts and pumps blood out.',
          'During diastole, the heart relaxes and fills with blood.'
        ],
        type: 'reading',
        estimatedTime: 20,
        quiz: {
          question: 'What happens during systole?',
          options: ['Heart relaxes', 'Heart contracts', 'Blood flows in', 'Valves open'],
          correct: 1,
          explanation: 'During systole, the heart muscle contracts to pump blood out.'
        }
      },
      {
        id: 'lesson-3',
        title: 'Heart Valves',
        description: 'Function of tricuspid, pulmonary, mitral, and aortic valves.',
        duration: 18,
        xpReward: 40,
        content: [
          'Heart valves ensure one-way blood flow through the heart.',
          'The tricuspid valve controls flow between right atrium and right ventricle.',
          'The pulmonary valve controls flow from right ventricle to pulmonary artery.',
          'The mitral (bicuspid) valve controls flow between left atrium and left ventricle.',
          'The aortic valve controls flow from left ventricle to the aorta.'
        ],
        type: 'interactive',
        estimatedTime: 18
      },
      {
        id: 'lesson-4',
        title: 'Blood Pressure',
        description: 'Systolic and diastolic pressure regulation.',
        duration: 22,
        xpReward: 45,
        content: [
          'Blood pressure is the force exerted by blood against arterial walls.',
          'Systolic pressure occurs during heart contraction.',
          'Diastolic pressure occurs during heart relaxation.',
          'Normal blood pressure is essential for proper organ function.'
        ],
        type: 'reading',
        estimatedTime: 22
      }
    ]
  },
  {
    id: 'resp-fundamentals',
    system: 'Respiratory System',
    title: 'Breathing Basics',
    description: 'Essential respiratory anatomy and gas exchange principles.',
    icon: '🫁',
    totalXp: 180,
    unlockLevel: 1,
    estimatedTime: 60,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-5',
        title: 'Lung Structure',
        description: 'Anatomy of lungs, bronchi, and alveoli.',
        duration: 15,
        xpReward: 30,
        content: [
          'The lungs are paired organs located in the chest cavity.',
          'They are responsible for gas exchange between air and blood.',
          'Each lung is divided into lobes and contains millions of alveoli.',
          'The bronchial tree carries air from the trachea to alveoli.'
        ],
        type: 'reading',
        estimatedTime: 15
      },
      {
        id: 'lesson-6',
        title: 'Gas Exchange',
        description: 'Oxygen and carbon dioxide transport.',
        duration: 20,
        xpReward: 35,
        content: [
          'Gas exchange occurs in the alveoli.',
          'Oxygen enters the blood and carbon dioxide is removed.',
          'This process is driven by concentration gradients.',
          'The thin alveolar walls allow efficient gas exchange.'
        ],
        type: 'interactive',
        estimatedTime: 20
      },
      {
        id: 'lesson-7',
        title: 'Breathing Control',
        description: 'Neural control of respiration.',
        duration: 25,
        xpReward: 40,
        content: [
          'Breathing is controlled by the respiratory center in the medulla.',
          'Chemical receptors monitor CO2 and O2 levels.',
          'The phrenic nerve controls diaphragm movement.',
          'Voluntary control can override automatic breathing.'
        ],
        type: 'reading',
        estimatedTime: 25
      }
    ]
  },
  {
    id: 'renal-physiology',
    system: 'Urogenital System',
    title: 'Kidney Function',
    description: 'Filtration, reabsorption, and fluid balance.',
    icon: '💧',
    totalXp: 220,
    unlockLevel: 2,
    estimatedTime: 85,
    previewAvailable: false,
    prerequisites: ['cardio-basics'],
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'lesson-8',
        title: 'Nephron Structure',
        description: 'Functional unit of the kidney.',
        duration: 25,
        xpReward: 40,
        content: [
          'The nephron is the functional unit of the kidney.',
          'It consists of a glomerulus and renal tubule.',
          'Each kidney contains about 1 million nephrons.',
          'Nephrons filter blood and produce urine.'
        ],
        type: 'interactive',
        estimatedTime: 25
      },
      {
        id: 'lesson-9',
        title: 'Filtration Process',
        description: 'Glomerular filtration and pressure.',
        duration: 30,
        xpReward: 50,
        content: [
          'Glomerular filtration removes waste from blood.',
          'Filtration pressure drives the process.',
          'The filtration barrier prevents protein loss.',
          'GFR measures kidney function.'
        ],
        type: 'reading',
        estimatedTime: 30
      },
      {
        id: 'lesson-10',
        title: 'Reabsorption',
        description: 'Selective reabsorption in tubules.',
        duration: 30,
        xpReward: 50,
        content: [
          'The tubules reabsorb useful substances.',
          'Glucose and amino acids are completely reabsorbed.',
          'Water reabsorption is regulated by ADH.',
          'Sodium reabsorption affects blood pressure.'
        ],
        type: 'interactive',
        estimatedTime: 30
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
  },
  'renal-physiology': {
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

  const module = moduleDatabase.find(m => m.id === moduleId);
  const currentLessonIndex = module?.lessons.findIndex(lesson => lesson.id === lessonId) ?? -1;
  if (currentLessonIndex !== -1 && currentLessonIndex + 1 < (module?.lessons.length ?? 0)) {
    userProgress[moduleId].unlockedLessons = Math.max(userProgress[moduleId].unlockedLessons, currentLessonIndex + 2);
  }

  userProgress[moduleId].completedLessons += 1;
  userProgress[moduleId].earnedXp += xp;
  userProgress[moduleId].completedLessonIds = [...(userProgress[moduleId].completedLessonIds || []), lessonId];

  if (userProgress[moduleId].completedLessons >= moduleDatabase.find(m => m.id === moduleId)!.lessons.length) {
    userProgress[moduleId].completed = true;
  }

  console.log(`Updated progress for module ${moduleId}:`, userProgress[moduleId]);
};

// Function to determine the highest unlocked level
export const getUnlockedLevel = (): number => {
  return 2;
};

// Function to calculate total user XP
export const getTotalUserXp = (): number => {
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

// Function to save user progress
export const saveUserProgress = (moduleId: string, lessonIndex: number, completedLessons: number, isModuleComplete: boolean, earnedXp: number) => {
  if (!userProgress[moduleId]) {
    userProgress[moduleId] = {
      completed: false,
      completedLessons: 0,
      earnedXp: 0,
      unlockedLessons: 1,
      completedLessonIds: [],
      currentLesson: 0
    };
  }

  userProgress[moduleId].currentLesson = lessonIndex;
  userProgress[moduleId].completedLessons = completedLessons;
  userProgress[moduleId].completed = isModuleComplete;
  userProgress[moduleId].earnedXp = earnedXp;

  console.log(`Saved progress for module ${moduleId}:`, userProgress[moduleId]);
};
