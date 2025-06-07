
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
    <div className="glass-card rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Weekly Progress</h3>
        <div className="flex items-center space-x-1">
          <span className="text-2xl">🔥</span>
          <span className="text-sm text-muted-foreground font-medium">{progressData.streak} day streak</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-medium">Quiz Goal</span>
          <span className="text-primary font-semibold">{progressData.completed}/{progressData.weeklyGoal}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="gradient-primary h-3 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg font-bold text-foreground">{progressData.totalQuizzes}</div>
          <div className="text-xs text-muted-foreground font-medium">Total</div>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg font-bold text-foreground">{progressData.averageScore}%</div>
          <div className="text-xs text-muted-foreground font-medium">Average</div>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg font-bold text-foreground">+5%</div>
          <div className="text-xs text-muted-foreground font-medium">Improved</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
