
import { Lesson, LessonStep } from './types';

export { LessonStep } from './types';

export const lessonData: Lesson[] = [
  {
    id: 'cardio-anatomy-1',
    system: 'Cardiovascular System',
    subject: 'Anatomy',
    title: 'Heart Structure Basics',
    description: 'Learn the fundamental anatomy of the heart',
    estimatedTime: 8,
    duration: 8,
    pointsReward: 50,
    type: 'interactive',
    steps: [
      {
        id: 'step-1',
        system: 'Cardiovascular System',
        subject: 'Anatomy',
        sentence: 'The heart has _____ chambers: _____ atria and _____ ventricles.',
        blanks: [
          {
            id: 1,
            choices: ['two', 'three', 'four'],
            correct: 2,
            explanation: 'The heart has four chambers total'
          },
          {
            id: 2,
            choices: ['one', 'two', 'three'],
            correct: 1,
            explanation: 'There are two atria (left and right)'
          },
          {
            id: 3,
            choices: ['one', 'two', 'three'],
            correct: 1,
            explanation: 'There are two ventricles (left and right)'
          }
        ],
        image: '/placeholder.svg',
        imageDescription: 'Diagram showing the four chambers of the heart'
      },
      {
        id: 'step-2',
        system: 'Cardiovascular System',
        subject: 'Anatomy',
        sentence: 'The _____ ventricle is more muscular because it pumps blood to the _____ circulation.',
        blanks: [
          {
            id: 1,
            choices: ['left', 'right'],
            correct: 0,
            explanation: 'The left ventricle has thicker walls to generate higher pressure'
          },
          {
            id: 2,
            choices: ['pulmonary', 'systemic'],
            correct: 1,
            explanation: 'Systemic circulation requires higher pressure to reach the entire body'
          }
        ]
      },
      {
        id: 'step-3',
        system: 'Cardiovascular System',
        subject: 'Anatomy',
        sentence: 'The _____ valve prevents backflow from the aorta, while the _____ valve prevents backflow from the pulmonary artery.',
        blanks: [
          {
            id: 1,
            choices: ['aortic', 'mitral', 'tricuspid'],
            correct: 0,
            explanation: 'The aortic valve sits between the left ventricle and aorta'
          },
          {
            id: 2,
            choices: ['pulmonary', 'mitral', 'tricuspid'],
            correct: 0,
            explanation: 'The pulmonary valve sits between the right ventricle and pulmonary artery'
          }
        ]
      }
    ]
  },
  {
    id: 'respir-physio-1',
    system: 'Respiratory System',
    subject: 'Physiology',
    title: 'Gas Exchange Mechanics',
    description: 'Understand how oxygen and carbon dioxide are exchanged',
    estimatedTime: 10,
    duration: 10,
    pointsReward: 60,
    type: 'interactive',
    steps: [
      {
        id: 'step-1',
        system: 'Respiratory System',
        subject: 'Physiology',
        sentence: 'Gas exchange occurs in the _____ where oxygen moves from _____ to _____ and carbon dioxide moves in the opposite direction.',
        blanks: [
          {
            id: 1,
            choices: ['bronchi', 'alveoli', 'trachea'],
            correct: 1,
            explanation: 'Alveoli are tiny air sacs where gas exchange takes place'
          },
          {
            id: 2,
            choices: ['air', 'blood', 'tissue'],
            correct: 0,
            explanation: 'Oxygen moves from inhaled air into the bloodstream'
          },
          {
            id: 3,
            choices: ['air', 'blood', 'tissue'],
            correct: 1,
            explanation: 'Oxygen enters the blood to be transported to tissues'
          }
        ],
        image: '/placeholder.svg',
        imageDescription: 'Alveolar structure showing gas exchange'
      }
    ]
  }
];

export const getLessonsBySystemAndSubject = (system: string, subject: string): Lesson[] => {
  return lessonData.filter(lesson => 
    lesson.system === system && lesson.subject === subject
  );
};

export const getLessonById = (id: string): Lesson | undefined => {
  return lessonData.find(lesson => lesson.id === id);
};
