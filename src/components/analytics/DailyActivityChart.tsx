
import { Activity, TrendingUp, Clock, Target } from 'lucide-react';
import { getUSMLEAnalytics } from '@/utils/usmleAnalyticsManager';

const DailyActivityChart = () => {
  const usmleAnalytics = getUSMLEAnalytics();
  
  // Get recent study activity (last 7 days)
  const recentSessions = usmleAnalytics.sessionAnalytics.slice(0, 7);
  const weeklyActivity = recentSessions.map(session => ({
    date: new Date(session.date).toLocaleDateString('en', { weekday: 'short' }),
    questions: session.questionsAttempted,
    accuracy: session.accuracy,
    duration: Math.round(session.duration / 60 * 10) / 10, // Convert to hours
    correctAnswers: session.correctAnswers
  }));

  // Calculate stats
  const totalQuestions = weeklyActivity.reduce((sum, day) => sum + day.questions, 0);
  const avgAccuracy = Math.round(weeklyActivity.reduce((sum, day) => sum + day.accuracy, 0) / weeklyActivity.length);
  const totalHours = weeklyActivity.reduce((sum, day) => sum + day.duration, 0);
  const bestDay = weeklyActivity.reduce((best, day) => day.questions > best.questions ? day : best, weeklyActivity[0]);

  const getBarHeight = (questions: number) => {
    const maxQuestions = Math.max(...weeklyActivity.map(d => d.questions));
    return Math.max((questions / maxQuestions) * 100, 8); // Min 8% for visibility
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return 'text-green-400';
    if (accuracy >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Daily Study Activity</h3>
        </div>
        <div className="text-xs text-slate-400">Last 7 days</div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">{totalQuestions}</div>
          <div className="text-xs text-slate-400">Total Questions</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${getAccuracyColor(avgAccuracy)}`}>{avgAccuracy}%</div>
          <div className="text-xs text-slate-400">Avg Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-400">{totalHours.toFixed(1)}h</div>
          <div className="text-xs text-slate-400">Study Time</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">{bestDay.questions}</div>
          <div className="text-xs text-slate-400">Best Day</div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="relative">
        <div className="flex items-end justify-between space-x-2 h-32 mb-4 bg-slate-700/30 rounded-lg p-3">
          {weeklyActivity.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center h-full justify-end">
              {/* Accuracy indicator */}
              <div className={`text-xs font-medium mb-1 ${getAccuracyColor(day.accuracy)}`}>
                {day.accuracy}%
              </div>
              
              {/* Activity bar */}
              <div className="relative w-full flex flex-col justify-end h-full">
                <div 
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md w-full transition-all duration-700 hover:from-blue-500 hover:to-blue-300 cursor-pointer group"
                  style={{ height: `${getBarHeight(day.questions)}%` }}
                >
                  {/* Hover tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {day.questions} questions<br />
                    {day.correctAnswers} correct<br />
                    {day.duration}h study
                  </div>
                </div>
              </div>
              
              {/* Day label */}
              <div className="text-xs text-slate-400 mt-2 font-medium">{day.date}</div>
              
              {/* Study time */}
              <div className="text-xs text-slate-500">{day.duration}h</div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 text-xs text-slate-400">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Questions Attempted</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span>High Accuracy (85%+)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span>Good Accuracy (70-84%)</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-white">Weekly Insights</span>
        </div>
        <div className="text-xs text-slate-300 space-y-1">
          <div>• Most productive day: {bestDay.date} ({bestDay.questions} questions)</div>
          <div>• Average {Math.round(totalQuestions / 7)} questions per day</div>
          <div>• Consistency: {weeklyActivity.filter(d => d.questions > 0).length}/7 days active</div>
        </div>
      </div>
    </div>
  );
};

export default DailyActivityChart;
