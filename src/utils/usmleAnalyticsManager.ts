
import { 
  USMLETopicPerformance, 
  USMLESessionAnalytics, 
  USMLEWeaknessPattern,
  USMLEReadinessScore,
  USMLEClinicalCorrelation,
  USMLELearningCurve,
  USMLEPeerComparison
} from './usmleAnalyticsTypes';

// Generate realistic mock data for USMLE analytics
export const generateUSMLEMockData = () => {
  const subjects = [
    'Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 
    'Microbiology', 'Immunology', 'Behavioral Science', 
    'Biochemistry', 'Genetics', 'Epidemiology', 'Ethics', 'Radiology'
  ];

  const systems = [
    'Cardiovascular', 'Respiratory', 'Gastrointestinal', 'Genitourinary',
    'Musculoskeletal', 'Nervous System', 'Endocrine', 'Reproductive',
    'Hematologic', 'Immune System', 'Integumentary', 'Multi-system'
  ];

  const topics = [
    { name: 'Myocardial Infarction', subject: 'Pathology', system: 'Cardiovascular' },
    { name: 'Heart Failure', subject: 'Pathology', system: 'Cardiovascular' },
    { name: 'Diabetes Mellitus', subject: 'Endocrine', system: 'Endocrine' },
    { name: 'Pneumonia', subject: 'Microbiology', system: 'Respiratory' },
    { name: 'Renal Failure', subject: 'Pathology', system: 'Genitourinary' },
    { name: 'Stroke', subject: 'Pathology', system: 'Nervous System' },
    { name: 'Depression', subject: 'Behavioral Science', system: 'Nervous System' },
    { name: 'Hypertension', subject: 'Pathology', system: 'Cardiovascular' },
    { name: 'COPD', subject: 'Pathology', system: 'Respiratory' },
    { name: 'Liver Cirrhosis', subject: 'Pathology', system: 'Gastrointestinal' },
    { name: 'Thyroid Disorders', subject: 'Endocrine', system: 'Endocrine' },
    { name: 'Anemia', subject: 'Pathology', system: 'Hematologic' },
    { name: 'Antibiotic Mechanisms', subject: 'Pharmacology', system: 'Multi-system' },
    { name: 'Cancer Biology', subject: 'Pathology', system: 'Multi-system' },
    { name: 'Autoimmune Disorders', subject: 'Immunology', system: 'Immune System' }
  ];

  return {
    topicPerformance: topics.map((topic, index) => ({
      topicId: `topic_${index + 1}`,
      topicName: topic.name,
      subject: topic.subject,
      system: topic.system,
      totalQuestions: Math.floor(Math.random() * 50) + 20,
      correctAnswers: Math.floor(Math.random() * 40) + 10,
      averageScore: Math.floor(Math.random() * 40) + 60,
      difficulty1Score: Math.floor(Math.random() * 20) + 80,
      difficulty2Score: Math.floor(Math.random() * 30) + 60,
      difficulty3Score: Math.floor(Math.random() * 40) + 40,
      averageTime: Math.floor(Math.random() * 60) + 45,
      lastPracticed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      masteryLevel: ['beginner', 'intermediate', 'advanced', 'mastered'][Math.floor(Math.random() * 4)] as any,
      retentionRate: Math.floor(Math.random() * 30) + 70,
      improvement: Math.floor(Math.random() * 20) - 10
    })),
    
    sessionAnalytics: Array.from({ length: 30 }, (_, i) => ({
      sessionId: `session_${i + 1}`,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      startTime: `${Math.floor(Math.random() * 12) + 8}:00`,
      endTime: `${Math.floor(Math.random() * 4) + 17}:00`,
      duration: Math.floor(Math.random() * 120) + 60,
      questionsAttempted: Math.floor(Math.random() * 30) + 20,
      correctAnswers: Math.floor(Math.random() * 25) + 15,
      accuracy: Math.floor(Math.random() * 30) + 70,
      averageTimePerQuestion: Math.floor(Math.random() * 30) + 45,
      subjectsStudied: subjects.slice(0, Math.floor(Math.random() * 4) + 2),
      systemsStudied: systems.slice(0, Math.floor(Math.random() * 3) + 2),
      difficultyDistribution: {
        easy: Math.floor(Math.random() * 10) + 5,
        medium: Math.floor(Math.random() * 15) + 10,
        hard: Math.floor(Math.random() * 10) + 5
      },
      focusTime: Math.floor(Math.random() * 100) + 50,
      breakTime: Math.floor(Math.random() * 20) + 10,
      performanceByHour: Array.from({ length: 24 }, (_, hour) => ({
        hour,
        accuracy: hour >= 8 && hour <= 22 ? Math.floor(Math.random() * 20) + 70 : 0
      }))
    })),

    weaknessPatterns: [
      {
        patternId: 'pattern_1',
        description: 'Difficulty with pharmacokinetics calculations',
        frequency: 15,
        subjects: ['Pharmacology', 'Physiology'],
        commonMistakes: ['Clearance calculations', 'Half-life estimation', 'Dosing intervals'],
        recommendedActions: ['Review pharmacokinetic formulas', 'Practice calculation problems', 'Use visual aids for concepts'],
        improvementTrend: 'improving' as const
      },
      {
        patternId: 'pattern_2',
        description: 'Confusion between similar cardiac conditions',
        frequency: 12,
        subjects: ['Pathology', 'Cardiology'],
        commonMistakes: ['MI vs unstable angina', 'Heart failure types', 'Valve abnormalities'],
        recommendedActions: ['Create comparison charts', 'Focus on distinguishing features', 'Review ECG patterns'],
        improvementTrend: 'stable' as const
      },
      {
        patternId: 'pattern_3',
        description: 'Weak performance on ethics questions',
        frequency: 8,
        subjects: ['Behavioral Science', 'Ethics'],
        commonMistakes: ['Informed consent scenarios', 'End-of-life decisions', 'Confidentiality issues'],
        recommendedActions: ['Review ethics frameworks', 'Practice case studies', 'Understand legal principles'],
        improvementTrend: 'declining' as const
      }
    ],

    readinessScore: {
      overallScore: 78,
      step1Readiness: 82,
      step2Readiness: 74,
      subjectReadiness: subjects.reduce((acc, subject) => ({
        ...acc,
        [subject]: Math.floor(Math.random() * 30) + 70
      }), {}),
      systemReadiness: systems.reduce((acc, system) => ({
        ...acc,
        [system]: Math.floor(Math.random() * 30) + 70
      }), {}),
      projectedExamDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      confidenceLevel: 'medium' as const,
      recommendedStudyHours: 240
    },

    clinicalCorrelation: {
      clinicalVignetteScore: 76,
      diagnosticReasoningScore: 82,
      treatmentSelectionScore: 74,
      patientSafetyScore: 88,
      basicScienceIntegration: 79,
      realWorldApplication: 73
    },

    learningCurve: Array.from({ length: 90 }, (_, i) => ({
      date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      cumulativeScore: Math.min(95, 45 + i * 0.5 + Math.sin(i * 0.1) * 5),
      dailyImprovement: Math.random() * 4 - 2,
      plateauDetected: i > 30 && i < 40,
      breakthroughPoints: i % 20 === 0 ? [`Breakthrough at day ${i + 1}`] : [],
      projectedTrajectory: 85 + Math.sin(i * 0.05) * 3
    })),

    peerComparison: {
      percentile: 74,
      averagePeerScore: 71,
      topPerformers: 18,
      studyTimeComparison: 112, // 12% above average
      strengthsVsPeers: ['Pathology', 'Microbiology', 'Clinical reasoning'],
      areasForImprovement: ['Pharmacology', 'Behavioral Science', 'Radiology']
    }
  };
};

export const getUSMLEAnalytics = () => {
  const stored = localStorage.getItem('usmle_analytics_data');
  if (stored) {
    return JSON.parse(stored);
  }
  
  const mockData = generateUSMLEMockData();
  localStorage.setItem('usmle_analytics_data', JSON.stringify(mockData));
  return mockData;
};

export const calculateUSMLEInsights = (data: any) => {
  const { topicPerformance, sessionAnalytics, readinessScore } = data;
  
  // Calculate key insights
  const strongestSubjects = Object.entries(readinessScore.subjectReadiness)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([subject, score]) => ({ subject, score: score as number }));

  const weakestSubjects = Object.entries(readinessScore.subjectReadiness)
    .sort(([,a], [,b]) => (a as number) - (b as number))
    .slice(0, 3)
    .map(([subject, score]) => ({ subject, score: score as number }));

  const recentTrend = sessionAnalytics
    .slice(0, 7)
    .reduce((sum: number, session: any) => sum + session.accuracy, 0) / 7;

  const studyConsistency = sessionAnalytics.filter((session: any) => 
    new Date(session.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  return {
    strongestSubjects,
    weakestSubjects,
    recentTrend: Math.round(recentTrend),
    studyConsistency,
    totalStudyHours: sessionAnalytics.reduce((sum: number, session: any) => sum + session.duration, 0) / 60,
    questionsCompleted: sessionAnalytics.reduce((sum: number, session: any) => sum + session.questionsAttempted, 0)
  };
};
