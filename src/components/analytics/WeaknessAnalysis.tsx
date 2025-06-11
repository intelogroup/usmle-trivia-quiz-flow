
import { AlertTriangle, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { getUSMLEAnalytics } from '@/utils/usmleAnalyticsManager';

const WeaknessAnalysis = () => {
  const analytics = getUSMLEAnalytics();
  const { weaknessPatterns } = analytics;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving':
        return 'text-green-400';
      case 'declining':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-6 h-6 text-orange-400" />
        <h3 className="text-lg font-semibold text-white">Weakness Patterns</h3>
      </div>

      <div className="space-y-4">
        {weaknessPatterns.map((pattern, index) => (
          <div key={pattern.patternId} className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">{pattern.description}</h4>
                <div className="text-sm text-slate-400">
                  Frequency: {pattern.frequency} occurrences
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(pattern.improvementTrend)}
                <span className={`text-sm font-medium ${getTrendColor(pattern.improvementTrend)}`}>
                  {pattern.improvementTrend}
                </span>
              </div>
            </div>

            {/* Affected Subjects */}
            <div className="mb-3">
              <div className="text-xs text-slate-400 mb-1">Affected Subjects:</div>
              <div className="flex flex-wrap gap-1">
                {pattern.subjects.map((subject, idx) => (
                  <span key={idx} className="bg-slate-600 text-xs px-2 py-1 rounded">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="mb-3">
              <div className="text-xs text-slate-400 mb-1">Common Mistakes:</div>
              <ul className="text-sm text-slate-300 space-y-1">
                {pattern.commonMistakes.slice(0, 2).map((mistake, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-red-400 text-xs mt-1">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Actions */}
            <div>
              <div className="text-xs text-slate-400 mb-1">Recommended Actions:</div>
              <ul className="text-sm text-slate-300 space-y-1">
                {pattern.recommendedActions.slice(0, 2).map((action, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-blue-400 text-xs mt-1">→</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700 pt-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm">
          Generate Practice Questions for Weak Areas
        </button>
      </div>
    </div>
  );
};

export default WeaknessAnalysis;
