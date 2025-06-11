
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { getUSMLEAnalytics } from '@/utils/usmleAnalyticsManager';

const SubjectPerformanceRadar = () => {
  const analytics = getUSMLEAnalytics();
  const { readinessScore } = analytics;

  const data = Object.entries(readinessScore.subjectReadiness).map(([subject, score]) => ({
    subject: subject.length > 10 ? subject.substring(0, 8) + '...' : subject,
    fullSubject: subject,
    score: score as number,
    maxScore: 100
  }));

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Subject Performance</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              className="text-xs"
            />
            <PolarRadiusAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 8, fill: '#6B7280' }}
              angle={90}
            />
            <Radar
              name="Performance"
              dataKey="score"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2">
        {data.slice(0, 6).map((item, index) => (
          <div key={index} className="flex items-center space-x-1 text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-slate-400">{item.fullSubject}: {item.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectPerformanceRadar;
