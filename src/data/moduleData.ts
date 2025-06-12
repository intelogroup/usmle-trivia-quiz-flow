export interface ModuleLesson {
  id: string;
  title: string;
  description: string;
  content: string[];
  estimatedTime: number;
  xpReward: number;
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
  totalXp: number;
  previewAvailable: boolean;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
}

export const moduleData: LessonModule[] = [
  {
    id: 'cardio-basics',
    title: 'Heart Fundamentals',
    description: 'Master the basic structure and function of the cardiovascular system',
    system: 'Cardiovascular System',
    subject: 'Anatomy',
    level: 1,
    unlockLevel: 0,
    previewAvailable: true,
    icon: '🫀',
    estimatedTime: 20,
    totalXp: 150,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'heart-anatomy-intro',
        title: 'Introduction to Heart Anatomy',
        description: 'Overview of the heart as the central pump of circulation',
        content: [
          'The heart is a muscular organ about the size of your fist, located in the mediastinum of the thoracic cavity.',
          'It functions as a dual pump system, with the right side pumping blood to the lungs and the left side pumping blood to the body.',
          'The heart beats approximately 100,000 times per day, pumping about 5 liters of blood per minute.',
          'Understanding heart anatomy is fundamental to comprehending cardiovascular physiology and pathology.'
        ],
        estimatedTime: 5,
        xpReward: 25,
        type: 'text',
        image: '/placeholder.svg',
        imageDescription: 'External anatomy of the human heart'
      },
      {
        id: 'heart-chambers',
        title: 'The Four Heart Chambers',
        description: 'Detailed study of atria and ventricles',
        content: [
          'The heart consists of four chambers that work in coordinated sequence to maintain circulation.',
          'The right atrium receives deoxygenated blood from the systemic circulation via the superior and inferior vena cavae.',
          'The left atrium receives oxygenated blood from the pulmonary circulation via four pulmonary veins.',
          'The right ventricle has thinner walls and pumps blood through the pulmonary circulation at lower pressure.',
          'The left ventricle has the thickest muscular walls and generates high pressure to pump blood through systemic circulation.'
        ],
        estimatedTime: 7,
        xpReward: 40,
        type: 'interactive',
        image: '/placeholder.svg',
        imageDescription: 'Cross-sectional view showing all four heart chambers',
        quiz: {
          question: 'Which chamber of the heart has the thickest muscular walls?',
          options: ['Right atrium', 'Left atrium', 'Right ventricle', 'Left ventricle'],
          correct: 3,
          explanation: 'The left ventricle has the thickest walls because it must generate enough pressure to pump blood throughout the entire systemic circulation.'
        }
      },
      {
        id: 'heart-valves-function',
        title: 'Heart Valves and Blood Flow',
        description: 'Understanding valve structure and function',
        content: [
          'Heart valves ensure unidirectional blood flow and prevent backflow during the cardiac cycle.',
          'The tricuspid valve (right atrioventricular valve) has three cusps and controls flow from right atrium to right ventricle.',
          'The bicuspid or mitral valve (left atrioventricular valve) has two cusps and controls flow from left atrium to left ventricle.',
          'The pulmonary semilunar valve controls blood flow from the right ventricle into the pulmonary trunk.',
          'The aortic semilunar valve controls blood flow from the left ventricle into the ascending aorta.',
          'Valve dysfunction can lead to stenosis (narrowing) or regurgitation (leakage).'
        ],
        estimatedTime: 8,
        xpReward: 50,
        type: 'interactive',
        quiz: {
          question: 'What happens when the aortic valve becomes stenotic?',
          options: [
            'Blood flows backward into the left ventricle',
            'The left ventricle cannot fill properly',
            'Blood flow from the left ventricle to the aorta is restricted',
            'The right ventricle works harder'
          ],
          correct: 2,
          explanation: 'Aortic stenosis restricts blood flow from the left ventricle to the aorta, making the heart work harder to pump blood to the body.'
        }
      },
      {
        id: 'cardiac-circulation',
        title: 'Pulmonary and Systemic Circulation',
        description: 'The two circuits of blood circulation',
        content: [
          'The cardiovascular system consists of two interconnected circulatory pathways that work together.',
          'Pulmonary circulation carries deoxygenated blood from the right ventricle to the lungs for oxygenation and returns oxygenated blood to the left atrium.',
          'Systemic circulation carries oxygenated blood from the left ventricle to body tissues and returns deoxygenated blood to the right atrium.',
          'The coronary circulation is a specialized part of systemic circulation that supplies the heart muscle itself.',
          'Portal circulations, such as hepatic portal circulation, connect two capillary beds without returning to the heart.'
        ],
        estimatedTime: 6,
        xpReward: 35,
        type: 'text'
      }
    ]
  },
  {
    id: 'cardio-physiology',
    title: 'Cardiac Cycle & Rhythm',
    description: 'Advanced study of heart function and electrical conduction',
    system: 'Cardiovascular System',
    subject: 'Physiology',
    level: 2,
    unlockLevel: 1,
    previewAvailable: true,
    icon: '⚡',
    estimatedTime: 25,
    totalXp: 200,
    difficulty: 'Intermediate',
    prerequisites: ['cardio-basics'],
    lessons: [
      {
        id: 'cardiac-cycle-phases',
        title: 'Phases of the Cardiac Cycle',
        description: 'Systole, diastole, and pressure changes',
        content: [
          'The cardiac cycle represents all events occurring during one complete heartbeat, lasting approximately 0.8 seconds at rest.',
          'Ventricular systole is the contraction phase, divided into isovolumetric contraction and ventricular ejection.',
          'Ventricular diastole is the relaxation phase, including isovolumetric relaxation, rapid filling, and atrial systole.',
          'Pressure changes drive valve opening and closing, ensuring unidirectional blood flow.',
          'The cardiac cycle can be analyzed using pressure-volume loops to understand cardiac work and efficiency.'
        ],
        estimatedTime: 10,
        xpReward: 75,
        type: 'interactive',
        image: '/placeholder.svg',
        imageDescription: 'Cardiac cycle diagram showing pressure and volume changes',
        quiz: {
          question: 'During which phase are all heart valves closed?',
          options: ['Ventricular filling', 'Isovolumetric contraction', 'Ventricular ejection', 'Atrial systole'],
          correct: 1,
          explanation: 'During isovolumetric contraction, both AV valves and semilunar valves are closed, causing pressure to build in the ventricles without volume change.'
        }
      },
      {
        id: 'electrical-conduction',
        title: 'Cardiac Electrical System',
        description: 'Understanding the heart\'s natural pacemaker',
        content: [
          'The heart has an intrinsic electrical conduction system that coordinates synchronized contraction.',
          'The sinoatrial (SA) node acts as the natural pacemaker, generating action potentials at 60-100 beats per minute.',
          'Electrical impulses spread through the atria, causing atrial contraction, then reach the atrioventricular (AV) node.',
          'The AV node delays the impulse, allowing complete atrial emptying before ventricular contraction begins.',
          'The bundle of His, bundle branches, and Purkinje fibers rapidly conduct impulses throughout the ventricles.'
        ],
        estimatedTime: 8,
        xpReward: 60,
        type: 'interactive',
        quiz: {
          question: 'What is the primary function of the AV node delay?',
          options: [
            'To slow down the heart rate',
            'To allow complete atrial emptying',
            'To prevent arrhythmias',
            'To coordinate ventricular contraction'
          ],
          correct: 1,
          explanation: 'The AV node delay ensures that the atria have completely emptied their blood into the ventricles before ventricular contraction begins.'
        }
      },
      {
        id: 'cardiac-output',
        title: 'Cardiac Output and Regulation',
        description: 'Factors affecting heart performance',
        content: [
          'Cardiac output is the volume of blood pumped by the heart per minute, calculated as heart rate × stroke volume.',
          'Stroke volume depends on preload (ventricular filling), afterload (resistance to ejection), and contractility.',
          'The Frank-Starling mechanism allows the heart to adapt to changes in venous return automatically.',
          'Autonomic nervous system regulation adjusts heart rate and contractility based on physiological demands.',
          'Exercise, stress, and disease states can significantly alter cardiac output requirements.'
        ],
        estimatedTime: 7,
        xpReward: 65,
        type: 'text'
      }
    ]
  },
  {
    id: 'respir-anatomy',
    title: 'Respiratory System Structure',
    description: 'Complete anatomy of the breathing system',
    system: 'Respiratory System',
    subject: 'Anatomy',
    level: 1,
    unlockLevel: 0,
    previewAvailable: true,
    icon: '🫁',
    estimatedTime: 22,
    totalXp: 175,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'respiratory-overview',
        title: 'Respiratory System Overview',
        description: 'Introduction to breathing and gas exchange',
        content: [
          'The respiratory system facilitates gas exchange between the atmosphere and the bloodstream.',
          'Primary functions include oxygen uptake, carbon dioxide elimination, pH regulation, and vocalization.',
          'The system is divided into conducting airways (nose to terminal bronchioles) and respiratory zone (respiratory bronchioles to alveoli).',
          'Breathing involves coordinated action of respiratory muscles, primarily the diaphragm and intercostal muscles.'
        ],
        estimatedTime: 6,
        xpReward: 30,
        type: 'text',
        image: '/placeholder.svg',
        imageDescription: 'Complete respiratory system anatomy'
      },
      {
        id: 'upper-airway',
        title: 'Upper Respiratory Tract',
        description: 'Nose, pharynx, and larynx anatomy',
        content: [
          'The nose filters, warms, and humidifies inspired air while providing the sense of smell.',
          'Nasal conchae increase surface area for air conditioning and create turbulent flow for better filtering.',
          'The pharynx serves as a shared pathway for respiratory and digestive systems.',
          'The larynx contains vocal cords for sound production and acts as a protective mechanism during swallowing.',
          'The epiglottis prevents aspiration by covering the laryngeal inlet during swallowing.'
        ],
        estimatedTime: 8,
        xpReward: 45,
        type: 'interactive',
        quiz: {
          question: 'What is the primary function of the epiglottis?',
          options: [
            'Sound production',
            'Air filtration',
            'Preventing aspiration during swallowing',
            'Warming inspired air'
          ],
          correct: 2,
          explanation: 'The epiglottis covers the laryngeal inlet during swallowing to prevent food and liquids from entering the airway.'
        }
      },
      {
        id: 'lower-airway',
        title: 'Lower Respiratory Tract',
        description: 'Trachea, bronchi, and lung structure',
        content: [
          'The trachea is a rigid tube supported by C-shaped cartilage rings that maintains airway patency.',
          'Bronchi branch progressively, with cartilage support decreasing and smooth muscle increasing in smaller airways.',
          'Bronchioles lack cartilage and rely on smooth muscle for diameter control, important in diseases like asthma.',
          'Alveoli are the functional units where gas exchange occurs, surrounded by dense capillary networks.',
          'Surfactant produced by type II pneumocytes reduces surface tension and prevents alveolar collapse.'
        ],
        estimatedTime: 8,
        xpReward: 50,
        type: 'interactive',
        quiz: {
          question: 'What cells produce surfactant in the alveoli?',
          options: ['Type I pneumocytes', 'Type II pneumocytes', 'Alveolar macrophages', 'Capillary endothelium'],
          correct: 1,
          explanation: 'Type II pneumocytes produce surfactant, which reduces surface tension and prevents alveolar collapse during expiration.'
        }
      }
    ]
  },
  {
    id: 'respir-physiology',
    title: 'Gas Exchange Mechanics',
    description: 'Advanced respiratory physiology and gas transport',
    system: 'Respiratory System',
    subject: 'Physiology',
    level: 3,
    unlockLevel: 2,
    previewAvailable: false,
    icon: '💨',
    estimatedTime: 30,
    totalXp: 250,
    difficulty: 'Advanced',
    prerequisites: ['respir-anatomy', 'cardio-physiology'],
    lessons: [
      {
        id: 'ventilation-mechanics',
        title: 'Mechanics of Breathing',
        description: 'Pressure changes and respiratory muscles',
        content: [
          'Ventilation occurs due to pressure gradients created by respiratory muscle activity.',
          'Inspiration is active, involving diaphragm descent and external intercostal muscle contraction.',
          'Expiration is passive at rest but becomes active during exercise or forced breathing.',
          'Lung compliance and airway resistance affect the work of breathing and ventilatory efficiency.',
          'Respiratory diseases can alter these mechanics, leading to increased work of breathing.'
        ],
        estimatedTime: 10,
        xpReward: 80,
        type: 'interactive',
        quiz: {
          question: 'What makes inspiration an active process?',
          options: [
            'Elastic recoil of lungs',
            'Atmospheric pressure',
            'Respiratory muscle contraction',
            'Surface tension in alveoli'
          ],
          correct: 2,
          explanation: 'Inspiration requires active contraction of respiratory muscles to expand the thoracic cavity and create negative pressure.'
        }
      },
      {
        id: 'gas-exchange-diffusion',
        title: 'Alveolar Gas Exchange',
        description: 'Diffusion and oxygen transport',
        content: [
          'Gas exchange occurs across the respiratory membrane by simple diffusion down concentration gradients.',
          'Oxygen diffuses from alveolar air into pulmonary capillary blood.',
          'Carbon dioxide diffuses from capillary blood into alveolar air for elimination.',
          'Factors affecting diffusion include membrane thickness, surface area, and concentration gradients.',
          'Pulmonary diseases can impair gas exchange by affecting any of these factors.'
        ],
        estimatedTime: 10,
        xpReward: 85,
        type: 'interactive',
        quiz: {
          question: 'Which factor would decrease the efficiency of gas exchange?',
          options: [
            'Increased alveolar surface area',
            'Thickened respiratory membrane',
            'Higher oxygen concentration gradient',
            'Increased capillary blood flow'
          ],
          correct: 1,
          explanation: 'A thickened respiratory membrane (as in pulmonary edema or fibrosis) increases diffusion distance and reduces gas exchange efficiency.'
        }
      },
      {
        id: 'oxygen-transport',
        title: 'Oxygen and CO2 Transport',
        description: 'Blood gas transport mechanisms',
        content: [
          'Oxygen is transported in blood both dissolved in plasma (3%) and bound to hemoglobin (97%).',
          'The oxygen-hemoglobin dissociation curve shows the relationship between PO2 and hemoglobin saturation.',
          'Carbon dioxide is transported as dissolved CO2, bicarbonate ions, and carbaminohemoglobin.',
          'The Bohr effect describes how pH and CO2 affect oxygen-hemoglobin binding.',
          'Respiratory and metabolic factors can shift the oxygen dissociation curve, affecting oxygen delivery to tissues.'
        ],
        estimatedTime: 10,
        xpReward: 85,
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

export const getUserProgress = (): { [moduleId: string]: { completed: boolean; currentLesson: number; completedLessons: number; earnedXp: number } } => {
  const progress = localStorage.getItem('moduleProgress');
  return progress ? JSON.parse(progress) : {};
};

export const saveUserProgress = (moduleId: string, currentLesson: number, completedLessons: number, completed: boolean = false, earnedXp: number = 0) => {
  const progress = getUserProgress();
  const existingXp = progress[moduleId]?.earnedXp || 0;
  progress[moduleId] = { completed, currentLesson, completedLessons, earnedXp: Math.max(existingXp, earnedXp) };
  localStorage.setItem('moduleProgress', JSON.stringify(progress));
};

export const getUnlockedLevel = (): number => {
  const progress = getUserProgress();
  let maxLevel = 0;
  
  Object.values(progress).forEach(moduleProgress => {
    if (moduleProgress.completed) {
      maxLevel = Math.max(maxLevel, 1);
    }
  });
  
  return maxLevel;
};

export const getTotalUserXp = (): number => {
  const progress = getUserProgress();
  return Object.values(progress).reduce((total, moduleProgress) => total + (moduleProgress.earnedXp || 0), 0);
};
