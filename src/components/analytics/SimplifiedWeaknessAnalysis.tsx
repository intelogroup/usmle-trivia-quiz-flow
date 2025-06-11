
import { AlertTriangle, BookOpen, Activity } from 'lucide-react';
import { getUSMLEAnalytics } from '@/utils/usmleAnalyticsManager';

const SimplifiedWeaknessAnalysis = () => {
  const analytics = getUSMLEAnalytics();
  const { readinessScore } = analytics;

  // Get weakest subjects and systems
  const weakestSubjects = Object.entries(readinessScore.subjectReadiness)
    .sort(([,a], [,b]) => (a as number) - (b as number))
    .slice(0, 3)
    .map(([subject, score]) => ({ name: subject, score: score as number, type: 'subject' }));

  const weakestSystems = Object.entries(readinessScore.systemReadiness)
    .sort(([,a], [,b]) => (a as number) - (b as number))
    .slice(0, 3)
    .map(([system, score]) => ({ name: system, score: score as number, type: 'system' }));

  const focusAreas = [...weakestSubjects, ...weakestSystems]
    .sort((a, b) => a.score - b.score)
    .slice(0, 4);

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-orange-400" />
        <h3 className="text-lg font-semibold text-white">Priority Focus Areas</h3>
      </div>

      <div className="space-y-3">
        {focusAreas.map((area, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              {area.type === 'subject' ? (
                <BookOpen className="w-4 h-4 text-blue-400" />
              ) : (
                <Activity className="w-4 h-4 text-green-400" />
              )}
              <div>
                <div className="text-sm font-medium text-white">{area.name}</div>
                <div className="text-xs text-slate-400 capitalize">{area.type}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-bold ${getScoreColor(area.score)}`}>
                {area.score}%
              </div>
              <div className="text-xs text-slate-400">
                {area.score < 60 ? 'Critical' : area.score < 70 ? 'Needs work' : 'Review'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors text-sm">
        Practice Focus Areas
      </button>
    </div>
  );
};

export default SimplifiedWeaknessAnalysis;
