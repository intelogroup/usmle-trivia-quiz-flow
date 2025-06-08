
import { getUserProfile } from "./dataManager";

// Calculate dynamic stats
export const calculateWeeklyProgress = () => {
  const userProfile = getUserProfile();
  
  // Get quiz history from localStorage directly to avoid circular import
  const historyData = localStorage.getItem('medquiz_history');
  const quizHistory = historyData ? JSON.parse(historyData) : [];
  
  const today = new Date();
  const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  
  const thisWeekQuizzes = quizHistory.filter((quiz: any) => {
    const quizDate = new Date(quiz.date);
    return quizDate >= weekStart;
  });

  return {
    completed: thisWeekQuizzes.length,
    goal: userProfile.weeklyGoal,
    percentage: Math.min((thisWeekQuizzes.length / userProfile.weeklyGoal) * 100, 100)
  };
};

export const getWeakestSubjects = (): { subject: string; score: number; description: string }[] => {
  const statsData = localStorage.getItem('medquiz_subject_stats');
  const stats = statsData ? JSON.parse(statsData) : [];
  
  return stats
    .filter((stat: any) => stat.totalQuestions > 0)
    .map((stat: any) => ({
      subject: stat.subject,
      score: stat.averageScore,
      description: stat.averageScore < 70 ? 'Needs focus' : 'Room for improvement'
    }))
    .sort((a: any, b: any) => a.score - b.score)
    .slice(0, 2);
};
