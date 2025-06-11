
import { BookOpen, Activity } from 'lucide-react';
import { getUSMLEAnalytics } from '@/utils/usmleAnalyticsManager';

const SubjectSystemPerformance = () => {
  const analytics = getUSMLEAnalytics();
  const { readinessScore } = analytics;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400 bg-green-500/20';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getBarWidth = (score: number) => `${score}%`;

  // Get top 6 subjects and systems for display with proper typing
  const topSubjects = Object.entries(readinessScore.subjectReadiness)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 6);

  const topSystems = Object.entries(readinessScore.systemReadiness)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Subjects Performance */}
      <div className="bg-slate-800 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Subject Performance</h3>
        </div>
        <div className="space-y-3">
          {topSubjects.map(([subject, score], index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-300">{subject}</span>
                <span className={`text-sm font-bold px-2 py-1 rounded ${getScoreColor(score as number)}`}>
                  {(score as number)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: getBarWidth(score as number) }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Systems Performance */}
      <div className="bg-slate-800 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">System Performance</h3>
        </div>
        <div className="space-y-3">
          {topSystems.map(([system, score], index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-300">{system}</span>
                <span className={`text-sm font-bold px-2 py-1 rounded ${getScoreColor(score as number)}`}>
                  {(score as number)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: getBarWidth(score as number) }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectSystemPerformance;
