
import { LessonModule } from '../types';

export const biochemistryModules: LessonModule[] = [
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
  }
];
