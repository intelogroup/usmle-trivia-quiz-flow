
import { LessonModule } from '../types';

export const physiologyModules: LessonModule[] = [
  {
    id: 'intro-physiology',
    system: 'Human Physiology',
    title: 'Introduction to Physiology',
    description: 'Foundation concepts of human body function',
    icon: '⚡',
    totalPoints: 120,
    unlockLevel: 1,
    estimatedTime: 20,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'homeostasis',
        title: 'Homeostasis Fundamentals',
        description: 'Learn how the body maintains balance',
        duration: 8,
        pointsReward: 40,
        type: 'reading',
        content: [
          'Homeostasis is the body\'s ability to maintain stable internal conditions despite changes in the external environment.',
          'Key examples include maintaining body temperature around 98.6°F (37°C) and blood glucose levels within normal ranges.',
          'Homeostasis involves feedback loops - negative feedback maintains stability, while positive feedback amplifies changes.',
          'Most physiological systems use negative feedback to return conditions to normal when they deviate from set points.'
        ],
        quiz: {
          question: 'What type of feedback loop is most common in maintaining homeostasis?',
          options: ['Positive feedback', 'Negative feedback', 'Neutral feedback', 'Random feedback'],
          correct: 1,
          explanation: 'Negative feedback loops are most common in homeostasis because they work to counteract changes and return the body to its normal state.'
        }
      },
      {
        id: 'feedback-loops',
        title: 'Feedback Mechanisms',
        description: 'Understand positive and negative feedback',
        duration: 7,
        pointsReward: 35,
        type: 'interactive',
        system: 'Human Physiology',
        subject: 'General Physiology',
        steps: [
          {
            id: 'step-1',
            system: 'Human Physiology',
            subject: 'General Physiology',
            sentence: 'In _____ feedback, the response opposes the original stimulus, while in _____ feedback, the response amplifies the stimulus.',
            blanks: [
              {
                id: 1,
                choices: ['negative', 'positive', 'neutral'],
                correct: 0,
                explanation: 'Negative feedback opposes changes to maintain homeostasis'
              },
              {
                id: 2,
                choices: ['negative', 'positive', 'neutral'],
                correct: 1,
                explanation: 'Positive feedback amplifies changes, like during childbirth'
              }
            ]
          }
        ]
      },
      {
        id: 'body-systems',
        title: 'Body System Integration',
        description: 'How organ systems work together',
        duration: 5,
        pointsReward: 45,
        type: 'reading',
        content: [
          'The human body contains multiple organ systems that work together to maintain life and health.',
          'Major systems include cardiovascular, respiratory, nervous, digestive, endocrine, and musculoskeletal systems.',
          'These systems are interconnected - for example, the respiratory and cardiovascular systems work together to deliver oxygen.',
          'Understanding system integration is crucial for comprehending how the body functions as a unified whole.'
        ]
      }
    ]
  }
];
