import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, Target, Award } from 'lucide-react';
import { getUserProfile } from '@/utils/dataStore';
import { getUserProgress } from '@/utils/storageUtils';

const StudyProgressTracker = () => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();

  const getWeekStartDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  };

  const getWeekEndDate = () => {
    const startDate = getWeekStartDate();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return endDate;
  };

  const getMonthStartDate = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  };

  const getMonthEndDate = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  };

  const getWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getMonthCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const hasActivity = (date: Date) => {
    return Math.random() > 0.7;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const weekDays = getWeekDays();
  const monthDays = getMonthCalendar();
  const weeklyGoal = 5;
  const completed = 3;
  const progressPercentage = (completed / weeklyGoal) * 100;

  if (viewMode === 'month') {
    const activeDays = monthDays.filter(day => isCurrentMonth(day) && hasActivity(day)).length;
    const totalDaysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const consistency = Math.round((activeDays / totalDaysInMonth) * 100);
    const questionsAnswered = activeDays * 25;

    return (
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-6 space-y-6 border border-slate-600/30 shadow-xl">
        {/* Enhanced header with toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-400" />
              Study Progress
            </h3>
            <p className="text-sm text-slate-400">Monthly overview and consistency</p>
          </div>
          <div className="flex items-center bg-slate-700/80 rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setViewMode('week')}
              className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-600/50"
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 bg-blue-600 text-white shadow-lg"
            >
              Month
            </button>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
          <button onClick={() => navigateMonth('prev')} className="p-2 hover:bg-slate-600/50 rounded-lg transition-all duration-200 hover:scale-110">
            <ChevronLeft className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
          <h4 className="text-lg font-bold text-white">{formatMonthYear(currentDate)}</h4>
          <button onClick={() => navigateMonth('next')} className="p-2 hover:bg-slate-600/50 rounded-lg transition-all duration-200 hover:scale-110">
            <ChevronRight className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Enhanced Month Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-blue-500/25">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-blue-400">{activeDays}</div>
            <div className="text-xs text-slate-400">Active Days</div>
          </div>
          <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-green-500/25">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-green-400">{consistency}%</div>
            <div className="text-xs text-slate-400">Consistency</div>
          </div>
          <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-yellow-500/25">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-yellow-400">{questionsAnswered}</div>
            <div className="text-xs text-slate-400">Questions</div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-3">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-xs font-medium text-slate-400 text-center py-2 bg-slate-700/30 rounded">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((day, index) => {
              const isCurrentDay = isToday(day);
              const isInCurrentMonth = isCurrentMonth(day);
              const hasActivityOnDay = hasActivity(day);
              
              return (
                <div
                  key={index}
                  className={`
                    h-10 w-full rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer
                    ${isCurrentDay 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : hasActivityOnDay && isInCurrentMonth
                        ? 'bg-gradient-to-br from-blue-500/30 to-blue-600/30 text-blue-300 border border-blue-500/50 hover:shadow-blue-500/25'
                        : isInCurrentMonth
                          ? 'text-slate-300 hover:bg-slate-700/50 hover:scale-105'
                          : 'text-slate-600'
                    }
                  `}
                >
                  {day.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-6 space-y-6 border border-slate-600/30 shadow-xl">
      {/* Enhanced header with toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-400" />
            This Week
          </h3>
          <p className="text-sm text-slate-400">Your daily study commitment</p>
        </div>
        <div className="flex items-center bg-slate-700/80 rounded-lg p-1 shadow-inner">
          <button
            onClick={() => setViewMode('week')}
            className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 bg-blue-600 text-white shadow-lg"
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('month')}
            className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-600/50"
          >
            Month
          </button>
        </div>
      </div>

      {/* Enhanced Weekly Goal */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-white">Weekly Quiz Goal</span>
            <p className="text-sm text-slate-400">Stay consistent to build habits</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-400">{completed}/{weeklyGoal}</span>
            <p className="text-xs text-slate-400">{Math.round(progressPercentage)}% complete</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-slate-700 rounded-full h-4 shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 shadow-lg relative overflow-hidden" 
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>Started Monday</span>
            <span>{weeklyGoal - completed} days to go</span>
          </div>
        </div>
      </div>

      {/* Enhanced Day Bubbles */}
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const isCurrentDay = isToday(day);
            const hasActivityOnDay = hasActivity(day);
            const dayName = getDayName(day).toUpperCase();
            const dateNum = day.getDate();
            
            return (
              <div key={index} className="flex flex-col items-center space-y-2">
                {/* Day label */}
                <div className="text-xs font-bold text-slate-400">
                  {dayName}
                </div>
                
                {/* Enhanced Date bubble */}
                <div
                  className={`
                    relative w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 cursor-pointer group
                    ${isCurrentDay 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ring-2 ring-blue-400/50 shadow-lg shadow-blue-500/25' 
                      : hasActivityOnDay
                        ? 'bg-gradient-to-br from-blue-500/30 to-blue-600/30 text-blue-300 border border-blue-500/50 hover:bg-blue-500/40 hover:shadow-blue-500/25'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/30'
                    }
                    hover:scale-110
                  `}
                  title={`${dayName} ${dateNum}${hasActivityOnDay ? ' - Quiz completed' : ''}${isCurrentDay ? ' (Today)' : ''}`}
                >
                  {dateNum}
                  
                  {/* Activity indicator */}
                  {hasActivityOnDay && !isCurrentDay && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800 shadow-lg">
                      <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                  
                  {/* Today indicator */}
                  {isCurrentDay && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Week summary */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-white">
                {progressPercentage >= 80 ? 
                  "Amazing week! You're on fire! 🔥" :
                  progressPercentage >= 60 ?
                  "Great progress this week! 💪" :
                  "Keep going! Every day counts! ⭐"
                }
              </span>
            </div>
            <span className="text-xs text-slate-400">{completed} days active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyProgressTracker;
