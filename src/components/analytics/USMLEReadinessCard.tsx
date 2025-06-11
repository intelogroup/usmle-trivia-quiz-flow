
import { Target, TrendingUp, Calendar, Clock } from 'lucide-react';
import { getUSMLEAnalytics } from '@/utils/usmleAnalyticsManager';

const USMLEReadinessCard = () => {
  const analytics = getUSMLEAnalytics();
  const { readinessScore, peerComparison } = analytics;

  const getReadinessColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getReadinessBackground = (score: number) => {
    if (score >= 85) return 'bg-green-500/20 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">USMLE Readiness</h3>
        <Target className="w-6 h-6 text-blue-400" />
      </div>

      {/* Overall Readiness Score */}
      <div className={`p-4 rounded-lg border ${getReadinessBackground(readinessScore.overallScore)}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">Overall Readiness</span>
          <span className={`text-2xl font-bold ${getReadinessColor(readinessScore.overallScore)}`}>
            {readinessScore.overallScore}%
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${readinessScore.overallScore}%` }}
          ></div>
        </div>
      </div>

      {/* Step Readiness */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="text-sm text-slate-400 mb-1">Step 1 Ready</div>
          <div className={`text-xl font-bold ${getReadinessColor(readinessScore.step1Readiness)}`}>
            {readinessScore.step1Readiness}%
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="text-sm text-slate-400 mb-1">Step 2 Ready</div>
          <div className={`text-xl font-bold ${getReadinessColor(readinessScore.step2Readiness)}`}>
            {readinessScore.step2Readiness}%
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-400" />
          <div>
            <div className="text-xs text-slate-400">Projected Date</div>
            <div className="text-sm font-medium text-white">
              {new Date(readinessScore.projectedExamDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-orange-400" />
          <div>
            <div className="text-xs text-slate-400">Study Hours Left</div>
            <div className="text-sm font-medium text-white">{readinessScore.recommendedStudyHours}h</div>
          </div>
        </div>
      </div>

      {/* Peer Comparison */}
      <div className="border-t border-slate-700 pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">vs Peers</span>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 font-medium">{peerComparison.percentile}th percentile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USMLEReadinessCard;
