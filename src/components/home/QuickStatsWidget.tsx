
import { Brain, Clock, Target, Zap, TrendingUp, Award } from "lucide-react";
import { getUserProgress } from "@/utils/storageUtils";

const QuickStatsWidget = () => {
  const userProgress = getUserProgress();
  
  // Enhanced mock stats with more realistic data
  const todayStats = {
    questionsAnswered: Math.floor(Math.random() * 25) + 5,
    studyTime: Math.floor(Math.random() * 45) + 15,
    correctRate: Math.floor(Math.random() * 20) + 75,
    xpEarned: Math.floor(Math.random() * 150) + 50,
    streak: Math.floor(Math.random() * 7) + 1,
    improvement: Math.floor(Math.random() * 15) + 2
  };

  const stats = [
    {
      icon: Brain,
      label: "Questions Today",
      value: todayStats.questionsAnswered.toString(),
      color: "text-blue-400",
      bgColor: "bg-blue-600/20",
      borderColor: "border-blue-600/30",
      glowColor: "shadow-blue-500/25"
    },
    {
      icon: Clock,
      label: "Study Time",
      value: `${todayStats.studyTime}m`,
      color: "text-orange-400",
      bgColor: "bg-orange-600/20",
      borderColor: "border-orange-600/30",
      glowColor: "shadow-orange-500/25"
    },
    {
      icon: Target,
      label: "Accuracy",
      value: `${todayStats.correctRate}%`,
      color: "text-green-400",
      bgColor: "bg-green-600/20",
      borderColor: "border-green-600/30",
      glowColor: "shadow-green-500/25"
    },
    {
      icon: Zap,
      label: "XP Earned",
      value: `+${todayStats.xpEarned}`,
      color: "text-yellow-400",
      bgColor: "bg-yellow-600/20",
      borderColor: "border-yellow-600/30",
      glowColor: "shadow-yellow-500/25"
    }
  ];

  const achievements = [
    {
      icon: TrendingUp,
      label: "Improvement",
      value: `+${todayStats.improvement}%`,
      subtitle: "vs yesterday",
      color: "text-purple-400",
      bgColor: "bg-purple-600/20",
      borderColor: "border-purple-600/30"
    },
    {
      icon: Award,
      label: "Study Streak",
      value: `${todayStats.streak} days`,
      subtitle: "keep going!",
      color: "text-pink-400",
      bgColor: "bg-pink-600/20",
      borderColor: "border-pink-600/30"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with gradient */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Today's Progress</h3>
          <p className="text-sm text-slate-400">Keep up the great work!</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Brain className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className={`relative group bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border ${stat.borderColor} hover:scale-105 transition-all duration-300 hover:bg-slate-800/70 hover:shadow-lg ${stat.glowColor} cursor-pointer`}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 ${stat.bgColor} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <span className={`text-xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
                  {stat.label}
                </p>
              </div>

              {/* Subtle pulse animation */}
              <div className={`absolute inset-0 ${stat.bgColor} rounded-xl opacity-20 animate-pulse`}></div>
            </div>
          );
        })}
      </div>

      {/* Achievement Row */}
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <div 
              key={index}
              className={`bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border ${achievement.borderColor} hover:scale-105 transition-all duration-300 hover:bg-slate-800/80 group cursor-pointer`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${achievement.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 ${achievement.color}`} />
                </div>
                <div className="flex-1">
                  <div className={`text-lg font-bold ${achievement.color} group-hover:scale-105 transition-transform duration-200`}>
                    {achievement.value}
                  </div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
                    {achievement.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {achievement.subtitle}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Goal Progress */}
      <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-lg font-semibold text-white">Weekly Goal</h4>
            <p className="text-sm text-slate-400">5 out of 7 days completed</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-400">71%</span>
            <p className="text-xs text-slate-400">completion</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="w-full bg-slate-700 rounded-full h-3 shadow-inner">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-lg" style={{ width: '71%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>5/7 days</span>
            <span>2 days to go</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsWidget;
