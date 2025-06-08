
import { Trophy, Calendar, Target, BookOpen, Star, Settings } from "lucide-react";
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
    { label: "Quizzes Taken", value: userProgress.totalQuizzes.toString(), icon: BookOpen },
    { label: "Average Score", value: `${userProgress.averageScore}%`, icon: Target },
    { label: "Study Streak", value: `${userProfile.studyStreak} day${userProfile.studyStreak !== 1 ? 's' : ''}`, icon: Calendar },
    { label: "Total XP", value: userProfile.totalXP.toString(), icon: Star },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={() => onNavigate('settings')}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Settings className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      {/* User Profile */}
      <div className="bg-slate-800 rounded-xl p-6 text-center space-y-4">
        <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-3xl font-bold text-white">{userProfile.avatar}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">{userProfile.name}</h2>
          <p className="text-slate-400">Medical Student</p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="font-semibold">Level {userProfile.level}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800 rounded-xl p-4 text-center">
              <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className={`bg-slate-800 rounded-xl p-4 flex items-center space-x-3 ${!achievement.unlocked && 'opacity-50'}`}>
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-xl">
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm text-slate-400">{achievement.description}</p>
                {!achievement.unlocked && achievement.maxProgress > 1 && (
                  <div className="text-xs text-slate-500 mt-1">
                    Progress: {achievement.progress}/{achievement.maxProgress}
                  </div>
                )}
              </div>
              {achievement.unlocked && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Study Progress */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Weekly Progress</h3>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">This Week</span>
            <span className="text-blue-400">{weeklyProgress.completed}/{weeklyProgress.goal} days</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${weeklyProgress.percentage}%` }}></div>
          </div>
          <p className="text-sm text-slate-400 text-center mt-2">
            {weeklyProgress.completed >= weeklyProgress.goal ? 
              'Great job! You\'ve reached your weekly goal! 🎉' : 
              'Keep studying to reach your weekly goal! 🔥'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
