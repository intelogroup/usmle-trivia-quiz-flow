
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const subjectPerformanceData = [
  { subject: 'Anatomy', score: 85, improvement: 12 },
  { subject: 'Physiology', score: 78, improvement: 8 },
  { subject: 'Pathology', score: 92, improvement: 15 },
  { subject: 'Pharmacology', score: 74, improvement: -3 },
  { subject: 'Microbiology', score: 88, improvement: 10 },
  { subject: 'Biochemistry', score: 81, improvement: 5 },
];

const radarData = [
  { subject: 'Anatomy', score: 85, fullMark: 100 },
  { subject: 'Physiology', score: 78, fullMark: 100 },
  { subject: 'Pathology', score: 92, fullMark: 100 },
  { subject: 'Pharmacology', score: 74, fullMark: 100 },
  { subject: 'Microbiology', score: 88, fullMark: 100 },
  { subject: 'Biochemistry', score: 81, fullMark: 100 },
];

const PerformanceTab = () => {
  return (
    <div className="space-y-6">
      {/* Subject Performance */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Subject Performance</h3>
        <div className="space-y-3">
          {subjectPerformanceData.map(subject => (
            <div key={subject.subject} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{subject.subject}</span>
                  <span className="text-sm text-slate-300">{subject.score}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
              <div className={`ml-4 text-sm font-medium ${subject.improvement > 0 ? 'text-green-400' : subject.improvement < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                {subject.improvement > 0 ? '+' : ''}{subject.improvement}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Knowledge Radar</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} />
              <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <p className="text-sm font-medium text-yellow-400 mb-1">Focus Area</p>
            <p className="text-sm text-slate-300">Spend more time on Pharmacology - your weakest subject</p>
          </div>
          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <p className="text-sm font-medium text-green-400 mb-1">Strength</p>
            <p className="text-sm text-slate-300">Excellent progress in Pathology - keep it up!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
