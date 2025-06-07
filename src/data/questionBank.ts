
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subjects: string[];
  systems: string[];
  difficulty: number;
  questionType: 'multiple-choice' | 'true-false';
}

export const questionBank: Question[] = [
  // Cardiovascular System Questions
  {
    id: 1,
    question: "Which chamber of the heart has the thickest muscular wall?",
    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
    correctAnswer: 3,
    explanation: "The left ventricle has the thickest muscular wall as it needs to pump blood to the entire systemic circulation with high pressure.",
    subjects: ["Anatomy", "Physiology"],
    systems: ["Cardiovascular System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },
  {
    id: 2,
    question: "What is the normal range for systolic blood pressure in adults?",
    options: ["90-120 mmHg", "120-140 mmHg", "140-160 mmHg", "160-180 mmHg"],
    correctAnswer: 0,
    explanation: "Normal systolic blood pressure in adults is between 90-120 mmHg. Values above 120 mmHg may indicate elevated blood pressure.",
    subjects: ["Physiology", "Clinical Medicine"],
    systems: ["Cardiovascular System"],
    difficulty: 1,
    questionType: "multiple-choice"
  },
  {
    id: 3,
    question: "Which medication is commonly used to treat hypertension by blocking ACE?",
    options: ["Lisinopril", "Metoprolol", "Amlodipine", "Hydrochlorothiazide"],
    correctAnswer: 0,
    explanation: "Lisinopril is an ACE inhibitor that blocks the conversion of angiotensin I to angiotensin II, reducing blood pressure.",
    subjects: ["Pharmacology", "Clinical Medicine"],
    systems: ["Cardiovascular System"],
    difficulty: 3,
    questionType: "multiple-choice"
  },
  {
    id: 4,
    question: "Atherosclerosis primarily affects which layer of the arterial wall?",
    options: ["Intima", "Media", "Adventitia", "Endothelium only"],
    correctAnswer: 0,
    explanation: "Atherosclerosis primarily affects the intima (innermost layer) of arteries, where lipid plaques accumulate.",
    subjects: ["Pathology", "Anatomy"],
    systems: ["Cardiovascular System"],
    difficulty: 3,
    questionType: "multiple-choice"
  },

  // Respiratory System Questions
  {
    id: 5,
    question: "Which structure prevents food from entering the trachea during swallowing?",
    options: ["Epiglottis", "Uvula", "Soft palate", "Vocal cords"],
    correctAnswer: 0,
    explanation: "The epiglottis is a flap of cartilage that covers the glottis during swallowing to prevent aspiration.",
    subjects: ["Anatomy", "Physiology"],
    systems: ["Respiratory System"],
    difficulty: 1,
    questionType: "multiple-choice"
  },
  {
    id: 6,
    question: "What is the most common cause of community-acquired pneumonia?",
    options: ["Streptococcus pneumoniae", "Haemophilus influenzae", "Mycoplasma pneumoniae", "Staphylococcus aureus"],
    correctAnswer: 0,
    explanation: "Streptococcus pneumoniae is the most common bacterial cause of community-acquired pneumonia in adults.",
    subjects: ["Microbiology", "Pathology", "Clinical Medicine"],
    systems: ["Respiratory System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },
  {
    id: 7,
    question: "Which medication is a bronchodilator used in asthma treatment?",
    options: ["Prednisone", "Albuterol", "Montelukast", "Fluticasone"],
    correctAnswer: 1,
    explanation: "Albuterol is a short-acting beta-2 agonist that causes bronchodilation and is used for acute asthma symptoms.",
    subjects: ["Pharmacology", "Clinical Medicine"],
    systems: ["Respiratory System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },

  // Nervous System Questions
  {
    id: 8,
    question: "Which part of the brain is responsible for balance and coordination?",
    options: ["Cerebrum", "Cerebellum", "Brain stem", "Thalamus"],
    correctAnswer: 1,
    explanation: "The cerebellum is responsible for balance, coordination, and fine motor control.",
    subjects: ["Anatomy", "Physiology"],
    systems: ["Nervous System"],
    difficulty: 1,
    questionType: "multiple-choice"
  },
  {
    id: 9,
    question: "What is the most common cause of stroke?",
    options: ["Cerebral hemorrhage", "Cerebral thrombosis", "Cerebral embolism", "Subarachnoid hemorrhage"],
    correctAnswer: 1,
    explanation: "Cerebral thrombosis (ischemic stroke) accounts for approximately 80% of all strokes.",
    subjects: ["Pathology", "Clinical Medicine"],
    systems: ["Nervous System", "Cardiovascular System"],
    difficulty: 3,
    questionType: "multiple-choice"
  },

  // Gastrointestinal System Questions
  {
    id: 10,
    question: "Which enzyme is primarily responsible for protein digestion in the stomach?",
    options: ["Amylase", "Lipase", "Pepsin", "Trypsin"],
    correctAnswer: 2,
    explanation: "Pepsin is the main proteolytic enzyme in the stomach, activated by the acidic environment.",
    subjects: ["Biochemistry", "Physiology"],
    systems: ["Gastrointestinal System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },
  {
    id: 11,
    question: "Which medication reduces stomach acid production by blocking H2 receptors?",
    options: ["Omeprazole", "Ranitidine", "Sucralfate", "Misoprostol"],
    correctAnswer: 1,
    explanation: "Ranitidine is an H2 receptor antagonist that reduces stomach acid production by blocking histamine receptors.",
    subjects: ["Pharmacology"],
    systems: ["Gastrointestinal System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },

  // Musculoskeletal System Questions
  {
    id: 12,
    question: "Which type of joint allows the greatest range of motion?",
    options: ["Hinge joint", "Ball-and-socket joint", "Pivot joint", "Saddle joint"],
    correctAnswer: 1,
    explanation: "Ball-and-socket joints (like the shoulder and hip) allow movement in all planes and provide the greatest range of motion.",
    subjects: ["Anatomy"],
    systems: ["Musculoskeletal System"],
    difficulty: 1,
    questionType: "multiple-choice"
  },
  {
    id: 13,
    question: "Which condition is characterized by decreased bone density?",
    options: ["Osteoarthritis", "Osteoporosis", "Rheumatoid arthritis", "Osteomyelitis"],
    correctAnswer: 1,
    explanation: "Osteoporosis is characterized by decreased bone mineral density and increased risk of fractures.",
    subjects: ["Pathology", "Clinical Medicine"],
    systems: ["Musculoskeletal System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },

  // Endocrine System Questions
  {
    id: 14,
    question: "Which hormone regulates blood glucose levels by promoting glucose uptake?",
    options: ["Glucagon", "Insulin", "Cortisol", "Growth hormone"],
    correctAnswer: 1,
    explanation: "Insulin promotes glucose uptake by cells and lowers blood glucose levels.",
    subjects: ["Physiology", "Biochemistry"],
    systems: ["Endocrine System"],
    difficulty: 1,
    questionType: "multiple-choice"
  },
  {
    id: 15,
    question: "Which medication is used to treat type 2 diabetes by increasing insulin sensitivity?",
    options: ["Metformin", "Insulin", "Glipizide", "Acarbose"],
    correctAnswer: 0,
    explanation: "Metformin increases insulin sensitivity and decreases hepatic glucose production.",
    subjects: ["Pharmacology", "Clinical Medicine"],
    systems: ["Endocrine System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },

  // Genitourinary System Questions
  {
    id: 16,
    question: "Which structure filters blood in the kidney?",
    options: ["Glomerulus", "Proximal tubule", "Loop of Henle", "Collecting duct"],
    correctAnswer: 0,
    explanation: "The glomerulus is a cluster of capillaries where blood filtration occurs in the kidney.",
    subjects: ["Anatomy", "Physiology"],
    systems: ["Genitourinary System"],
    difficulty: 1,
    questionType: "multiple-choice"
  },
  {
    id: 17,
    question: "Which medication is commonly used to treat urinary tract infections?",
    options: ["Trimethoprim-sulfamethoxazole", "Metformin", "Lisinopril", "Albuterol"],
    correctAnswer: 0,
    explanation: "Trimethoprim-sulfamethoxazole is a commonly used antibiotic for treating urinary tract infections.",
    subjects: ["Pharmacology", "Microbiology"],
    systems: ["Genitourinary System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },

  // Immune System Questions
  {
    id: 18,
    question: "Which cells are primarily responsible for cell-mediated immunity?",
    options: ["B cells", "T cells", "Natural killer cells", "Macrophages"],
    correctAnswer: 1,
    explanation: "T cells, particularly CD8+ cytotoxic T cells, are primarily responsible for cell-mediated immunity.",
    subjects: ["Immunology", "Physiology"],
    systems: ["Immune System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },
  {
    id: 19,
    question: "Which immunoglobulin is most abundant in serum?",
    options: ["IgA", "IgG", "IgM", "IgE"],
    correctAnswer: 1,
    explanation: "IgG is the most abundant immunoglobulin in serum and provides long-term immunity.",
    subjects: ["Immunology", "Biochemistry"],
    systems: ["Immune System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },

  // Integumentary System Questions
  {
    id: 20,
    question: "Which layer of the skin contains melanocytes?",
    options: ["Stratum corneum", "Stratum basale", "Dermis", "Hypodermis"],
    correctAnswer: 1,
    explanation: "Melanocytes are found in the stratum basale (basal layer) of the epidermis.",
    subjects: ["Anatomy", "Histology"],
    systems: ["Integumentary System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },

  // Additional cross-system questions
  {
    id: 21,
    question: "Which vitamin deficiency causes scurvy?",
    options: ["Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin K"],
    correctAnswer: 1,
    explanation: "Scurvy is caused by vitamin C (ascorbic acid) deficiency, leading to collagen synthesis problems.",
    subjects: ["Biochemistry", "Pathology"],
    systems: ["Musculoskeletal System", "Integumentary System"],
    difficulty: 1,
    questionType: "multiple-choice"
  },
  {
    id: 22,
    question: "Which medication can cause ototoxicity as a side effect?",
    options: ["Penicillin", "Gentamicin", "Metformin", "Aspirin"],
    correctAnswer: 1,
    explanation: "Gentamicin, an aminoglycoside antibiotic, can cause ototoxicity affecting hearing and balance.",
    subjects: ["Pharmacology"],
    systems: ["Sensory Systems", "Nervous System"],
    difficulty: 3,
    questionType: "multiple-choice"
  },
  {
    id: 23,
    question: "During embryonic development, which structure gives rise to the central nervous system?",
    options: ["Neural crest", "Neural tube", "Notochord", "Somites"],
    correctAnswer: 1,
    explanation: "The neural tube gives rise to the central nervous system (brain and spinal cord) during embryonic development.",
    subjects: ["Embryology", "Anatomy"],
    systems: ["Nervous System"],
    difficulty: 3,
    questionType: "multiple-choice"
  },
  {
    id: 24,
    question: "Which imaging technique is best for visualizing soft tissue structures?",
    options: ["X-ray", "CT scan", "MRI", "Ultrasound"],
    correctAnswer: 2,
    explanation: "MRI provides excellent soft tissue contrast and is best for visualizing soft tissue structures.",
    subjects: ["Radiology"],
    systems: ["Musculoskeletal System", "Nervous System"],
    difficulty: 2,
    questionType: "multiple-choice"
  },
  {
    id: 25,
    question: "Which surgical approach is used for appendectomy?",
    options: ["Laparoscopic", "Open", "Both laparoscopic and open", "Endoscopic"],
    correctAnswer: 2,
    explanation: "Appendectomy can be performed using both laparoscopic and open surgical approaches, depending on the clinical situation.",
    subjects: ["Surgery"],
    systems: ["Gastrointestinal System"],
    difficulty: 2,
    questionType: "multiple-choice"
  }
];

export const subjects = [
  "Anatomy",
  "Physiology", 
  "Pathology",
  "Pharmacology",
  "Microbiology",
  "Immunology",
  "Biochemistry",
  "Embryology",
  "Histology",
  "Radiology",
  "Clinical Medicine",
  "Surgery"
];

export const systems = [
  "Cardiovascular System",
  "Respiratory System", 
  "Nervous System",
  "Musculoskeletal System",
  "Gastrointestinal System",
  "Genitourinary System",
  "Endocrine System",
  "Reproductive System",
  "Integumentary System",
  "Hematologic System",
  "Immune System",
  "Sensory Systems"
];

export const getFilteredQuestions = (selectedSubjects: string[], selectedSystems: string[]) => {
  return questionBank.filter(question => 
    question.subjects.some(subject => selectedSubjects.includes(subject)) &&
    question.systems.some(system => selectedSystems.includes(system))
  );
};

export const getQuestionCount = (subjects: string[], systems: string[]) => {
  return getFilteredQuestions(subjects, systems).length;
};
