
import React, { useState } from 'react';
import { Calendar, Target, TrendingUp, Clock, Zap } from 'lucide-react';
import { getUserProfile, calculateWeeklyProgress } from '@/utils/dataStore';
import { getUserProgress } from '@/utils/storageUtils';

const StudyProgressTracker = () => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const weeklyProgress = calculateWeeklyProgress();
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

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
      const questionsAnswered = hasActivity ? Math.floor(Math.random() * 25) + 5 : 0;
      const studyTime = hasActivity ? Math.floor(Math.random() * 90) + 15 : 0;
      
      days.push({
        date: date.getDate(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        hasActivity,
        intensity, // 0-3 scale
        questionsAnswered,
        studyTime,
        isToday: date.toDateString() === today.toDateString()
      });
    }
    
    return days;
  };

  const studyDays = getStudyCalendar();

  const getDayBubbleStyle = (day: any) => {
    const baseClasses = 'w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110 cursor-pointer relative';
    
    if (day.isToday) {
      return `${baseClasses} bg-blue-500 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-800 shadow-lg`;
    } else if (day.hasActivity) {
      const intensityColors = {
        1: 'bg-green-500/40 text-green-200 border-2 border-green-500/60 hover:bg-green-500/60',
        2: 'bg-green-500/60 text-green-100 border-2 border-green-500/80 hover:bg-green-500/80',
        3: 'bg-green-500/80 text-white border-2 border-green-500 hover:bg-green-500'
      };
      return `${baseClasses} ${intensityColors[day.intensity as keyof typeof intensityColors]}`;
    } else {
      return `${baseClasses} bg-slate-700 text-slate-400 border border-slate-600 hover:bg-slate-600 hover:text-slate-300`;
    }
  };

  const getMotivationalMessage = () => {
    const percentage = weeklyProgress.percentage;
    if (percentage >= 100) return "🎉 Weekly goal crushed! You're on fire!";
    if (percentage >= 80) return "🔥 Almost there! One more push!";
    if (percentage >= 60) return "💪 Great progress! Keep it up!";
    if (percentage >= 40) return "📈 Building momentum!";
    if (percentage >= 20) return "🚀 Good start! Let's keep going!";
    return "✨ Ready to start your weekly journey?";
  };

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-700/50">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-400" />
            This Week
          </h3>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-yellow-400 font-medium">{userProfile.studyStreak} day streak</span>
          </div>
        </div>

        {/* Enhanced Goal Statement */}
        <div className="space-y-4 mb-5">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-300">Weekly Quiz Goal</span>
            <span className="text-xl font-bold text-blue-400">{weeklyProgress.completed}/{weeklyProgress.goal}</span>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden" 
              style={{ width: `${weeklyProgress.percentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
            </div>
          </div>
          
          <div className="text-xs text-slate-400 text-center">
            {Math.round(weeklyProgress.percentage)}% Complete • {getMotivationalMessage()}
          </div>
        </div>

        {/* Enhanced Visual Mini-Calendar */}
        <div className="space-y-4">
          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2">
            {studyDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-slate-400 mb-1 font-medium">{day.dayName}</div>
              </div>
            ))}
          </div>
          
          {/* Interactive Day Bubbles */}
          <div className="grid grid-cols-7 gap-2">
            {studyDays.map((day, index) => (
              <div key={index} className="flex justify-center relative">
                <div
                  className={getDayBubbleStyle(day)}
                  onMouseEnter={() => setHoveredDay(index)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  {day.date}
                  {day.hasActivity && !day.isToday && (
                    <div className="absolute w-2 h-2 bg-green-400 rounded-full transform translate-x-4 -translate-y-4 animate-pulse"></div>
                  )}
                </div>
                
                {/* Tooltip */}
                {hoveredDay === index && (
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-10 bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl border border-slate-600 whitespace-nowrap animate-fade-in">
                    <div className="font-medium">{day.dayName} {day.date}</div>
                    {day.hasActivity ? (
                      <div className="text-slate-300">
                        <div>{day.questionsAnswered} questions</div>
                        <div>{day.studyTime} min studied</div>
                      </div>
                    ) : (
                      <div className="text-slate-400">No activity</div>
                    )}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-t border-slate-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Study Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700/50 hover:border-blue-500/30 transition-all duration-200 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="text-xl font-bold text-white">{userProfile.studyStreak}</div>
          <div className="text-sm text-slate-400">Day Streak</div>
          <div className="text-xs text-blue-400 mt-1">+{Math.floor(userProfile.studyStreak * 1.5)} XP</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700/50 hover:border-green-500/30 transition-all duration-200 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-xl font-bold text-white">{userProgress.averageScore}%</div>
          <div className="text-sm text-slate-400">Avg Score</div>
          <div className="text-xs text-green-400 mt-1">
            {userProgress.averageScore >= 80 ? 'Excellent!' : userProgress.averageScore >= 70 ? 'Good!' : 'Keep trying!'}
          </div>
        </div>
      </div>

      {/* Enhanced Study Time Today */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-white">Study Time Today</span>
          </div>
          <div className="text-orange-400 font-bold text-lg">
            {Math.floor(Math.random() * 45) + 15}m
          </div>
        </div>
        <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-3 rounded-full w-3/4 transition-all duration-500 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>Goal: 60 minutes</span>
          <span>75% complete</span>
        </div>
      </div>
    </div>
  );
};

export default StudyProgressTracker;
