
import { LessonModule } from '../types';

export const cellBiologyModules: LessonModule[] = [
  {
    id: 'cell-biology-genetics',
    system: 'Cell Biology & Genetics',
    title: 'Cell Structure & Function',
    description: 'Explore cellular components and genetic principles',
    icon: '🧬',
    totalPoints: 160,
    unlockLevel: 2,
    estimatedTime: 28,
    previewAvailable: false,
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'cell-organelles',
        title: 'Cell Organelles',
        description: 'Learn about cellular structures and their functions',
        duration: 12,
        pointsReward: 60,
        type: 'reading',
        content: [
          'Cells contain specialized structures called organelles that perform specific functions necessary for life.',
          'The nucleus controls cell activities and contains DNA, while mitochondria produce energy (ATP) for the cell.',
          'The endoplasmic reticulum (ER) manufactures proteins and lipids, and the Golgi apparatus modifies and packages them.',
          'Ribosomes synthesize proteins, and lysosomes digest waste materials and break down worn-out organelles.'
        ],
        image: 'photo-1576091160399-112ba8d25d1f',
        imageDescription: 'Detailed diagram of a cell showing major organelles and their locations',
        quiz: {
          question: 'Which organelle is known as the "powerhouse of the cell"?',
          options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
          correct: 1,
          explanation: 'Mitochondria are called the "powerhouse of the cell" because they produce ATP, the energy currency used by cells for various functions.'
        }
      },
      {
        id: 'dna-structure',
        title: 'DNA Structure & Function',
        description: 'Understand genetic material organization',
        duration: 10,
        pointsReward: 50,
        type: 'interactive',
        system: 'Cell Biology & Genetics',
        subject: 'Genetics',
        steps: [
          {
            id: 'step-1',
            system: 'Cell Biology & Genetics',
            subject: 'Genetics',
            sentence: 'DNA has a _____ helix structure made of two strands connected by _____ pairs: A-T and G-C.',
            blanks: [
              {
                id: 1,
                choices: ['single', 'double', 'triple'],
                correct: 1,
                explanation: 'DNA has a double helix structure with two intertwined strands'
              },
              {
                id: 2,
                choices: ['amino acid', 'base', 'sugar'],
                correct: 1,
                explanation: 'Base pairs (A-T and G-C) connect the two DNA strands'
              }
            ]
          }
        ]
      },
      {
        id: 'protein-synthesis',
        title: 'Protein Synthesis',
        description: 'Learn transcription and translation processes',
        duration: 6,
        pointsReward: 50,
        type: 'reading',
        content: [
          'Protein synthesis occurs in two main steps: transcription and translation.',
          'During transcription, DNA is used as a template to create messenger RNA (mRNA) in the nucleus.',
          'Translation occurs at ribosomes, where mRNA is read and amino acids are assembled into proteins.',
          'Transfer RNA (tRNA) molecules bring specific amino acids to the ribosome based on the mRNA code.'
        ],
        quiz: {
          question: 'Where does translation occur in the cell?',
          options: ['Nucleus', 'Mitochondria', 'Ribosomes', 'Golgi apparatus'],
          correct: 2,
          explanation: 'Translation occurs at ribosomes, where mRNA is decoded and amino acids are assembled into proteins.'
        }
      }
    ]
  }
];
