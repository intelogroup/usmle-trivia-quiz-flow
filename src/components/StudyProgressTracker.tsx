
import React from 'react';
import { Calendar, Target, TrendingUp, Clock } from 'lucide-react';
import { getUserProfile, calculateWeeklyProgress } from '@/utils/dataStore';
import { getUserProgress } from '@/utils/storageUtils';

const StudyProgressTracker = () => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const weeklyProgress = calculateWeeklyProgress();

  // Generate study calendar data (last 7 days, Thu-Wed sequence)
  const getStudyCalendar = () => {
    const days = [];
    const today = new Date();
    
    // Find the Thursday of current week (6 days ago to today)
    const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysFromThursday = (currentDayOfWeek + 3) % 7; // Days since last Thursday
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - daysFromThursday + (i - 6));
      
      // Mock activity data - in real app, this would come from actual quiz history
      const hasActivity = Math.random() > 0.4;
      const intensity = hasActivity ? Math.floor(Math.random() * 3) + 1 : 0;
      
      days.push({
        date: date.getDate(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        hasActivity,
        intensity, // 0-3 scale
        isToday: date.toDateString() === today.toDateString()
      });
    }
    
    return days;
  };

  const studyDays = getStudyCalendar();

  const getDayBubbleStyle = (day: any) => {
    if (day.isToday) {
      return 'bg-blue-500 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-800';
    } else if (day.hasActivity) {
      return 'bg-green-500/30 text-green-300 border-2 border-green-500/50';
    } else {
      return 'bg-slate-700 text-slate-400 border border-slate-600';
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
        </div>

        {/* Clearer Goal Statement */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-300">Weekly Quiz Goal</span>
            <span className="text-lg font-bold text-blue-400">{weeklyProgress.completed}/{weeklyProgress.goal}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${weeklyProgress.percentage}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-slate-400 text-center">
            {Math.round(weeklyProgress.percentage)}% Complete
          </div>
        </div>

        {/* Visual Mini-Calendar */}
        <div className="space-y-3">
          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2">
            {studyDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-slate-400 mb-1 font-medium">{day.dayName}</div>
              </div>
            ))}
          </div>
          
          {/* Day Bubbles */}
          <div className="grid grid-cols-7 gap-2">
            {studyDays.map((day, index) => (
              <div key={index} className="flex justify-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 hover:scale-105 ${
                    getDayBubbleStyle(day)
                  }`}
                >
                  {day.date}
                  {day.hasActivity && !day.isToday && (
                    <div className="absolute w-2 h-2 bg-green-400 rounded-full transform translate-x-3 -translate-y-3"></div>
                  )}
                </div>
              </div>
            ))}
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
