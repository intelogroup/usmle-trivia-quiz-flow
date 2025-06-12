
import { Trophy, Target, BookOpen, TrendingUp, Calendar, Zap } from "lucide-react";
import { calculateWeeklyProgress, getUserProfile } from "@/utils/dataStore";
import { getUserProgress } from "@/utils/storageUtils";

const ProgressCard = () => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const weeklyProgress = calculateWeeklyProgress();
  
  // Calculate improvement from last week (mock calculation)
  const improvement = Math.max(Math.floor(Math.random() * 10) + 1, 5);
  const studyHours = Math.floor(Math.random() * 15) + 8;
  const rankImprovement = Math.floor(Math.random() * 50) + 10;

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-6 space-y-6 border border-slate-600/30 shadow-xl">
      {/* Header with streak */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Weekly Progress</h3>
          <p className="text-sm text-slate-400">You're doing amazing!</p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-3 py-1.5 shadow-lg">
          <span className="text-xl">🔥</span>
          <span className="text-sm font-bold text-white">{userProfile.studyStreak} day streak</span>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-300 font-medium">Quiz Goal Progress</span>
          <span className="text-blue-400 font-bold text-lg">{weeklyProgress.completed}/{weeklyProgress.goal}</span>
        </div>
        
        <div className="relative">
          <div className="w-full bg-slate-700 rounded-full h-4 shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 shadow-lg relative overflow-hidden" 
              style={{ width: `${weeklyProgress.percentage}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Started this week</span>
            <span>{Math.round(weeklyProgress.percentage)}% complete</span>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-blue-500/25">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg font-bold text-white">{userProgress.totalQuizzes}</div>
          <div className="text-xs text-slate-400">Total Quizzes</div>
          <div className="text-xs text-blue-400">+{Math.floor(Math.random() * 5) + 1} this week</div>
        </div>

        <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-green-500/25">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg font-bold text-white">{userProgress.averageScore}%</div>
          <div className="text-xs text-slate-400">Average Score</div>
          <div className="text-xs text-green-400">+{improvement}% improvement</div>
        </div>

        <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-yellow-500/25">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg font-bold text-white">#{rankImprovement}</div>
          <div className="text-xs text-slate-400">Rank This Week</div>
          <div className="text-xs text-yellow-400">↑{Math.floor(Math.random() * 20) + 5} positions</div>
        </div>

        <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-purple-500/25">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg font-bold text-white">{studyHours}h</div>
          <div className="text-xs text-slate-400">Study Hours</div>
          <div className="text-xs text-purple-400">Great progress!</div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3 border border-blue-500/30">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-medium text-white">
            {weeklyProgress.percentage >= 80 ? 
              "Outstanding! You're crushing your goals! 🚀" :
              weeklyProgress.percentage >= 60 ?
              "Great momentum! Keep pushing forward! 💪" :
              "You've got this! Every step counts! ⭐"
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
