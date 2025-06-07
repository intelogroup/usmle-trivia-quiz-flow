
import { Trophy, Target, BookOpen, TrendingUp } from "lucide-react";

const ProgressCard = () => {
  const progressData = {
    weeklyGoal: 5,
    completed: 2,
    streak: 3,
    totalQuizzes: 12,
    averageScore: 78
  };

  const progressPercentage = (progressData.completed / progressData.weeklyGoal) * 100;

  return (
    <div className="bg-slate-800 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Weekly Progress</h3>
        <div className="flex items-center space-x-1">
          <span className="text-2xl">🔥</span>
          <span className="text-sm text-slate-300">{progressData.streak} day streak</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Quiz Goal</span>
          <span className="text-blue-400">{progressData.completed}/{progressData.weeklyGoal}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold">{progressData.totalQuizzes}</div>
          <div className="text-xs text-slate-400">Total</div>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-1">
            <Target className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold">{progressData.averageScore}%</div>
          <div className="text-xs text-slate-400">Average</div>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-1">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold">+5%</div>
          <div className="text-xs text-slate-400">Improved</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
