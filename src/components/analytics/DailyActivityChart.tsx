
import { Activity, TrendingUp } from 'lucide-react';
import { getUSMLEAnalytics } from '@/utils/usmleAnalyticsManager';
const DailyActivityChart = () => {
  const usmleAnalytics = getUSMLEAnalytics();

  // Get recent study activity (last 7 days)
  const recentSessions = usmleAnalytics.sessionAnalytics.slice(0, 7);
  const weeklyActivity = recentSessions.map(session => ({
    date: new Date(session.date).toLocaleDateString('en', {
      weekday: 'short'
    }),
    questions: session.questionsAttempted,
    accuracy: session.accuracy,
    duration: Math.round(session.duration / 60 * 10) / 10,
    // Convert to hours
    correctAnswers: session.correctAnswers
  }));

  // Calculate stats
  const totalQuestions = weeklyActivity.reduce((sum, day) => sum + day.questions, 0);
  const avgAccuracy = Math.round(weeklyActivity.reduce((sum, day) => sum + day.accuracy, 0) / weeklyActivity.length);
  const totalHours = weeklyActivity.reduce((sum, day) => sum + day.duration, 0);
  const bestDay = weeklyActivity.reduce((best, day) => day.questions > best.questions ? day : best, weeklyActivity[0]);
  const getBarHeight = (questions: number) => {
    const maxQuestions = Math.max(...weeklyActivity.map(d => d.questions));
    return Math.max(questions / maxQuestions * 100, 5); // Min 5% for visibility
  };
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return 'text-green-400';
    if (accuracy >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };
  return <div className="bg-slate-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Daily Study Activity</h3>
        </div>
        <div className="text-xs text-slate-400">Study Activity</div>
      </div>

      {/* Quick Stats - Redesigned for better spacing */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="text-center p-2 bg-slate-700/30 rounded-lg">
          <div className="text-xl font-bold text-blue-400">{totalQuestions}</div>
          <div className="text-xs text-slate-400 mt-1">Total Questions</div>
        </div>
        <div className="text-center p-2 bg-slate-700/30 rounded-lg">
          <div className={`text-xl font-bold ${getAccuracyColor(avgAccuracy)}`}>{avgAccuracy}%</div>
          <div className="text-xs text-slate-400 mt-1">Avg Accuracy</div>
        </div>
        <div className="text-center p-2 bg-slate-700/30 rounded-lg">
          <div className="text-xl font-bold text-orange-400">{totalHours.toFixed(1)}h</div>
          <div className="text-xs text-slate-400 mt-1">Study Time</div>
        </div>
        <div className="text-center p-2 bg-slate-700/30 rounded-lg">
          <div className="text-xl font-bold text-green-400">{bestDay.questions}</div>
          <div className="text-xs text-slate-400 mt-1">Best Day</div>
        </div>
      </div>

      {/* Activity Chart - Improved spacing and sizing */}
      <div className="bg-slate-700/20 rounded-lg p-4 mb-4">
        <div className="flex items-end justify-between space-x-2 h-28">
          {weeklyActivity.map((day, index) => <div key={index} className="flex-1 flex flex-col items-center h-full justify-end max-w-[40px]">
              {/* Accuracy indicator - simplified */}
              <div className={`text-xs font-medium mb-1 ${getAccuracyColor(day.accuracy)}`}>
                {day.accuracy}%
              </div>
              
              {/* Activity bar - cleaner design */}
              <div className="relative w-full flex flex-col justify-end h-20">
                <div className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-md w-full transition-all duration-300 hover:from-blue-500 hover:to-blue-300 cursor-pointer group relative" style={{
              height: `${getBarHeight(day.questions)}%`
            }}>
                  {/* Minutes label inside the bar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white opacity-90">
                      {Math.round(day.duration * 60)}m
                    </span>
                  </div>
                  
                  {/* Simplified hover tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                    {day.questions} questions, {Math.round(day.duration * 60)}min
                  </div>
                </div>
              </div>
              
              {/* Day label - better spacing */}
              <div className="text-xs text-slate-400 mt-2 font-medium">{day.date}</div>
              <div className="text-xs text-slate-500 mt-0.5">{day.duration}h</div>
            </div>)}
        </div>
      </div>

      {/* Simplified Legend */}
      <div className="flex items-center justify-center space-x-4 text-xs text-slate-400 mb-4">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded"></div>
          <span>Questions</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded"></div>
          <span>High (85%+)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-yellow-400 rounded"></div>
          <span>Good (70-84%)</span>
        </div>
      </div>

      {/* Compact Insights */}
      <div className="p-3 bg-slate-700/30 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-white">Weekly Insights</span>
        </div>
        <div className="text-xs text-slate-300 space-y-1">
          <div>• Best day: {bestDay.date} ({bestDay.questions} questions)</div>
          <div>• Daily average: {Math.round(totalQuestions / 7)} questions</div>
          <div>• Active days: {weeklyActivity.filter(d => d.questions > 0).length}/7</div>
        </div>
      </div>
    </div>;
};
export default DailyActivityChart;
