export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  pointsReward: number;
  content: string[];
  type?: 'reading' | 'interactive';
  estimatedTime?: number;
  image?: string;
  imageDescription?: string;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface LessonModule {
  id: string;
  system: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  totalPoints: number;
  unlockLevel: number;
  estimatedTime: number;
  previewAvailable: boolean;
  prerequisites?: string[];
  difficulty: string;
  lessons: Lesson[];
}

// Mock module database with comprehensive data
const moduleDatabase: LessonModule[] = [
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
  },
  {
    id: 'cell-biology-genetics',
    system: 'Cell Biology',
    title: 'Cell Biology & Genetics',
    description: 'Explore cellular structure, function, and genetic principles.',
    icon: '🧬',
    totalPoints: 400,
    unlockLevel: 1,
    estimatedTime: 160,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-cell-1',
        title: 'Cell Structure and Organelles',
        description: 'Understanding the components of eukaryotic cells.',
        duration: 30,
        pointsReward: 60,
        content: [
          'Cells are the basic units of life, containing specialized organelles.',
          'The nucleus controls cellular activities and contains DNA.',
          'Mitochondria are the powerhouses, producing ATP through respiration.',
          'The endoplasmic reticulum and Golgi apparatus process and transport proteins.'
        ],
        type: 'interactive',
        estimatedTime: 30,
        quiz: {
          question: 'Which organelle is known as the "powerhouse of the cell"?',
          options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
          correct: 1,
          explanation: 'Mitochondria produce most of the cell\'s ATP through cellular respiration.'
        }
      },
      {
        id: 'lesson-cell-2',
        title: 'DNA Structure and Replication',
        description: 'The molecular basis of heredity.',
        duration: 35,
        pointsReward: 70,
        content: [
          'DNA is a double helix composed of nucleotides with four bases: A, T, G, C.',
          'Base pairing rules: A pairs with T, G pairs with C.',
          'DNA replication is semiconservative, each strand serves as a template.',
          'DNA polymerase synthesizes new strands in the 5\' to 3\' direction.'
        ],
        type: 'reading',
        estimatedTime: 35
      },
      {
        id: 'lesson-cell-3',
        title: 'Protein Synthesis',
        description: 'From genes to proteins: transcription and translation.',
        duration: 40,
        pointsReward: 80,
        content: [
          'Transcription creates mRNA from DNA in the nucleus.',
          'mRNA is processed and transported to ribosomes.',
          'Translation converts the genetic code into amino acid sequences.',
          'The genetic code is universal, with codons specifying amino acids.'
        ],
        type: 'interactive',
        estimatedTime: 40
      },
      {
        id: 'lesson-cell-4',
        title: 'Cell Division and Mitosis',
        description: 'How cells reproduce and maintain chromosome number.',
        duration: 35,
        pointsReward: 75,
        content: [
          'The cell cycle consists of interphase and mitotic phase.',
          'DNA replication occurs during S phase of interphase.',
          'Mitosis ensures equal distribution of chromosomes.',
          'Checkpoints prevent errors in cell division.'
        ],
        type: 'reading',
        estimatedTime: 35
      },
      {
        id: 'lesson-cell-5',
        title: 'Mendelian Genetics',
        description: 'Basic principles of inheritance.',
        duration: 32,
        pointsReward: 65,
        content: [
          'Mendel\'s laws describe how traits are inherited.',
          'Alleles are different versions of the same gene.',
          'Dominant alleles mask recessive alleles in heterozygotes.',
          'Punnett squares predict offspring genotypes and phenotypes.'
        ],
        type: 'interactive',
        estimatedTime: 32
      },
      {
        id: 'lesson-cell-6',
        title: 'Gene Expression Regulation',
        description: 'How cells control when and where genes are active.',
        duration: 28,
        pointsReward: 50,
        content: [
          'Gene expression can be regulated at transcriptional and post-transcriptional levels.',
          'Promoters and enhancers control transcription initiation.',
          'Epigenetic modifications affect gene expression without changing DNA sequence.',
          'Cell differentiation results from differential gene expression.'
        ],
        type: 'reading',
        estimatedTime: 28
      }
    ]
  },
  {
    id: 'medical-biochemistry',
    system: 'Biochemistry',
    title: 'Medical Biochemistry',
    description: 'Essential biochemical processes in health and disease.',
    icon: '⚗️',
    totalPoints: 380,
    unlockLevel: 2,
    estimatedTime: 150,
    previewAvailable: false,
    prerequisites: ['intro-physiology'],
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'lesson-biochem-1',
        title: 'Enzyme Kinetics',
        description: 'Understanding how enzymes catalyze biochemical reactions.',
        duration: 35,
        pointsReward: 70,
        content: [
          'Enzymes lower activation energy to speed up reactions.',
          'The Michaelis-Menten equation describes enzyme kinetics.',
          'Competitive inhibitors compete with substrate for active site.',
          'Non-competitive inhibitors bind to allosteric sites.'
        ],
        type: 'interactive',
        estimatedTime: 35
      },
      {
        id: 'lesson-biochem-2',
        title: 'Glycolysis and Gluconeogenesis',
        description: 'Glucose metabolism pathways.',
        duration: 40,
        pointsReward: 80,
        content: [
          'Glycolysis breaks down glucose to pyruvate, producing ATP.',
          'The pathway occurs in the cytoplasm and has regulatory steps.',
          'Gluconeogenesis synthesizes glucose from non-carbohydrate sources.',
          'These pathways are reciprocally regulated.'
        ],
        type: 'reading',
        estimatedTime: 40
      },
      {
        id: 'lesson-biochem-3',
        title: 'Citric Acid Cycle',
        description: 'The central metabolic pathway.',
        duration: 38,
        pointsReward: 75,
        content: [
          'The citric acid cycle oxidizes acetyl-CoA to CO2.',
          'It produces NADH, FADH2, and GTP for energy.',
          'The cycle occurs in the mitochondrial matrix.',
          'It serves as a hub connecting carbohydrate, fat, and protein metabolism.'
        ],
        type: 'interactive',
        estimatedTime: 38
      },
      {
        id: 'lesson-biochem-4',
        title: 'Electron Transport Chain',
        description: 'Oxidative phosphorylation and ATP synthesis.',
        duration: 42,
        pointsReward: 85,
        content: [
          'The electron transport chain transfers electrons through protein complexes.',
          'Energy released pumps protons across the inner mitochondrial membrane.',
          'ATP synthase uses the proton gradient to synthesize ATP.',
          'This process is called chemiosmotic coupling.'
        ],
        type: 'reading',
        estimatedTime: 42
      },
      {
        id: 'lesson-biochem-5',
        title: 'Lipid Metabolism',
        description: 'Fat synthesis and breakdown.',
        duration: 35,
        pointsReward: 70,
        content: [
          'Beta-oxidation breaks down fatty acids to acetyl-CoA.',
          'Fatty acid synthesis occurs in the cytoplasm.',
          'Ketone bodies are produced when glucose is scarce.',
          'Cholesterol synthesis is tightly regulated.'
        ],
        type: 'interactive',
        estimatedTime: 35
      }
    ]
  },
  {
    id: 'cardio-basics',
    system: 'Cardiovascular System',
    title: 'Heart Fundamentals',
    description: 'Master the essential concepts of cardiac anatomy and physiology.',
    icon: '🫀',
    totalPoints: 300,
    unlockLevel: 1,
    estimatedTime: 120,
    previewAvailable: false,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Heart Anatomy',
        description: 'Explore the four chambers and major vessels of the heart.',
        duration: 15,
        pointsReward: 40,
        content: [
          'The heart is a muscular organ that pumps blood throughout your body.',
          'It has four chambers: two atria (upper chambers) and two ventricles (lower chambers).',
          'The right side pumps blood to the lungs, while the left side pumps blood to the rest of the body.',
          'Major vessels include the aorta, pulmonary artery, and vena cava.'
        ],
        type: 'interactive',
        estimatedTime: 15,
        quiz: {
          question: 'How many chambers does the human heart have?',
          options: ['2', '3', '4', '5'],
          correct: 2,
          explanation: 'The human heart has four chambers: two atria and two ventricles.'
        }
      },
      {
        id: 'lesson-2',
        title: 'Cardiac Cycle',
        description: 'Understanding systole and diastole phases.',
        duration: 20,
        pointsReward: 50,
        content: [
          'The cardiac cycle is the sequence of events that occurs in one heartbeat.',
          'It consists of two main phases: systole (contraction) and diastole (relaxation).',
          'During systole, the heart contracts and pumps blood out.',
          'During diastole, the heart relaxes and fills with blood.'
        ],
        type: 'reading',
        estimatedTime: 20,
        quiz: {
          question: 'What happens during systole?',
          options: ['Heart relaxes', 'Heart contracts', 'Blood flows in', 'Valves open'],
          correct: 1,
          explanation: 'During systole, the heart muscle contracts to pump blood out.'
        }
      },
      {
        id: 'lesson-3',
        title: 'Heart Valves',
        description: 'Function of tricuspid, pulmonary, mitral, and aortic valves.',
        duration: 18,
        pointsReward: 45,
        content: [
          'Heart valves ensure one-way blood flow through the heart.',
          'The tricuspid valve controls flow between right atrium and right ventricle.',
          'The pulmonary valve controls flow from right ventricle to pulmonary artery.',
          'The mitral (bicuspid) valve controls flow between left atrium and left ventricle.',
          'The aortic valve controls flow from left ventricle to the aorta.'
        ],
        type: 'interactive',
        estimatedTime: 18
      },
      {
        id: 'lesson-4',
        title: 'Blood Pressure',
        description: 'Systolic and diastolic pressure regulation.',
        duration: 22,
        pointsReward: 55,
        content: [
          'Blood pressure is the force exerted by blood against arterial walls.',
          'Systolic pressure occurs during heart contraction.',
          'Diastolic pressure occurs during heart relaxation.',
          'Normal blood pressure is essential for proper organ function.'
        ],
        type: 'reading',
        estimatedTime: 22
      },
      {
        id: 'lesson-5',
        title: 'Cardiac Output',
        description: 'Understanding stroke volume and heart rate relationship.',
        duration: 25,
        pointsReward: 60,
        content: [
          'Cardiac output is the volume of blood pumped by the heart per minute.',
          'It equals stroke volume multiplied by heart rate.',
          'Normal cardiac output is approximately 5 liters per minute.',
          'Factors affecting cardiac output include preload, afterload, and contractility.'
        ],
        type: 'interactive',
        estimatedTime: 25
      },
      {
        id: 'lesson-6',
        title: 'ECG Basics',
        description: 'Introduction to electrocardiogram interpretation.',
        duration: 30,
        pointsReward: 70,
        content: [
          'An ECG records the electrical activity of the heart.',
          'The P wave represents atrial depolarization.',
          'The QRS complex represents ventricular depolarization.',
          'The T wave represents ventricular repolarization.'
        ],
        type: 'reading',
        estimatedTime: 30
      }
    ]
  },
  {
    id: 'resp-fundamentals',
    system: 'Respiratory System',
    title: 'Breathing Basics',
    description: 'Essential respiratory anatomy and gas exchange principles.',
    icon: '🫁',
    totalPoints: 280,
    unlockLevel: 1,
    estimatedTime: 110,
    previewAvailable: true,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-7',
        title: 'Lung Structure',
        description: 'Anatomy of lungs, bronchi, and alveoli.',
        duration: 15,
        pointsReward: 35,
        content: [
          'The lungs are paired organs located in the chest cavity.',
          'They are responsible for gas exchange between air and blood.',
          'Each lung is divided into lobes and contains millions of alveoli.',
          'The bronchial tree carries air from the trachea to alveoli.'
        ],
        type: 'reading',
        estimatedTime: 15
      },
      {
        id: 'lesson-8',
        title: 'Gas Exchange',
        description: 'Oxygen and carbon dioxide transport.',
        duration: 20,
        pointsReward: 45,
        content: [
          'Gas exchange occurs in the alveoli.',
          'Oxygen enters the blood and carbon dioxide is removed.',
          'This process is driven by concentration gradients.',
          'The thin alveolar walls allow efficient gas exchange.'
        ],
        type: 'interactive',
        estimatedTime: 20
      },
      {
        id: 'lesson-9',
        title: 'Breathing Control',
        description: 'Neural control of respiration.',
        duration: 25,
        pointsReward: 50,
        content: [
          'Breathing is controlled by the respiratory center in the medulla.',
          'Chemical receptors monitor CO2 and O2 levels.',
          'The phrenic nerve controls diaphragm movement.',
          'Voluntary control can override automatic breathing.'
        ],
        type: 'reading',
        estimatedTime: 25
      },
      {
        id: 'lesson-10',
        title: 'Lung Volumes',
        description: 'Understanding tidal volume, vital capacity, and residual volume.',
        duration: 22,
        pointsReward: 55,
        content: [
          'Tidal volume is the normal breathing volume (500ml).',
          'Vital capacity is the maximum air that can be exhaled.',
          'Residual volume is air remaining after forced expiration.',
          'Total lung capacity includes all lung volumes combined.'
        ],
        type: 'interactive',
        estimatedTime: 22
      },
      {
        id: 'lesson-11',
        title: 'Oxygen Transport',
        description: 'How oxygen binds to hemoglobin and travels in blood.',
        duration: 28,
        pointsReward: 60,
        content: [
          'Hemoglobin carries most oxygen in the blood.',
          'Each hemoglobin molecule can bind four oxygen molecules.',
          'Oxygen-hemoglobin dissociation curve shows binding affinity.',
          'Factors like pH and temperature affect oxygen binding.'
        ],
        type: 'reading',
        estimatedTime: 28
      },
      {
        id: 'lesson-12',
        title: 'Respiratory Disorders',
        description: 'Common conditions affecting respiratory function.',
        duration: 25,
        pointsReward: 65,
        content: [
          'Asthma causes bronchial constriction and inflammation.',
          'COPD includes emphysema and chronic bronchitis.',
          'Pneumonia is infection of lung parenchyma.',
          'Pulmonary edema involves fluid accumulation in lungs.'
        ],
        type: 'interactive',
        estimatedTime: 25
      }
    ]
  },
  {
    id: 'renal-physiology',
    system: 'Urogenital System',
    title: 'Kidney Function',
    description: 'Filtration, reabsorption, and fluid balance.',
    icon: '💧',
    totalPoints: 350,
    unlockLevel: 2,
    estimatedTime: 140,
    previewAvailable: false,
    prerequisites: ['cardio-basics'],
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'lesson-13',
        title: 'Nephron Structure',
        description: 'Functional unit of the kidney.',
        duration: 25,
        pointsReward: 50,
        content: [
          'The nephron is the functional unit of the kidney.',
          'It consists of a glomerulus and renal tubule.',
          'Each kidney contains about 1 million nephrons.',
          'Nephrons filter blood and produce urine.'
        ],
        type: 'interactive',
        estimatedTime: 25
      },
      {
        id: 'lesson-14',
        title: 'Filtration Process',
        description: 'Glomerular filtration and pressure.',
        duration: 30,
        pointsReward: 60,
        content: [
          'Glomerular filtration removes waste from blood.',
          'Filtration pressure drives the process.',
          'The filtration barrier prevents protein loss.',
          'GFR measures kidney function.'
        ],
        type: 'reading',
        estimatedTime: 30
      },
      {
        id: 'lesson-15',
        title: 'Reabsorption',
        description: 'Selective reabsorption in tubules.',
        duration: 30,
        pointsReward: 65,
        content: [
          'The tubules reabsorb useful substances.',
          'Glucose and amino acids are completely reabsorbed.',
          'Water reabsorption is regulated by ADH.',
          'Sodium reabsorption affects blood pressure.'
        ],
        type: 'interactive',
        estimatedTime: 30
      },
      {
        id: 'lesson-16',
        title: 'Acid-Base Balance',
        description: 'How kidneys regulate blood pH.',
        duration: 28,
        pointsReward: 70,
        content: [
          'Kidneys maintain blood pH between 7.35-7.45.',
          'They excrete hydrogen ions and retain bicarbonate.',
          'Tubular secretion helps eliminate acids.',
          'Compensatory mechanisms work with lungs.'
        ],
        type: 'reading',
        estimatedTime: 28
      },
      {
        id: 'lesson-17',
        title: 'Hormone Regulation',
        description: 'ADH, aldosterone, and their effects on kidney function.',
        duration: 27,
        pointsReward: 75,
        content: [
          'ADH regulates water reabsorption in collecting ducts.',
          'Aldosterone increases sodium reabsorption.',
          'Renin-angiotensin system controls blood pressure.',
          'Parathyroid hormone affects calcium handling.'
        ],
        type: 'interactive',
        estimatedTime: 27
      }
    ]
  },
  {
    id: 'nervous-system',
    system: 'Nervous System',
    title: 'Neural Networks',
    description: 'Understanding brain function, neurotransmitters, and signal transmission.',
    icon: '🧠',
    totalPoints: 400,
    unlockLevel: 2,
    estimatedTime: 160,
    previewAvailable: true,
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'lesson-18',
        title: 'Neuron Structure',
        description: 'Anatomy of nerve cells and their components.',
        duration: 20,
        pointsReward: 45,
        content: [
          'Neurons are the basic functional units of the nervous system.',
          'They consist of cell body, dendrites, and axon.',
          'Myelin sheath insulates axons for faster conduction.',
          'Synapses are connections between neurons.'
        ],
        type: 'interactive',
        estimatedTime: 20
      },
      {
        id: 'lesson-19',
        title: 'Action Potentials',
        description: 'How electrical signals travel through neurons.',
        duration: 25,
        pointsReward: 55,
        content: [
          'Action potentials are electrical impulses in neurons.',
          'They result from sodium and potassium ion movement.',
          'Depolarization and repolarization create the signal.',
          'All-or-nothing principle governs action potentials.'
        ],
        type: 'reading',
        estimatedTime: 25
      },
      {
        id: 'lesson-20',
        title: 'Neurotransmitters',
        description: 'Chemical messengers in the nervous system.',
        duration: 30,
        pointsReward: 65,
        content: [
          'Neurotransmitters are chemical signals between neurons.',
          'Acetylcholine, dopamine, and serotonin are key examples.',
          'They bind to specific receptors on target cells.',
          'Imbalances can lead to neurological disorders.'
        ],
        type: 'interactive',
        estimatedTime: 30
      },
      {
        id: 'lesson-21',
        title: 'Brain Anatomy',
        description: 'Structure and function of different brain regions.',
        duration: 35,
        pointsReward: 75,
        content: [
          'The cerebrum is divided into four lobes.',
          'The brainstem controls vital functions.',
          'The cerebellum coordinates movement and balance.',
          'The limbic system processes emotions and memory.'
        ],
        type: 'reading',
        estimatedTime: 35
      },
      {
        id: 'lesson-22',
        title: 'Spinal Cord',
        description: 'Structure and function of the spinal cord.',
        duration: 25,
        pointsReward: 60,
        content: [
          'The spinal cord connects brain to peripheral nerves.',
          'Gray matter contains cell bodies and synapses.',
          'White matter contains myelinated axon tracts.',
          'Reflexes can occur without brain involvement.'
        ],
        type: 'interactive',
        estimatedTime: 25
      },
      {
        id: 'lesson-23',
        title: 'Autonomic Nervous System',
        description: 'Sympathetic and parasympathetic divisions.',
        duration: 25,
        pointsReward: 70,
        content: [
          'The autonomic system controls involuntary functions.',
          'Sympathetic division prepares for fight-or-flight.',
          'Parasympathetic division promotes rest-and-digest.',
          'Both divisions work together to maintain balance.'
        ],
        type: 'reading',
        estimatedTime: 25
      }
    ]
  },
  {
    id: 'digestive-system',
    system: 'Digestive System',
    title: 'Nutrition Processing',
    description: 'From mouth to absorption - understanding digestion and metabolism.',
    icon: '🍎',
    totalPoints: 320,
    unlockLevel: 1,
    estimatedTime: 130,
    previewAvailable: false,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'lesson-24',
        title: 'Digestive Tract Anatomy',
        description: 'Structure of the gastrointestinal system.',
        duration: 22,
        pointsReward: 40,
        content: [
          'The GI tract extends from mouth to anus.',
          'It includes esophagus, stomach, and intestines.',
          'Accessory organs include liver, pancreas, and gallbladder.',
          'Each region has specialized functions.'
        ],
        type: 'interactive',
        estimatedTime: 22
      },
      {
        id: 'lesson-25',
        title: 'Mechanical Digestion',
        description: 'Physical breakdown of food.',
        duration: 18,
        pointsReward: 35,
        content: [
          'Mechanical digestion begins with chewing.',
          'Stomach churning further breaks down food.',
          'Segmentation mixes food in the small intestine.',
          'Peristalsis moves food through the tract.'
        ],
        type: 'reading',
        estimatedTime: 18
      },
      {
        id: 'lesson-26',
        title: 'Chemical Digestion',
        description: 'Enzymes and their role in breaking down nutrients.',
        duration: 28,
        pointsReward: 55,
        content: [
          'Enzymes break down macromolecules into smaller units.',
          'Amylase digests carbohydrates.',
          'Pepsin and trypsin break down proteins.',
          'Lipases digest fats into fatty acids.'
        ],
        type: 'interactive',
        estimatedTime: 28
      },
      {
        id: 'lesson-27',
        title: 'Absorption',
        description: 'How nutrients enter the bloodstream.',
        duration: 25,
        pointsReward: 50,
        content: [
          'Most absorption occurs in the small intestine.',
          'Villi and microvilli increase surface area.',
          'Different nutrients use different transport mechanisms.',
          'The large intestine mainly absorbs water.'
        ],
        type: 'reading',
        estimatedTime: 25
      },
      {
        id: 'lesson-28',
        title: 'Liver Function',
        description: 'Metabolic roles of the liver.',
        duration: 30,
        pointsReward: 65,
        content: [
          'The liver produces bile for fat digestion.',
          'It metabolizes carbohydrates, proteins, and fats.',
          'Detoxification removes harmful substances.',
          'It stores vitamins and glycogen.'
        ],
        type: 'interactive',
        estimatedTime: 30
      },
      {
        id: 'lesson-29',
        title: 'Hormonal Control',
        description: 'Hormones that regulate digestion.',
        duration: 27,
        pointsReward: 60,
        content: [
          'Gastrin stimulates stomach acid production.',
          'CCK triggers enzyme and bile release.',
          'Secretin regulates pancreatic bicarbonate.',
          'GIP inhibits gastric motility.'
        ],
        type: 'reading',
        estimatedTime: 27
      }
    ]
  }
];

// Mock user progress data with detailed lesson tracking
let userProgress = {
  'cardio-basics': {
    completed: false,
    completedLessons: 1,
    earnedPoints: 40,
    unlockedLessons: 2,
    completedLessonIds: ['lesson-1']
  },
  'resp-fundamentals': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'renal-physiology': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'nervous-system': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'digestive-system': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'intro-physiology': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'cell-biology-genetics': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  },
  'medical-biochemistry': {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1,
    completedLessonIds: []
  }
};

// Function to retrieve user progress from local storage (or initialize)
export const getUserProgress = () => {
  // For simplicity, using a mock. In real app, use local storage.
  return userProgress;
};

// Function to update user progress (e.g., when a lesson is completed)
export const updateUserProgress = (moduleId: string, lessonId: string, points: number) => {
  if (!userProgress[moduleId]) {
    userProgress[moduleId] = {
      completed: false,
      completedLessons: 0,
      earnedPoints: 0,
      unlockedLessons: 1,
      completedLessonIds: []
    };
  }

  const module = moduleDatabase.find(m => m.id === moduleId);
  const currentLessonIndex = module?.lessons.findIndex(lesson => lesson.id === lessonId) ?? -1;
  if (currentLessonIndex !== -1 && currentLessonIndex + 1 < (module?.lessons.length ?? 0)) {
    userProgress[moduleId].unlockedLessons = Math.max(userProgress[moduleId].unlockedLessons, currentLessonIndex + 2);
  }

  userProgress[moduleId].completedLessons += 1;
  userProgress[moduleId].earnedPoints += points;
  userProgress[moduleId].completedLessonIds = [...(userProgress[moduleId].completedLessonIds || []), lessonId];

  if (userProgress[moduleId].completedLessons >= moduleDatabase.find(m => m.id === moduleId)!.lessons.length) {
    userProgress[moduleId].completed = true;
  }

  console.log(`Updated progress for module ${moduleId}:`, userProgress[moduleId]);
};

// Function to determine the highest unlocked level
export const getUnlockedLevel = (): number => {
  return 2;
};

// Function to calculate total user points
export const getTotalUserPoints = (): number => {
  let totalPoints = 0;
  for (const moduleId in userProgress) {
    totalPoints += userProgress[moduleId].earnedPoints || 0;
  }
  return totalPoints;
};

export const getModulesBySystem = (system: string): LessonModule[] => {
  return moduleDatabase.filter(module => module.system === system);
};

export const getModuleById = (moduleId: string): LessonModule | null => {
  return moduleDatabase.find(module => module.id === moduleId) || null;
};

export const getAllModules = (): LessonModule[] => {
  return moduleDatabase;
};

// Function to save user progress
export const saveUserProgress = (moduleId: string, lessonIndex: number, completedLessons: number, isModuleComplete: boolean, earnedPoints: number) => {
  if (!userProgress[moduleId]) {
    userProgress[moduleId] = {
      completed: false,
      completedLessons: 0,
      earnedPoints: 0,
      unlockedLessons: 1,
      completedLessonIds: [],
      currentLesson: 0
    };
  }

  userProgress[moduleId].currentLesson = lessonIndex;
  userProgress[moduleId].completedLessons = completedLessons;
  userProgress[moduleId].completed = isModuleComplete;
  userProgress[moduleId].earnedPoints = earnedPoints;

  console.log(`Saved progress for module ${moduleId}:`, userProgress[moduleId]);
};
