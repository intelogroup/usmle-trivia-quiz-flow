
import { LessonModule } from '../types';

export const physiologyModules: LessonModule[] = [
  {
    id: 'intro-physiology',
    system: 'Physiology',
    title: 'Introduction to Physiology',
    description: 'Fundamental principles of human physiology and homeostasis.',
    icon: '⚡',
    totalPoints: 350,
    unlockLevel: 1,
    estimatedTime: 140,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-phys-1',
        title: 'Homeostasis Fundamentals',
        description: 'Understanding how the body maintains balance.',
        duration: 25,
        pointsReward: 50,
        content: [
          'Homeostasis is the body\'s ability to maintain stable internal conditions.',
          'It involves feedback mechanisms that detect and respond to changes.',
          'Negative feedback loops work to counteract deviations from normal.',
          'Positive feedback loops amplify responses, like during childbirth.'
        ],
        type: 'interactive',
        estimatedTime: 25,
        quiz: {
          question: 'What type of feedback mechanism is most common in the human body?',
          options: ['Positive feedback', 'Negative feedback', 'Neutral feedback', 'Mixed feedback'],
          correct: 1,
          explanation: 'Negative feedback is the most common mechanism, working to maintain homeostasis by counteracting changes.'
        }
      },
      {
        id: 'lesson-phys-2',
        title: 'Cell Membrane Transport',
        description: 'How substances move across cellular membranes.',
        duration: 30,
        pointsReward: 60,
        content: [
          'Cell membranes are selectively permeable barriers.',
          'Passive transport requires no energy and includes diffusion and osmosis.',
          'Active transport requires ATP to move substances against gradients.',
          'Endocytosis and exocytosis transport large molecules.'
        ],
        type: 'reading',
        estimatedTime: 30
      },
      {
        id: 'lesson-phys-3',
        title: 'Body Fluid Compartments',
        description: 'Distribution and regulation of body fluids.',
        duration: 28,
        pointsReward: 55,
        content: [
          'Body water is distributed in intracellular and extracellular compartments.',
          'Extracellular fluid includes plasma and interstitial fluid.',
          'Osmotic pressure determines water movement between compartments.',
          'The kidneys play a crucial role in fluid balance.'
        ],
        type: 'interactive',
        estimatedTime: 28
      },
      {
        id: 'lesson-phys-4',
        title: 'Physiological Control Systems',
        description: 'Integration of organ systems for coordinated function.',
        duration: 32,
        pointsReward: 65,
        content: [
          'Control systems consist of sensors, integrators, and effectors.',
          'The nervous system provides rapid, precise control.',
          'The endocrine system provides slower, longer-lasting control.',
          'Many physiological processes involve both systems working together.'
        ],
        type: 'reading',
        estimatedTime: 32
      },
      {
        id: 'lesson-phys-5',
        title: 'Metabolism and Energy',
        description: 'Cellular energy production and utilization.',
        duration: 35,
        pointsReward: 70,
        content: [
          'Metabolism includes all chemical reactions in the body.',
          'Catabolism breaks down molecules to release energy.',
          'Anabolism builds complex molecules using energy.',
          'ATP is the universal energy currency of cells.'
        ],
        type: 'interactive',
        estimatedTime: 35
      }
    ]
  }
];
