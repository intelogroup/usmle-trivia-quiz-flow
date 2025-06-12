
import { LessonModule } from '../types';

export const cellBiologyModules: LessonModule[] = [
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
  }
];
