
import { Target, BookOpen, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const pointsProgressData = [
  { week: 'Week 1', points: 320, averagePoints: 280 },
  { week: 'Week 2', points: 485, averagePoints: 420 },
  { week: 'Week 3', points: 650, averagePoints: 580 },
  { week: 'Week 4', points: 890, averagePoints: 750 },
];

const ProgressTab = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced Progress Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Questions</p>
              <p className="text-lg font-bold text-white">342</p>
            </div>
          </div>
          <p className="text-xs text-blue-400">This week</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Modules</p>
              <p className="text-lg font-bold text-white">8</p>
            </div>
          </div>
          <p className="text-xs text-purple-400">Used this week</p>
        </div>
      </div>

      {/* Points Progress Chart with Average Line */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Points Progress</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pointsProgressData}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Line type="monotone" dataKey="points" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="averagePoints" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#a855f7', strokeWidth: 2, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-slate-400">Weekly points accumulation trend</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-blue-500 rounded-full" />
              <span className="text-xs text-slate-400">Your progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-purple-500 rounded-full opacity-70" style={{ backgroundImage: 'repeating-linear-gradient(to right, #a855f7 0, #a855f7 3px, transparent 3px, transparent 6px)' }} />
              <span className="text-xs text-slate-400">Average user</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Goals Section */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Study Goals</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Weekly Study Goal</span>
              <span className="text-sm text-white font-medium">24.5h / 25h</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{ width: '98%' }} />
            </div>
            <p className="text-xs text-green-400 mt-1">Almost there! 30 min to go</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Weekly Questions Target</span>
              <span className="text-sm text-white font-medium">342 / 400</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: '86%' }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">58 questions remaining this week</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Module Engagement</span>
              <span className="text-sm text-white font-medium">8 / 12</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '67%' }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">4 more modules to explore</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Weekly Points Target</span>
              <span className="text-sm text-white font-medium">890 / 1000</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{ width: '89%' }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">110 points to reach weekly target</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="font-medium text-white">Study Streak Master</p>
              <p className="text-xs text-slate-400">Studied for 10 consecutive days</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-white">Points Collector</p>
              <p className="text-xs text-slate-400">Earned 1000+ points this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTab;
