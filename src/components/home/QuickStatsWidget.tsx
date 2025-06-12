
import { Brain, Clock, Target, Zap } from "lucide-react";
import { getUserProgress } from "@/utils/storageUtils";

const QuickStatsWidget = () => {
  const userProgress = getUserProgress();
  
  // Mock additional stats
  const todayStats = {
    questionsAnswered: Math.floor(Math.random() * 25) + 5,
    studyTime: Math.floor(Math.random() * 45) + 15,
    correctRate: Math.floor(Math.random() * 20) + 75,
    xpEarned: Math.floor(Math.random() * 150) + 50
  };

  const stats = [
    {
      icon: Brain,
      label: "Questions Today",
      value: todayStats.questionsAnswered.toString(),
      color: "text-blue-400",
      bgColor: "bg-blue-600/20",
      borderColor: "border-blue-600/30"
    },
    {
      icon: Clock,
      label: "Study Time",
      value: `${todayStats.studyTime}m`,
      color: "text-orange-400",
      bgColor: "bg-orange-600/20",
      borderColor: "border-orange-600/30"
    },
    {
      icon: Target,
      label: "Accuracy",
      value: `${todayStats.correctRate}%`,
      color: "text-green-400",
      bgColor: "bg-green-600/20",
      borderColor: "border-green-600/30"
    },
    {
      icon: Zap,
      label: "XP Earned",
      value: `+${todayStats.xpEarned}`,
      color: "text-yellow-400",
      bgColor: "bg-yellow-600/20",
      borderColor: "border-yellow-600/30"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Today's Progress</h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className={`bg-slate-800/50 rounded-xl p-4 border ${stat.borderColor} hover:scale-105 transition-all duration-200 hover:bg-slate-800/70`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickStatsWidget;
