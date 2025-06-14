
import { LessonModule } from '../types';

export const biochemistryModules: LessonModule[] = [
  {
    id: 'medical-biochemistry',
    system: 'Medical Biochemistry',
    title: 'Metabolic Pathways',
    description: 'Master cellular metabolism and energy production',
    icon: '⚛️',
    totalPoints: 240,
    unlockLevel: 3,
    estimatedTime: 45,
    previewAvailable: false,
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'cellular-respiration',
        title: 'Cellular Respiration',
        description: 'Learn how cells produce ATP',
        duration: 15,
        pointsReward: 80,
        type: 'reading',
        content: [
          'Cellular respiration is the process by which cells break down glucose to produce ATP (adenosine triphosphate).',
          'It occurs in three main stages: glycolysis in the cytoplasm, the citric acid cycle in mitochondria, and electron transport.',
          'Glycolysis breaks down glucose into pyruvate, producing a small amount of ATP and NADH.',
          'The citric acid cycle and electron transport chain produce the majority of ATP through oxidative phosphorylation.'
        ],
        quiz: {
          question: 'Where does glycolysis occur in the cell?',
          options: ['Nucleus', 'Mitochondria', 'Cytoplasm', 'Ribosome'],
          correct: 2,
          explanation: 'Glycolysis occurs in the cytoplasm, where glucose is broken down into pyruvate molecules.'
        }
      },
      {
        id: 'enzyme-function',
        title: 'Enzyme Catalysis',
        description: 'Understand how enzymes speed up reactions',
        duration: 12,
        pointsReward: 70,
        type: 'interactive',
        system: 'Medical Biochemistry',
        subject: 'Biochemistry',
        steps: [
          {
            id: 'step-1',
            system: 'Medical Biochemistry',
            subject: 'Biochemistry',
            sentence: 'Enzymes are _____ catalysts that lower the _____ energy needed for chemical reactions to occur.',
            blanks: [
              {
                id: 1,
                choices: ['protein', 'lipid', 'carbohydrate'],
                correct: 0,
                explanation: 'Enzymes are protein molecules that catalyze biochemical reactions'
              },
              {
                id: 2,
                choices: ['kinetic', 'activation', 'potential'],
                correct: 1,
                explanation: 'Enzymes lower the activation energy barrier for reactions'
              }
            ]
          }
        ]
      },
      {
        id: 'metabolic-regulation',
        title: 'Metabolic Control',
        description: 'Learn how metabolism is regulated',
        duration: 18,
        pointsReward: 90,
        type: 'reading',
        content: [
          'Metabolic pathways are carefully regulated to maintain cellular energy balance and homeostasis.',
          'Key regulatory mechanisms include allosteric regulation, covalent modification, and enzyme induction/repression.',
          'Hormones like insulin and glucagon coordinate metabolism between different tissues and organs.',
          'Feedback inhibition prevents overproduction of metabolic products and maintains pathway efficiency.'
        ],
        quiz: {
          question: 'What is the primary hormone that promotes glucose uptake by cells?',
          options: ['Glucagon', 'Insulin', 'Cortisol', 'Adrenaline'],
          correct: 1,
          explanation: 'Insulin is the primary hormone that promotes glucose uptake by cells, lowering blood glucose levels.'
        }
      }
    ]
  }
];
