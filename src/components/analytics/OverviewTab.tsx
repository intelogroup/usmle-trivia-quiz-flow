
import { Target, Clock, Award, ChevronRight, BookOpen } from 'lucide-react';
import DailyActivityChart from './DailyActivityChart';

interface OverviewTabProps {
  onNavigate: (screen: string) => void;
}

const OverviewTab = ({ onNavigate }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      {/* Key Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Study Time</p>
              <p className="text-lg font-bold text-white">24.5h</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">This week</p>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Points</p>
              <p className="text-lg font-bold text-white">4,289</p>
            </div>
          </div>
          <p className="text-xs text-green-400">+890 this week</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Avg Score</p>
              <p className="text-lg font-bold text-white">84%</p>
            </div>
          </div>
          <p className="text-xs text-purple-400">+7% improvement</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Streak</p>
              <p className="text-lg font-bold text-white">12 days</p>
            </div>
          </div>
          <p className="text-xs text-orange-400">Keep it up!</p>
        </div>
      </div>

      <DailyActivityChart />

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3">
          <button onClick={() => onNavigate('quiz')} className="bg-slate-800/50 hover:bg-slate-700/50 rounded-xl p-3 text-left transition-colors border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Take Practice Quiz</p>
                  <p className="text-sm text-slate-400">Test your knowledge</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>

          <button onClick={() => onNavigate('learn')} className="bg-slate-800/50 hover:bg-slate-700/50 rounded-xl p-3 text-left transition-colors border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Continue Learning</p>
                  <p className="text-sm text-slate-400">Pick up where you left off</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
