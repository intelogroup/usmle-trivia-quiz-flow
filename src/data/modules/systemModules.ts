
import { LessonModule } from '../types';

export const systemModules: LessonModule[] = [
  {
    id: 'cardio-basics',
    system: 'Cardiovascular System',
    title: 'Cardiovascular Fundamentals',
    description: 'Master the basics of heart anatomy and blood circulation',
    icon: '🫀',
    totalPoints: 150,
    unlockLevel: 1,
    estimatedTime: 25,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'heart-anatomy',
        title: 'Heart Anatomy Basics',
        description: 'Learn the fundamental structure of the heart',
        duration: 8,
        pointsReward: 50,
        type: 'reading',
        content: [
          'The heart is a muscular organ that pumps blood throughout your body. It consists of four chambers that work together to maintain circulation.',
          'The upper chambers are called atria (left and right atrium), which receive blood returning to the heart.',
          'The lower chambers are called ventricles (left and right ventricle), which pump blood out of the heart to the lungs and body.',
          'The heart has four valves that prevent blood from flowing backward: tricuspid, pulmonary, mitral, and aortic valves.'
        ],
        image: 'photo-1559757148-5c350d0d3c56',
        imageDescription: 'Anatomical diagram showing the four chambers and major vessels of the heart',
        quiz: {
          question: 'How many chambers does the human heart have?',
          options: ['Two chambers', 'Three chambers', 'Four chambers', 'Five chambers'],
          correct: 2,
          explanation: 'The human heart has four chambers: two atria (upper chambers) and two ventricles (lower chambers). This four-chamber design allows for efficient separation of oxygenated and deoxygenated blood.'
        }
      },
      {
        id: 'blood-circulation',
        title: 'Blood Circulation Pathways',
        description: 'Understand pulmonary and systemic circulation',
        duration: 10,
        pointsReward: 60,
        type: 'reading',
        content: [
          'Blood circulation occurs through two main pathways: pulmonary circulation and systemic circulation.',
          'Pulmonary circulation carries deoxygenated blood from the right ventricle to the lungs, where it picks up oxygen and releases carbon dioxide.',
          'Systemic circulation carries oxygenated blood from the left ventricle to all body tissues, delivering oxygen and nutrients.',
          'The heart acts as a dual pump, with the right side pumping blood to the lungs and the left side pumping blood to the rest of the body.'
        ],
        image: 'photo-1576091160550-2173dba999ef',
        imageDescription: 'Diagram illustrating pulmonary and systemic circulation pathways',
        quiz: {
          question: 'Which side of the heart pumps blood to the lungs?',
          options: ['Left side', 'Right side', 'Both sides equally', 'Neither side'],
          correct: 1,
          explanation: 'The right side of the heart (right atrium and ventricle) pumps deoxygenated blood to the lungs through pulmonary circulation, where the blood gets oxygenated.'
        }
      },
      {
        id: 'cardiac-cycle',
        title: 'The Cardiac Cycle',
        description: 'Learn about systole and diastole phases',
        duration: 7,
        pointsReward: 40,
        type: 'interactive',
        system: 'Cardiovascular System',
        subject: 'Physiology',
        steps: [
          {
            id: 'step-1',
            system: 'Cardiovascular System',
            subject: 'Physiology',
            sentence: 'The cardiac cycle consists of _____ main phases: _____ when the heart contracts and _____ when the heart relaxes.',
            blanks: [
              {
                id: 1,
                choices: ['one', 'two', 'three'],
                correct: 1,
                explanation: 'The cardiac cycle has two main phases'
              },
              {
                id: 2,
                choices: ['systole', 'diastole', 'pause'],
                correct: 0,
                explanation: 'Systole is the contraction phase when blood is pumped out'
              },
              {
                id: 3,
                choices: ['systole', 'diastole', 'pause'],
                correct: 1,
                explanation: 'Diastole is the relaxation phase when the heart fills with blood'
              }
            ],
            image: '/placeholder.svg',
            imageDescription: 'Diagram showing systole and diastole phases of the cardiac cycle'
          }
        ]
      }
    ]
  },
  {
    id: 'resp-fundamentals',
    system: 'Respiratory System',
    title: 'Respiratory System Basics',
    description: 'Explore breathing mechanics and gas exchange',
    icon: '🫁',
    totalPoints: 180,
    unlockLevel: 1,
    estimatedTime: 30,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'respiratory-anatomy',
        title: 'Respiratory System Anatomy',
        description: 'Learn the structure of the respiratory system',
        duration: 10,
        pointsReward: 60,
        type: 'reading',
        content: [
          'The respiratory system includes the nose, pharynx, larynx, trachea, bronchi, and lungs. Each part plays a crucial role in breathing.',
          'Air enters through the nose or mouth, travels down the trachea (windpipe), and branches into smaller tubes called bronchi.',
          'The bronchi continue to branch into smaller bronchioles, ending in tiny air sacs called alveoli.',
          'Gas exchange occurs in the alveoli, where oxygen enters the blood and carbon dioxide is removed.'
        ],
        image: 'photo-1559757175-0eb30cd8c063',
        imageDescription: 'Anatomical diagram of the respiratory system showing airways and lungs',
        quiz: {
          question: 'Where does gas exchange primarily occur in the lungs?',
          options: ['Bronchi', 'Bronchioles', 'Alveoli', 'Trachea'],
          correct: 2,
          explanation: 'Gas exchange occurs in the alveoli, tiny air sacs surrounded by capillaries where oxygen and carbon dioxide are exchanged between air and blood.'
        }
      },
      {
        id: 'breathing-mechanics',
        title: 'Mechanics of Breathing',
        description: 'Understand inspiration and expiration',
        duration: 8,
        pointsReward: 50,
        type: 'reading',
        content: [
          'Breathing involves two main processes: inspiration (inhaling) and expiration (exhaling).',
          'During inspiration, the diaphragm contracts and moves downward, expanding the chest cavity and drawing air into the lungs.',
          'The intercostal muscles between the ribs also contract, lifting the rib cage and further expanding the chest.',
          'During expiration, these muscles relax, the chest cavity decreases in size, and air is pushed out of the lungs.'
        ],
        quiz: {
          question: 'What happens to the diaphragm during inspiration?',
          options: ['It relaxes and moves up', 'It contracts and moves down', 'It stays in the same position', 'It moves sideways'],
          correct: 1,
          explanation: 'During inspiration, the diaphragm contracts and moves downward, creating more space in the chest cavity and allowing the lungs to expand and fill with air.'
        }
      },
      {
        id: 'gas-exchange',
        title: 'Gas Exchange Process',
        description: 'Learn how oxygen and CO2 are exchanged',
        duration: 12,
        pointsReward: 70,
        type: 'interactive',
        system: 'Respiratory System',
        subject: 'Physiology',
        steps: [
          {
            id: 'step-1',
            system: 'Respiratory System',
            subject: 'Physiology',
            sentence: 'In the alveoli, _____ moves from the air into the blood, while _____ moves from the blood into the air to be exhaled.',
            blanks: [
              {
                id: 1,
                choices: ['oxygen', 'carbon dioxide', 'nitrogen'],
                correct: 0,
                explanation: 'Oxygen moves from the air in alveoli into the bloodstream'
              },
              {
                id: 2,
                choices: ['oxygen', 'carbon dioxide', 'nitrogen'],
                correct: 1,
                explanation: 'Carbon dioxide moves from the blood into the alveoli to be exhaled'
              }
            ],
            image: '/placeholder.svg',
            imageDescription: 'Diagram showing gas exchange at the alveolar level'
          }
        ]
      }
    ]
  },
  {
    id: 'renal-physiology',
    system: 'Renal System',
    title: 'Kidney Function & Filtration',
    description: 'Master kidney anatomy and urine formation',
    icon: '🫘',
    totalPoints: 200,
    unlockLevel: 2,
    estimatedTime: 35,
    previewAvailable: false,
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'kidney-anatomy',
        title: 'Kidney Structure',
        description: 'Learn the anatomy of the kidneys',
        duration: 12,
        pointsReward: 70,
        type: 'reading',
        content: [
          'The kidneys are bean-shaped organs located on either side of the spine, below the rib cage.',
          'Each kidney contains about one million functional units called nephrons, which filter blood and produce urine.',
          'The nephron consists of a glomerulus (tiny blood vessels) and a tubule (small tube) that filters waste and excess water.',
          'The kidneys regulate blood pressure, produce red blood cells, and maintain the body\'s chemical balance.'
        ],
        quiz: {
          question: 'What is the functional unit of the kidney?',
          options: ['Glomerulus', 'Nephron', 'Tubule', 'Collecting duct'],
          correct: 1,
          explanation: 'The nephron is the functional unit of the kidney, containing a glomerulus and tubule that work together to filter blood and form urine.'
        }
      },
      {
        id: 'filtration-process',
        title: 'Urine Formation',
        description: 'Understand how urine is formed',
        duration: 15,
        pointsReward: 80,
        type: 'interactive',
        system: 'Renal System',
        subject: 'Physiology',
        steps: [
          {
            id: 'step-1',
            system: 'Renal System',
            subject: 'Physiology',
            sentence: 'Urine formation occurs through three main processes: _____ in the glomerulus, _____ in the tubules, and _____ of useful substances.',
            blanks: [
              {
                id: 1,
                choices: ['filtration', 'secretion', 'reabsorption'],
                correct: 0,
                explanation: 'Filtration occurs first in the glomerulus where blood is filtered'
              },
              {
                id: 2,
                choices: ['filtration', 'secretion', 'reabsorption'],
                correct: 1,
                explanation: 'Secretion occurs when additional wastes are added to the urine'
              },
              {
                id: 3,
                choices: ['filtration', 'secretion', 'reabsorption'],
                correct: 2,
                explanation: 'Reabsorption returns useful substances like glucose and water back to the blood'
              }
            ]
          }
        ]
      },
      {
        id: 'blood-pressure-regulation',
        title: 'Blood Pressure Control',
        description: 'Learn how kidneys regulate blood pressure',
        duration: 8,
        pointsReward: 50,
        type: 'reading',
        content: [
          'The kidneys play a crucial role in regulating blood pressure through multiple mechanisms.',
          'They control blood volume by adjusting how much water is retained or eliminated in urine.',
          'The kidneys produce renin, an enzyme that activates the renin-angiotensin system to increase blood pressure when needed.',
          'They also respond to hormones like aldosterone and antidiuretic hormone (ADH) to fine-tune blood pressure control.'
        ]
      }
    ]
  },
  {
    id: 'nervous-system',
    system: 'Nervous System',
    title: 'Neural Communication',
    description: 'Explore neurons and nerve signal transmission',
    icon: '🧠',
    totalPoints: 220,
    unlockLevel: 2,
    estimatedTime: 40,
    previewAvailable: false,
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'neuron-structure',
        title: 'Neuron Anatomy',
        description: 'Learn the parts of a neuron',
        duration: 10,
        pointsReward: 60,
        type: 'reading',
        content: [
          'Neurons are specialized cells that transmit electrical and chemical signals throughout the nervous system.',
          'A typical neuron has three main parts: the cell body (soma), dendrites, and an axon.',
          'Dendrites receive signals from other neurons, while the axon transmits signals away from the cell body.',
          'The synapse is the junction between neurons where chemical signals are passed from one neuron to another.'
        ],
        quiz: {
          question: 'Which part of the neuron receives signals from other neurons?',
          options: ['Axon', 'Cell body', 'Dendrites', 'Synapse'],
          correct: 2,
          explanation: 'Dendrites are branch-like extensions that receive chemical signals from other neurons and transmit them to the cell body.'
        }
      },
      {
        id: 'action-potential',
        title: 'Nerve Signal Transmission',
        description: 'Understand how electrical signals travel',
        duration: 15,
        pointsReward: 80,
        type: 'interactive',
        system: 'Nervous System',
        subject: 'Physiology',
        steps: [
          {
            id: 'step-1',
            system: 'Nervous System',
            subject: 'Physiology',
            sentence: 'An action potential is triggered when the neuron\'s membrane potential reaches the _____ threshold, causing _____ channels to open.',
            blanks: [
              {
                id: 1,
                choices: ['voltage', 'pressure', 'temperature'],
                correct: 0,
                explanation: 'The voltage threshold must be reached for an action potential to fire'
              },
              {
                id: 2,
                choices: ['potassium', 'sodium', 'calcium'],
                correct: 1,
                explanation: 'Sodium channels open first during an action potential, causing depolarization'
              }
            ]
          }
        ]
      },
      {
        id: 'neurotransmitters',
        title: 'Chemical Signaling',
        description: 'Learn about neurotransmitters and synapses',
        duration: 15,
        pointsReward: 80,
        type: 'reading',
        content: [
          'Neurotransmitters are chemical messengers that transmit signals across synapses between neurons.',
          'Common neurotransmitters include dopamine, serotonin, acetylcholine, and norepinephrine.',
          'When an electrical signal reaches the end of an axon, it triggers the release of neurotransmitters into the synaptic cleft.',
          'These chemicals bind to receptors on the receiving neuron, potentially triggering a new electrical signal.'
        ],
        quiz: {
          question: 'What are neurotransmitters?',
          options: ['Electrical signals', 'Chemical messengers', 'Types of neurons', 'Brain regions'],
          correct: 1,
          explanation: 'Neurotransmitters are chemical messengers that carry signals between neurons across synapses, allowing communication throughout the nervous system.'
        }
      }
    ]
  },
  {
    id: 'digestive-system',
    system: 'Digestive System',
    title: 'Digestion & Absorption',
    description: 'Learn how nutrients are processed and absorbed',
    icon: '🍎',
    totalPoints: 190,
    unlockLevel: 1,
    estimatedTime: 32,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'digestive-anatomy',
        title: 'Digestive System Overview',
        description: 'Learn the organs involved in digestion',
        duration: 12,
        pointsReward: 70,
        type: 'reading',
        content: [
          'The digestive system breaks down food into nutrients that the body can absorb and use for energy.',
          'The main organs include the mouth, esophagus, stomach, small intestine, large intestine, liver, and pancreas.',
          'Digestion begins in the mouth with mechanical breakdown by teeth and chemical breakdown by saliva.',
          'Food travels through the digestive tract, being broken down and absorbed along the way.'
        ],
        quiz: {
          question: 'Where does digestion begin?',
          options: ['Stomach', 'Small intestine', 'Mouth', 'Esophagus'],
          correct: 2,
          explanation: 'Digestion begins in the mouth where food is mechanically broken down by chewing and chemically broken down by enzymes in saliva.'
        }
      },
      {
        id: 'stomach-function',
        title: 'Stomach Acid & Enzymes',
        description: 'Understand gastric digestion',
        duration: 10,
        pointsReward: 60,
        type: 'reading',
        content: [
          'The stomach produces hydrochloric acid and pepsin to break down proteins.',
          'Gastric acid creates an acidic environment (pH 1.5-2.0) that activates pepsin and kills harmful bacteria.',
          'The stomach muscles contract to mix food with digestive juices, forming a substance called chyme.',
          'Chyme is gradually released into the small intestine for further digestion and absorption.'
        ]
      },
      {
        id: 'nutrient-absorption',
        title: 'Small Intestine Absorption',
        description: 'Learn how nutrients enter the bloodstream',
        duration: 10,
        pointsReward: 60,
        type: 'interactive',
        system: 'Digestive System',
        subject: 'Physiology',
        steps: [
          {
            id: 'step-1',
            system: 'Digestive System',
            subject: 'Physiology',
            sentence: 'The small intestine has millions of tiny projections called _____ that increase surface area for _____ absorption.',
            blanks: [
              {
                id: 1,
                choices: ['villi', 'cilia', 'neurons'],
                correct: 0,
                explanation: 'Villi are finger-like projections that increase the surface area of the small intestine'
              },
              {
                id: 2,
                choices: ['water', 'nutrient', 'oxygen'],
                correct: 1,
                explanation: 'The increased surface area allows for more efficient nutrient absorption'
              }
            ]
          }
        ]
      }
    ]
  }
];
