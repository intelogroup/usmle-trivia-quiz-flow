
import { useState } from "react";
import { TrendingUp, Target, Clock, BookOpen } from "lucide-react";

const AnalyticsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Month');
  const periods = ['Week', 'Month', 'Quarter'];

  const stats = {
    averageScore: 0,
    studyTime: '0h',
    sessions: 0,
    currentStreak: 0,
    bestStreak: 0,
    thisWeek: 0,
    thisMonth: 0,
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Learning Analytics</h1>
        <p className="text-slate-300">Track your progress and insights</p>
      </div>

      {/* Period Selector */}
      <div className="flex bg-slate-800 rounded-xl p-1">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              selectedPeriod === period
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-bold">{stats.averageScore}%</div>
          <div className="text-sm text-slate-400">Average Score</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-bold">{stats.studyTime}</div>
          <div className="text-sm text-slate-400">Study Time</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-bold">{stats.sessions}</div>
          <div className="text-sm text-slate-400">Sessions</div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold">Performance Overview</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-700 rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{stats.currentStreak}</div>
            <div className="text-sm text-slate-400">Current Streak</div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{stats.bestStreak}</div>
            <div className="text-sm text-slate-400">Best Streak</div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{stats.thisWeek}</div>
            <div className="text-sm text-slate-400">This Week</div>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{stats.thisMonth}</div>
            <div className="text-sm text-slate-400">This Month</div>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-slate-800 rounded-xl p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Category Performance</span>
        </h3>
        
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          <p className="text-slate-400 mb-2">No category data available for this period</p>
          <p className="text-sm text-slate-500">Complete some quizzes to see your category breakdown</p>
        </div>
      </div>

      {/* Study Time Analysis */}
      <div className="bg-slate-800 rounded-xl p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Study Time Analysis</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">30s</div>
            <div className="text-sm text-slate-400">Avg. Time per Question</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold">0m</div>
            <div className="text-sm text-slate-400">Avg. Session Length</div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Weekly Progress</h3>
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">0% of weekly goal</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <p className="text-sm text-slate-400">Complete 7 quizzes this week to reach your goal!</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
