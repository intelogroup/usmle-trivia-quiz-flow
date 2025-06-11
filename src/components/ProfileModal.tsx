
import React, { useState } from 'react';
import { X, Settings, Calendar, Target, BookOpen, Star, Trophy, TrendingUp, Clock, Zap, Award, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [activeTab, setActiveTab] = useState('overview');

  const handleSettingsClick = () => {
    onClose();
    onNavigate('settings');
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  // Mock additional stats
  const additionalStats = {
    totalStudyHours: Math.floor(userProgress.totalQuestions * 1.5 / 60),
    favoriteSubject: 'Pathology',
    weakestSubject: 'Pharmacology',
    currentRank: 23,
    totalUsers: 1247,
    questionsToday: Math.floor(Math.random() * 30) + 10,
    perfectScores: Math.floor(userProgress.totalQuizzes * 0.3),
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-600/50 shadow-2xl">
        <DialogHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <X className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
          
          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className="relative group">
              <Avatar className="w-24 h-24 ring-4 ring-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&crop=face" 
                  alt="Profile" 
                />
                <AvatarFallback className="text-white font-bold text-2xl bg-gradient-to-br from-orange-500 to-orange-600">
                  {userProfile.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="text-center">
              <DialogTitle className="text-xl font-bold text-white mb-1">
                {userProfile.name}
              </DialogTitle>
              <p className="text-slate-400 mb-2">Medical Student</p>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="outline" className="text-blue-400 border-blue-400/50 bg-blue-400/10">
                  Level {userProfile.level}
                </Badge>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 bg-yellow-400/10">
                  {userProfile.totalXP} XP
                </Badge>
                <Badge variant="outline" className="text-purple-400 border-purple-400/50 bg-purple-400/10">
                  #{additionalStats.currentRank}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="px-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="stats" className="text-xs">Stats</TabsTrigger>
              <TabsTrigger value="achievements" className="text-xs">Awards</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-slate-700/70 to-slate-600/70 rounded-lg p-3 text-center border border-slate-600/30">
                  <Target className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{userProgress.averageScore}%</p>
                  <p className="text-slate-400 text-xs">Avg Score</p>
                </div>

                <div className="bg-gradient-to-br from-slate-700/70 to-slate-600/70 rounded-lg p-3 text-center border border-slate-600/30">
                  <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{userProfile.studyStreak}</p>
                  <p className="text-slate-400 text-xs">Day Streak</p>
                </div>

                <div className="bg-gradient-to-br from-slate-700/70 to-slate-600/70 rounded-lg p-3 text-center border border-slate-600/30">
                  <BookOpen className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{userProgress.totalQuizzes}</p>
                  <p className="text-slate-400 text-xs">Quizzes</p>
                </div>

                <div className="bg-gradient-to-br from-slate-700/70 to-slate-600/70 rounded-lg p-3 text-center border border-slate-600/30">
                  <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{additionalStats.totalStudyHours}h</p>
                  <p className="text-slate-400 text-xs">Study Time</p>
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30">
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

              {/* Today's Activity */}
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-white">Today's Activity</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Questions Answered</span>
                    <span className="text-white font-medium">{additionalStats.questionsToday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Study Time</span>
                    <span className="text-white font-medium">{Math.floor(Math.random() * 45) + 15}m</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4 mt-4">
              {/* Detailed Statistics */}
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30">
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
                    Performance
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Total Questions</span>
                      <span className="text-white font-medium">{userProgress.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Correct Answers</span>
                      <span className="text-green-400 font-medium">{userProgress.totalCorrect}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Perfect Scores</span>
                      <span className="text-blue-400 font-medium">{additionalStats.perfectScores}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30">
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 text-blue-400 mr-2" />
                    Subject Performance
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Strongest</span>
                      <span className="text-green-400 font-medium">{additionalStats.favoriteSubject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Needs Work</span>
                      <span className="text-yellow-400 font-medium">{additionalStats.weakestSubject}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30">
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <Users className="w-4 h-4 text-purple-400 mr-2" />
                    Community
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Global Rank</span>
                      <span className="text-purple-400 font-medium">#{additionalStats.currentRank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Total Users</span>
                      <span className="text-slate-400 font-medium">{additionalStats.totalUsers}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4 mt-4">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium text-white">Achievements</span>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 bg-yellow-400/10 ml-auto">
                    {unlockedAchievements.length}/{achievements.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {achievements.slice(0, 4).map((achievement, index) => (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      achievement.unlocked 
                        ? 'bg-slate-600/50 border border-yellow-500/30' 
                        : 'bg-slate-700/30 border border-slate-600/30 opacity-60'
                    }`}>
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white">{achievement.title}</h4>
                        <p className="text-xs text-slate-400">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <div className="text-xs text-yellow-400 font-medium">
                          +{achievement.points} XP
                        </div>
                      )}
                    </div>
                  ))}
                  {achievements.length > 4 && (
                    <div className="text-center">
                      <span className="text-xs text-slate-400">
                        +{achievements.length - 4} more achievements
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <button 
              onClick={handleSettingsClick}
              className="bg-gradient-to-r from-slate-600/70 to-slate-700/70 hover:from-slate-500/70 hover:to-slate-600/70 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center justify-center gap-2 border border-slate-600/50"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button 
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600/70 to-blue-700/70 hover:from-blue-500/70 hover:to-blue-600/70 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 font-medium border border-blue-600/50"
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
