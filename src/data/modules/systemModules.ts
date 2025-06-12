
import { LessonModule } from '../types';

export const systemModules: LessonModule[] = [
  {
    id: 'cardio-basics',
    system: 'Cardiovascular System',
    title: 'Cardiovascular Basics',
    description: 'Fundamental concepts of heart and circulation.',
    icon: '❤️',
    totalPoints: 350,
    unlockLevel: 1,
    estimatedTime: 140,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Heart Anatomy',
        description: 'Structure and chambers of the heart.',
        duration: 25,
        pointsReward: 40,
        content: [
          'The heart has four chambers: two atria and two ventricles.',
          'The right side pumps blood to the lungs (pulmonary circulation).',
          'The left side pumps blood to the body (systemic circulation).',
          'Heart valves ensure unidirectional blood flow.'
        ],
        type: 'interactive',
        estimatedTime: 25
      },
      {
        id: 'lesson-2',
        title: 'Cardiac Cycle',
        description: 'Understanding systole and diastole.',
        duration: 30,
        pointsReward: 50,
        content: [
          'The cardiac cycle consists of systole (contraction) and diastole (relaxation).',
          'During systole, the ventricles contract and eject blood.',
          'During diastole, the ventricles relax and fill with blood.',
          'The cycle is coordinated by the electrical conduction system.'
        ],
        type: 'reading',
        estimatedTime: 30
      }
    ]
  },
  {
    id: 'resp-fundamentals',
    system: 'Respiratory System',
    title: 'Respiratory Fundamentals',
    description: 'Basic principles of breathing and gas exchange.',
    icon: '🫁',
    totalPoints: 320,
    unlockLevel: 1,
    estimatedTime: 130,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-resp-1',
        title: 'Respiratory Anatomy',
        description: 'Structure of the respiratory system.',
        duration: 28,
        pointsReward: 45,
        content: [
          'The respiratory system includes the nose, pharynx, larynx, trachea, bronchi, and lungs.',
          'The alveoli are the site of gas exchange.',
          'The diaphragm is the primary muscle of respiration.',
          'The respiratory system is divided into conducting and respiratory zones.'
        ],
        type: 'interactive',
        estimatedTime: 28
      },
      {
        id: 'lesson-resp-2',
        title: 'Gas Exchange',
        description: 'How oxygen and carbon dioxide are exchanged.',
        duration: 32,
        pointsReward: 55,
        content: [
          'Gas exchange occurs in the alveoli through diffusion.',
          'Oxygen moves from alveoli to blood, CO2 moves from blood to alveoli.',
          'The respiratory membrane consists of alveolar and capillary walls.',
          'Factors affecting gas exchange include surface area, membrane thickness, and pressure gradients.'
        ],
        type: 'reading',
        estimatedTime: 32
      }
    ]
  },
  {
    id: 'renal-physiology',
    system: 'Renal System',
    title: 'Renal Physiology',
    description: 'Kidney function and fluid balance.',
    icon: '🫘',
    totalPoints: 380,
    unlockLevel: 2,
    estimatedTime: 150,
    previewAvailable: false,
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'lesson-renal-1',
        title: 'Nephron Structure',
        description: 'The functional unit of the kidney.',
        duration: 35,
        pointsReward: 60,
        content: [
          'The nephron consists of a glomerulus, Bowman\'s capsule, and tubules.',
          'Filtration occurs at the glomerulus.',
          'Reabsorption and secretion occur in the tubules.',
          'Each kidney contains about 1 million nephrons.'
        ],
        type: 'interactive',
        estimatedTime: 35
      },
      {
        id: 'lesson-renal-2',
        title: 'Urine Formation',
        description: 'Filtration, reabsorption, and secretion.',
        duration: 40,
        pointsReward: 70,
        content: [
          'Urine formation involves three processes: filtration, reabsorption, and secretion.',
          'Glomerular filtration rate (GFR) measures kidney function.',
          'Most filtered water and solutes are reabsorbed.',
          'Hormones like ADH and aldosterone regulate urine concentration.'
        ],
        type: 'reading',
        estimatedTime: 40
      }
    ]
  },
  {
    id: 'nervous-system',
    system: 'Nervous System',
    title: 'Nervous System Basics',
    description: 'Neural communication and brain function.',
    icon: '🧠',
    totalPoints: 420,
    unlockLevel: 2,
    estimatedTime: 170,
    previewAvailable: false,
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'lesson-neuro-1',
        title: 'Neuron Structure',
        description: 'Components of nerve cells.',
        duration: 30,
        pointsReward: 50,
        content: [
          'Neurons have a cell body, dendrites, and an axon.',
          'Dendrites receive signals, axons transmit signals.',
          'The myelin sheath insulates axons and speeds conduction.',
          'Synapses are connections between neurons.'
        ],
        type: 'interactive',
        estimatedTime: 30
      },
      {
        id: 'lesson-neuro-2',
        title: 'Action Potential',
        description: 'How neurons generate and transmit electrical signals.',
        duration: 38,
        pointsReward: 65,
        content: [
          'Action potentials are electrical signals that travel along axons.',
          'They are generated by voltage-gated sodium and potassium channels.',
          'The process involves depolarization, repolarization, and hyperpolarization.',
          'Action potentials follow the all-or-nothing principle.'
        ],
        type: 'reading',
        estimatedTime: 38
      }
    ]
  },
  {
    id: 'digestive-system',
    system: 'Digestive System',
    title: 'Digestive System Overview',
    description: 'Digestion, absorption, and metabolism.',
    icon: '🍎',
    totalPoints: 360,
    unlockLevel: 1,
    estimatedTime: 145,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-digest-1',
        title: 'Digestive Anatomy',
        description: 'Organs and structures of digestion.',
        duration: 32,
        pointsReward: 55,
        content: [
          'The digestive system includes the GI tract and accessory organs.',
          'The GI tract: mouth, esophagus, stomach, small intestine, large intestine.',
          'Accessory organs: liver, pancreas, gallbladder.',
          'Each organ has specialized functions in digestion.'
        ],
        type: 'interactive',
        estimatedTime: 32
      },
      {
        id: 'lesson-digest-2',
        title: 'Nutrient Absorption',
        description: 'How nutrients are absorbed in the intestines.',
        duration: 35,
        pointsReward: 60,
        content: [
          'Most absorption occurs in the small intestine.',
          'Villi and microvilli increase surface area for absorption.',
          'Different nutrients are absorbed by different mechanisms.',
          'The large intestine primarily absorbs water and electrolytes.'
        ],
        type: 'reading',
        estimatedTime: 35
      }
    ]
  }
];
