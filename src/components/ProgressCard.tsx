
import { Trophy, Target, BookOpen, TrendingUp } from "lucide-react";
import { calculateWeeklyProgress, getUserProfile } from "@/utils/dataStore";
import { getUserProgress } from "@/utils/storageUtils";

const ProgressCard = () => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const weeklyProgress = calculateWeeklyProgress();
  
  // Calculate improvement from last week (mock calculation)
  const improvement = Math.max(Math.floor(Math.random() * 10) + 1, 5);

  return (
    <div className="bg-slate-800 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Weekly Progress</h3>
        <div className="flex items-center space-x-1">
          <span className="text-2xl">🔥</span>
          <span className="text-sm text-slate-300">{userProfile.studyStreak} day streak</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Quiz Goal</span>
          <span className="text-blue-400">{weeklyProgress.completed}/{weeklyProgress.goal}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
            style={{ width: `${weeklyProgress.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold">{userProgress.totalQuizzes}</div>
          <div className="text-xs text-slate-400">Total</div>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-1">
            <Target className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold">{userProgress.averageScore}%</div>
          <div className="text-xs text-slate-400">Average</div>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-1">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold">+{improvement}%</div>
          <div className="text-xs text-slate-400">Improved</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
