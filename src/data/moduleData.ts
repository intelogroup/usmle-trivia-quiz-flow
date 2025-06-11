
export interface ModuleLesson {
  id: string;
  title: string;
  description: string;
  content: string[];
  estimatedTime: number;
  image?: string;
  imageDescription?: string;
  type: 'text' | 'interactive';
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  system: string;
  subject: string;
  level: number;
  unlockLevel: number;
  lessons: ModuleLesson[];
  estimatedTime: number;
  previewAvailable: boolean;
  icon: string;
}

export const moduleData: LessonModule[] = [
  {
    id: 'cardio-basics',
    title: 'Heart Fundamentals',
    description: 'Learn the basic structure and function of the heart',
    system: 'Cardiovascular System',
    subject: 'Anatomy',
    level: 1,
    unlockLevel: 0,
    previewAvailable: true,
    icon: '🫀',
    estimatedTime: 15,
    lessons: [
      {
        id: 'heart-chambers',
        title: 'Heart Chambers',
        description: 'Understanding the four chambers of the heart',
        content: [
          'The human heart consists of four chambers that work together to pump blood throughout the body.',
          'The upper chambers are called atria (singular: atrium) and receive blood returning to the heart.',
          'The lower chambers are called ventricles and pump blood away from the heart.',
          'The right atrium receives deoxygenated blood from the body, while the left atrium receives oxygenated blood from the lungs.',
          'The right ventricle pumps blood to the lungs, and the left ventricle pumps blood to the rest of the body.'
        ],
        estimatedTime: 5,
        type: 'text',
        image: '/placeholder.svg',
        imageDescription: 'Anatomical diagram showing the four chambers of the heart'
      },
      {
        id: 'heart-valves',
        title: 'Heart Valves',
        description: 'Learn about the valves that control blood flow',
        content: [
          'Heart valves ensure blood flows in the correct direction through the heart.',
          'There are four main valves: tricuspid, pulmonary, mitral (bicuspid), and aortic.',
          'The tricuspid valve controls flow between the right atrium and right ventricle.',
          'The pulmonary valve controls flow from the right ventricle to the pulmonary artery.'
        ],
        estimatedTime: 5,
        type: 'interactive',
        quiz: {
          question: 'Which valve controls blood flow from the left ventricle to the aorta?',
          options: ['Tricuspid valve', 'Pulmonary valve', 'Mitral valve', 'Aortic valve'],
          correct: 3,
          explanation: 'The aortic valve sits between the left ventricle and aorta, preventing backflow of blood.'
        }
      },
      {
        id: 'blood-circulation',
        title: 'Blood Circulation Pathways',
        description: 'Understanding pulmonary and systemic circulation',
        content: [
          'The heart pumps blood through two main circulation pathways.',
          'Pulmonary circulation carries blood between the heart and lungs for gas exchange.',
          'Systemic circulation carries blood between the heart and the rest of the body.',
          'The right side of the heart handles pulmonary circulation, while the left side handles systemic circulation.'
        ],
        estimatedTime: 5,
        type: 'text'
      }
    ]
  },
  {
    id: 'cardio-advanced',
    title: 'Cardiac Physiology',
    description: 'Explore how the heart functions at a physiological level',
    system: 'Cardiovascular System',
    subject: 'Physiology',
    level: 2,
    unlockLevel: 1,
    previewAvailable: true,
    icon: '⚡',
    estimatedTime: 20,
    lessons: [
      {
        id: 'cardiac-cycle',
        title: 'The Cardiac Cycle',
        description: 'Understanding systole and diastole',
        content: [
          'The cardiac cycle consists of all events that occur during one heartbeat.',
          'Systole is the contraction phase when the heart pumps blood out.',
          'Diastole is the relaxation phase when the heart fills with blood.',
          'The cycle includes atrial systole, ventricular systole, and complete diastole.'
        ],
        estimatedTime: 7,
        type: 'interactive',
        image: '/placeholder.svg',
        imageDescription: 'Diagram showing the phases of the cardiac cycle',
        quiz: {
          question: 'During which phase does the heart fill with blood?',
          options: ['Systole', 'Diastole', 'Atrial contraction', 'Ventricular contraction'],
          correct: 1,
          explanation: 'Diastole is the relaxation phase when the heart chambers fill with blood.'
        }
      }
    ]
  },
  {
    id: 'respir-basics',
    title: 'Respiratory Fundamentals',
    description: 'Learn the basics of the respiratory system',
    system: 'Respiratory System',
    subject: 'Anatomy',
    level: 1,
    unlockLevel: 0,
    previewAvailable: true,
    icon: '🫁',
    estimatedTime: 18,
    lessons: [
      {
        id: 'respiratory-anatomy',
        title: 'Respiratory System Structure',
        description: 'Overview of respiratory organs and their functions',
        content: [
          'The respiratory system includes the nose, pharynx, larynx, trachea, bronchi, and lungs.',
          'The upper respiratory tract consists of the nose, pharynx, and larynx.',
          'The lower respiratory tract includes the trachea, bronchi, bronchioles, and alveoli.',
          'Gas exchange occurs in the alveoli, tiny air sacs in the lungs.'
        ],
        estimatedTime: 6,
        type: 'text',
        image: '/placeholder.svg',
        imageDescription: 'Complete respiratory system anatomy diagram'
      }
    ]
  },
  {
    id: 'respir-advanced',
    title: 'Gas Exchange Mechanics',
    description: 'Advanced concepts in respiratory physiology',
    system: 'Respiratory System',
    subject: 'Physiology',
    level: 3,
    unlockLevel: 2,
    previewAvailable: false,
    icon: '💨',
    estimatedTime: 25,
    lessons: [
      {
        id: 'gas-exchange',
        title: 'Alveolar Gas Exchange',
        description: 'How oxygen and carbon dioxide are exchanged',
        content: [
          'Gas exchange occurs across the respiratory membrane in the alveoli.',
          'Oxygen diffuses from alveolar air into the blood.',
          'Carbon dioxide diffuses from blood into alveolar air.',
          'The process depends on concentration gradients and membrane permeability.'
        ],
        estimatedTime: 8,
        type: 'text'
      }
    ]
  }
];

export const getModulesBySystem = (system: string): LessonModule[] => {
  return moduleData.filter(module => module.system === system);
};

export const getModuleById = (id: string): LessonModule | undefined => {
  return moduleData.find(module => module.id === id);
};

export const getUserProgress = (): { [moduleId: string]: { completed: boolean; currentLesson: number; completedLessons: number } } => {
  const progress = localStorage.getItem('moduleProgress');
  return progress ? JSON.parse(progress) : {};
};

export const saveUserProgress = (moduleId: string, currentLesson: number, completedLessons: number, completed: boolean = false) => {
  const progress = getUserProgress();
  progress[moduleId] = { completed, currentLesson, completedLessons };
  localStorage.setItem('moduleProgress', JSON.stringify(progress));
};

export const getUnlockedLevel = (): number => {
  const progress = getUserProgress();
  let maxLevel = 0;
  
  Object.values(progress).forEach(moduleProgress => {
    if (moduleProgress.completed) {
      maxLevel = Math.max(maxLevel, 1); // Each completed module unlocks next level
    }
  });
  
  return maxLevel;
};
