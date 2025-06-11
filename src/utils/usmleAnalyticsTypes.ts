
export interface USMLETopicPerformance {
  topicId: string;
  topicName: string;
  subject: string;
  system: string;
  totalQuestions: number;
  correctAnswers: number;
  averageScore: number;
  difficulty1Score: number;
  difficulty2Score: number;
  difficulty3Score: number;
  averageTime: number; // in seconds
  lastPracticed: string;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'mastered';
  retentionRate: number;
  improvement: number;
}

export interface USMLESessionAnalytics {
  sessionId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number;
  averageTimePerQuestion: number;
  subjectsStudied: string[];
  systemsStudied: string[];
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  focusTime: number; // actual focused study time
  breakTime: number;
  performanceByHour: { hour: number; accuracy: number }[];
}

export interface USMLEWeaknessPattern {
  patternId: string;
  description: string;
  frequency: number;
  subjects: string[];
  commonMistakes: string[];
  recommendedActions: string[];
  improvementTrend: 'improving' | 'stable' | 'declining';
}

export interface USMLEReadinessScore {
  overallScore: number; // 0-100
  step1Readiness: number;
  step2Readiness: number;
  subjectReadiness: { [subject: string]: number };
  systemReadiness: { [system: string]: number };
  projectedExamDate: string;
  confidenceLevel: 'low' | 'medium' | 'high';
  recommendedStudyHours: number;
}

export interface USMLEClinicalCorrelation {
  clinicalVignetteScore: number;
  diagnosticReasoningScore: number;
  treatmentSelectionScore: number;
  patientSafetyScore: number;
  basicScienceIntegration: number;
  realWorldApplication: number;
}

export interface USMLELearningCurve {
  date: string;
  cumulativeScore: number;
  dailyImprovement: number;
  plateauDetected: boolean;
  breakthroughPoints: string[];
  projectedTrajectory: number;
}

export interface USMLEPeerComparison {
  percentile: number;
  averagePeerScore: number;
  topPerformers: number;
  studyTimeComparison: number;
  strengthsVsPeers: string[];
  areasForImprovement: string[];
}
