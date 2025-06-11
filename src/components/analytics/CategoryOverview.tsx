import { BookOpen, Activity, TrendingUp, Target } from 'lucide-react';
import { getUSMLEAnalytics, calculateUSMLEInsights } from '@/utils/usmleAnalyticsManager';

const CategoryOverview = () => {
  const analytics = getUSMLEAnalytics();
  const insights = calculateUSMLEInsights(analytics);
  const { readinessScore } = analytics;

  // Calculate averages with proper type casting
  const subjectScores = Object.values(readinessScore.subjectReadiness) as number[];
  const systemScores = Object.values(readinessScore.systemReadiness) as number[];
  
  const avgSubjectScore = Math.round(subjectScores.reduce((sum, score) => sum + score, 0) / subjectScores.length);
  const avgSystemScore = Math.round(systemScores.reduce((sum, score) => sum + score, 0) / systemScores.length);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 85) return 'bg-green-500/20 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="space-y-4">
      {/* Category Performance Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg border ${getScoreBackground(avgSubjectScore)}`}>
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">Subjects</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(avgSubjectScore)}`}>
            {avgSubjectScore}%
          </div>
          <div className="text-xs text-slate-400">Average across 12 subjects</div>
        </div>

        <div className={`p-4 rounded-lg border ${getScoreBackground(avgSystemScore)}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-slate-300">Systems</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(avgSystemScore)}`}>
            {avgSystemScore}%
          </div>
          <div className="text-xs text-slate-400">Average across 12 systems</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-slate-800 rounded-xl p-4">
        <h4 className="text-sm font-medium text-white mb-3">Category Insights</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Strongest Subject:</span>
            <span className="text-green-400 font-medium">{insights.strongestSubjects[0]?.subject}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Focus Subject:</span>
            <span className="text-orange-400 font-medium">{insights.weakestSubjects[0]?.subject}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Mastered Areas:</span>
            <span className="text-blue-400 font-medium">
              {[...subjectScores, ...systemScores].filter(score => (score as number) >= 85).length} total
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryOverview;
