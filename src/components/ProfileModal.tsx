
import React from 'react';
import { X, Settings, Calendar, Target, BookOpen, Star, Trophy, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getUserProfile, getAchievements, calculateWeeklyProgress } from "@/utils/dataStore";
import { getUserProgress } from "@/utils/storageUtils";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const achievements = getAchievements();
  const weeklyProgress = calculateWeeklyProgress();

  const handleSettingsClick = () => {
    onClose();
    onNavigate('settings');
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-600/50 shadow-2xl">
        <DialogHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
          
          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className="relative group">
              <Avatar className="w-20 h-20 ring-4 ring-blue-500/50 shadow-lg">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&crop=face" 
                  alt="Profile" 
                />
                <AvatarFallback className="text-white font-bold text-xl bg-gradient-to-br from-orange-500 to-orange-600">
                  {userProfile.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="text-center">
              <DialogTitle className="text-xl font-bold text-white mb-1">
                {userProfile.name}
              </DialogTitle>
              <p className="text-slate-400">Medical Student</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Badge variant="outline" className="text-blue-400 border-blue-400/50 bg-blue-400/10">
                  Level {userProfile.level}
                </Badge>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 bg-yellow-400/10">
                  {userProfile.totalXP} XP
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-2">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/70 rounded-lg p-4 text-center">
              <Target className="w-5 h-5 text-orange-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">{userProgress.averageScore}%</p>
              <p className="text-slate-400 text-xs">Avg Score</p>
            </div>

            <div className="bg-slate-700/70 rounded-lg p-4 text-center">
              <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">{userProfile.studyStreak}</p>
              <p className="text-slate-400 text-xs">Day Streak</p>
            </div>

            <div className="bg-slate-700/70 rounded-lg p-4 text-center">
              <BookOpen className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">{userProgress.totalQuizzes}</p>
              <p className="text-slate-400 text-xs">Quizzes</p>
            </div>

            <div className="bg-slate-700/70 rounded-lg p-4 text-center">
              <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">{unlockedAchievements.length}</p>
              <p className="text-slate-400 text-xs">Achievements</p>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-slate-700/70 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-white">Weekly Progress</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">This Week</span>
              <span className="text-blue-400">{weeklyProgress.completed}/{weeklyProgress.goal} days</span>
            </div>
            <Progress value={weeklyProgress.percentage} className="mb-2" />
            <p className="text-sm text-slate-400 text-center">
              {weeklyProgress.completed >= weeklyProgress.goal ? 
                'Great job! Weekly goal reached! 🎉' : 
                'Keep going to reach your weekly goal! 🔥'
              }
            </p>
          </div>

          {/* Recent Achievements */}
          <div className="bg-slate-700/70 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="font-medium text-white">Recent Achievements</span>
            </div>
            <div className="space-y-2">
              {unlockedAchievements.slice(0, 3).map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-slate-600/50 rounded-lg">
                  <span className="text-lg">{achievement.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{achievement.title}</h4>
                    <p className="text-xs text-slate-400">{achievement.description}</p>
                  </div>
                </div>
              ))}
              {unlockedAchievements.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-2">
                  No achievements unlocked yet. Keep studying!
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button 
              onClick={handleSettingsClick}
              className="bg-slate-600/70 hover:bg-slate-500/70 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button 
              onClick={onClose}
              className="bg-blue-600/70 hover:bg-blue-500/70 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
