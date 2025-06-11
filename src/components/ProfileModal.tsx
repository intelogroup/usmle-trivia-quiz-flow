
import React, { useState } from 'react';
import { X, Trophy, Calendar, Target, TrendingUp, Award, Star, Zap, BookOpen, Brain, Clock } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { getUserProfile } from '@/utils/dataStore';
import { getUserProgress } from '@/utils/storageUtils';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  points: number;
}

const ProfileModal = ({ isOpen, onClose, onNavigate }: ProfileModalProps) => {
  if (!isOpen) return null;

  const userProfile = getUserProfile();
  const userProgress = getUserProgress();

  const [selectedTab, setSelectedTab] = useState('achievements');

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const closeModal = () => {
    onClose();
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first quiz',
      icon: '🎯',
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      points: 50
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 7-day study streak',
      icon: '🔥',
      progress: userProfile.studyStreak,
      maxProgress: 7,
      unlocked: userProfile.studyStreak >= 7,
      points: 200
    },
    {
      id: '3',
      title: 'Quiz Marathon',
      description: 'Complete 50 quizzes',
      icon: '🏃‍♂️',
      progress: userProgress.totalQuizzes,
      maxProgress: 50,
      unlocked: userProgress.totalQuizzes >= 50,
      points: 500
    },
    {
      id: '4',
      title: 'Perfectionist',
      description: 'Score 100% on a quiz',
      icon: '💯',
      progress: 0,
      maxProgress: 1,
      unlocked: false,
      points: 100
    },
    {
      id: '5',
      title: 'Knowledge Seeker',
      description: 'Answer 1000 questions correctly',
      icon: '🧠',
      progress: Math.floor(userProgress.totalQuizzes * userProgress.averageScore / 100 * 20),
      maxProgress: 1000,
      unlocked: false,
      points: 1000
    },
    {
      id: '6',
      title: 'Consistency King',
      description: 'Study for 30 consecutive days',
      icon: '👑',
      progress: userProfile.studyStreak,
      maxProgress: 30,
      unlocked: userProfile.studyStreak >= 30,
      points: 1500
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-900 rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Profile</h2>
          <button onClick={closeModal} className="hover:opacity-70 transition-opacity duration-200">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-12 h-12 ring-2 ring-blue-500/30">
            <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face" alt="Profile" />
            <AvatarFallback className="text-sm bg-orange-500 text-white font-semibold">{userProfile.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-white font-semibold">{userProfile.name}</div>
            <div className="text-xs text-slate-400">Medical Student</div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="bg-slate-800 rounded-lg p-1">
            <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-slate-400 hover:text-slate-300 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-slate-400 hover:text-slate-300 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900">
              Stats
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-slate-400 hover:text-slate-300 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900">
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="achievements" className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <span>{achievement.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{achievement.title}</div>
                    <div className="text-xs text-slate-400">{achievement.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  {achievement.unlocked ? (
                    <div className="text-green-400 text-xs font-semibold">Unlocked!</div>
                  ) : (
                    <div className="text-slate-400 text-xs">{achievement.progress}/{achievement.maxProgress}</div>
                  )}
                  <div className="text-yellow-400 text-xs">{achievement.points} Points</div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="stats" className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-sm font-medium text-white">Average Score</div>
              </div>
              <div className="text-2xl font-bold text-green-400">{userProgress.averageScore}%</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-sm font-medium text-white">Quizzes Taken</div>
              </div>
              <div className="text-2xl font-bold text-orange-400">{userProgress.totalQuizzes}</div>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <button onClick={() => onNavigate('settings')} className="bg-slate-800 rounded-lg p-3 w-full text-left hover:bg-slate-700 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-sm font-medium text-white">Account Settings</div>
              </div>
            </button>
            <button onClick={() => onNavigate('settings')} className="bg-slate-800 rounded-lg p-3 w-full text-left hover:bg-slate-700 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                <div className="text-sm font-medium text-white">Preferences</div>
              </div>
            </button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileModal;
