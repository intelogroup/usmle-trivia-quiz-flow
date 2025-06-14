
import { LessonModule } from '../types';

export const anatomyModules: LessonModule[] = [
  {
    id: 'anatomy-basics',
    system: 'Human Anatomy',
    title: 'Basic Human Anatomy',
    description: 'Fundamental structures and organization of the human body',
    icon: '🦴',
    totalPoints: 180,
    unlockLevel: 1,
    estimatedTime: 30,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'body-planes',
        title: 'Anatomical Position & Body Planes',
        description: 'Learn the standard anatomical position and directional terms',
        duration: 10,
        pointsReward: 60,
        type: 'reading',
        content: [
          'The anatomical position is the standard reference position for describing the human body. The person stands upright with feet parallel, arms at the sides, and palms facing forward.',
          'Body planes are imaginary flat surfaces that divide the body into sections. The sagittal plane divides the body into left and right parts.',
          'The frontal (coronal) plane divides the body into anterior (front) and posterior (back) portions.',
          'The transverse (horizontal) plane divides the body into superior (upper) and inferior (lower) portions.'
        ],
        image: 'photo-1559757148-5c350d0d3c56',
        imageDescription: 'Diagram showing anatomical position and the three body planes',
        quiz: {
          question: 'Which plane divides the body into left and right parts?',
          options: ['Sagittal plane', 'Frontal plane', 'Transverse plane', 'Oblique plane'],
          correct: 0,
          explanation: 'The sagittal plane divides the body into left and right portions. The midsagittal plane divides it into equal left and right halves.'
        }
      },
      {
        id: 'directional-terms',
        title: 'Anatomical Directional Terms',
        description: 'Master the language used to describe body positions',
        duration: 8,
        pointsReward: 50,
        type: 'interactive',
        system: 'Human Anatomy',
        subject: 'General Anatomy',
        steps: [
          {
            id: 'step-1',
            system: 'Human Anatomy',
            subject: 'General Anatomy',
            sentence: 'The head is _____ to the feet, while the feet are _____ to the head.',
            blanks: [
              {
                id: 1,
                choices: ['superior', 'inferior', 'lateral'],
                correct: 0,
                explanation: 'Superior means toward the head or upper part of the body'
              },
              {
                id: 2,
                choices: ['superior', 'inferior', 'lateral'],
                correct: 1,
                explanation: 'Inferior means toward the feet or lower part of the body'
              }
            ]
          }
        ]
      },
      {
        id: 'tissue-types',
        title: 'Basic Tissue Types',
        description: 'Understand the four fundamental tissue types',
        duration: 12,
        pointsReward: 70,
        type: 'reading',
        content: [
          'The human body is composed of four basic tissue types: epithelial, connective, muscle, and nervous tissue.',
          'Epithelial tissue covers body surfaces and lines cavities. It provides protection, absorption, and secretion functions.',
          'Connective tissue supports and connects other tissues. Examples include bone, cartilage, blood, and adipose tissue.',
          'Muscle tissue is responsible for movement. There are three types: skeletal, cardiac, and smooth muscle.',
          'Nervous tissue transmits electrical signals throughout the body and includes neurons and supporting glial cells.'
        ],
        quiz: {
          question: 'Which tissue type is responsible for transmitting electrical signals?',
          options: ['Epithelial tissue', 'Connective tissue', 'Muscle tissue', 'Nervous tissue'],
          correct: 3,
          explanation: 'Nervous tissue consists of neurons and glial cells that transmit and process electrical signals throughout the body.'
        }
      }
    ]
  }
];
