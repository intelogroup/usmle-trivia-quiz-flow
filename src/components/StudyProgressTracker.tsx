
import React from 'react';
import { Calendar, Target, TrendingUp, Clock } from 'lucide-react';
import { getUserProfile, calculateWeeklyProgress } from '@/utils/dataStore';
import { getUserProgress } from '@/utils/storageUtils';

const StudyProgressTracker = () => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const weeklyProgress = calculateWeeklyProgress();

  // Generate study calendar data (last 7 days)
  const getStudyCalendar = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Mock activity data - in real app, this would come from actual quiz history
      const hasActivity = Math.random() > 0.3;
      const intensity = hasActivity ? Math.floor(Math.random() * 3) + 1 : 0;
      
      days.push({
        date: date.getDate(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        hasActivity,
        intensity, // 0-3 scale
        isToday: i === 0
      });
    }
    
    return days;
  };

  const studyDays = getStudyCalendar();

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 1: return 'bg-green-200';
      case 2: return 'bg-green-400';
      case 3: return 'bg-green-600';
      default: return 'bg-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="bg-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-400" />
            This Week
          </h3>
          <div className="text-sm text-slate-400">
            {weeklyProgress.completed}/{weeklyProgress.goal} goals
          </div>
        </div>

        {/* Study Calendar */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {studyDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-slate-400 mb-1">{day.dayName}</div>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                  getIntensityColor(day.intensity)
                } ${day.isToday ? 'ring-2 ring-blue-400' : ''}`}
              >
                {day.date}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
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

      {/* Study Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="text-lg font-bold text-white">{userProfile.studyStreak}</div>
          <div className="text-sm text-slate-400">Day Streak</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="text-lg font-bold text-white">{userProgress.averageScore}%</div>
          <div className="text-sm text-slate-400">Avg Score</div>
        </div>
      </div>

      {/* Study Time Today */}
      <div className="bg-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-orange-400 mr-2" />
            <span className="font-medium text-white">Study Time Today</span>
          </div>
          <div className="text-orange-400 font-bold">
            {Math.floor(Math.random() * 45) + 15}m
          </div>
        </div>
        <div className="mt-3 bg-slate-700 rounded-full h-2">
          <div className="bg-orange-400 h-2 rounded-full w-3/4"></div>
        </div>
        <div className="text-sm text-slate-400 mt-2">
          Goal: 60 minutes
        </div>
      </div>
    </div>
  );
};

export default StudyProgressTracker;
