
import React from 'react';
import { Calendar, Target, TrendingUp, Clock, Brain, BookOpen, Trophy, BarChart3, RotateCcw } from 'lucide-react';
import { getUserProfile, calculateWeeklyProgress } from '@/utils/dataStore';
import { getUserProgress } from '@/utils/storageUtils';

interface ActivityCardProps {
  onNavigate: (screen: string) => void;
}

const ActivityCard = ({ onNavigate }: ActivityCardProps) => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const weeklyProgress = calculateWeeklyProgress();

  const quickActions = [
    {
      id: 'category',
      icon: Brain,
      label: 'Browse Topics',
      description: 'Explore by subject',
      color: 'bg-purple-600',
      action: () => onNavigate('category')
    },
    {
      id: 'review',
      icon: RotateCcw,
      label: 'Review Mistakes',
      description: 'Learn from errors',
      color: 'bg-red-600',
      action: () => onNavigate('review')
    },
    {
      id: 'leaderboard',
      icon: Trophy,
      label: 'Rankings',
      description: 'See your rank',
      color: 'bg-yellow-600',
      action: () => onNavigate('leaderboard')
    },
    {
      id: 'analytics',
      icon: BarChart3,
      label: 'Analytics',
      description: 'Track progress',
      color: 'bg-green-600',
      action: () => onNavigate('analytics')
    }
  ];

  return (
    <div className="bg-slate-800/30 rounded-xl p-6 space-y-6">
      {/* Study Stats */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-white">{userProfile.studyStreak}</div>
            <div className="text-sm text-slate-400">Day Streak</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-white">{userProgress.averageScore}%</div>
            <div className="text-sm text-slate-400">Avg Score</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-white">{Math.floor(Math.random() * 45) + 15}m</div>
            <div className="text-sm text-slate-400">Today</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-700"></div>

      {/* Weekly Progress */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-400" />
            This Week
          </h3>
          <span className="text-sm text-slate-400">
            {weeklyProgress.completed}/{weeklyProgress.goal} goals
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Weekly Goal Progress</span>
            <span className="text-blue-400">{Math.round(weeklyProgress.percentage)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${weeklyProgress.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-700"></div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="bg-slate-700/50 hover:bg-slate-600/50 rounded-xl p-4 text-left transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-white truncate">{action.label}</div>
                    <div className="text-xs text-slate-400 truncate">{action.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
