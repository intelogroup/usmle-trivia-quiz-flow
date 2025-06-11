
import { Trophy, Calendar, Target, BookOpen, Star, Settings, ChevronLeft } from "lucide-react";
import { getUserProfile, getAchievements, calculateWeeklyProgress } from "@/utils/dataStore";
import { getUserProgress } from "@/utils/storageUtils";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

const ProfileScreen = ({ onNavigate }: ProfileScreenProps) => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const achievements = getAchievements();
  const weeklyProgress = calculateWeeklyProgress();

  const stats = [
    { label: "Quizzes Taken", value: userProgress.totalQuizzes.toString(), icon: BookOpen, color: "text-blue-400" },
    { label: "Average Score", value: `${userProgress.averageScore}%`, icon: Target, color: "text-orange-400" },
    { label: "Study Streak", value: `${userProfile.studyStreak} day${userProfile.studyStreak !== 1 ? 's' : ''}`, icon: Calendar, color: "text-green-400" },
    { label: "Total XP", value: userProfile.totalXP.toString(), icon: Star, color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
        <button
          onClick={() => onNavigate('settings')}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <Settings className="w-6 h-6 text-slate-400 hover:text-white" />
        </button>
      </div>

      <div className="p-4 pb-20 space-y-6">
        {/* User Profile Card */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-6 text-center space-y-4 border border-slate-600/30 shadow-xl">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-orange-500/20">
            <span className="text-3xl font-bold text-white">{userProfile.avatar}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{userProfile.name}</h2>
            <p className="text-slate-300 text-lg">Medical Student</p>
          </div>
          <div className="flex items-center justify-center space-x-2 bg-slate-700/50 rounded-full px-4 py-2 backdrop-blur-sm">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-yellow-400">Level {userProfile.level}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-600/30 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-slate-700/50 rounded-lg">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
            Achievements
          </h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-4 border border-slate-600/30 shadow-lg transition-all duration-200 hover:shadow-xl ${achievement.unlocked ? 'hover:scale-[1.02]' : 'opacity-60'}`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg ${achievement.unlocked ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-slate-600'}`}>
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg">{achievement.title}</h4>
                  <p className="text-sm text-slate-300">{achievement.description}</p>
                  {!achievement.unlocked && achievement.maxProgress > 1 && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                {achievement.unlocked && (
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Study Progress */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Calendar className="w-5 h-5 text-blue-400 mr-2" />
            Weekly Progress
          </h3>
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-slate-300 text-lg">This Week</span>
                <p className="text-sm text-slate-400">Study goal progress</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-400">{weeklyProgress.completed}/{weeklyProgress.goal}</span>
                <p className="text-sm text-slate-400">days</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full bg-slate-600 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-lg" 
                  style={{ width: `${weeklyProgress.percentage}%` }}
                ></div>
              </div>
              <div className="text-center">
                <p className={`text-lg font-medium ${weeklyProgress.completed >= weeklyProgress.goal ? 'text-green-400' : 'text-blue-400'}`}>
                  {weeklyProgress.completed >= weeklyProgress.goal ? 
                    '🎉 Great job! You\'ve reached your weekly goal!' : 
                    '🔥 Keep studying to reach your weekly goal!'
                  }
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {Math.round(weeklyProgress.percentage)}% complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
