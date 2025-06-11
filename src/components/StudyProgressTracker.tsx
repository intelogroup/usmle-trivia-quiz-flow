import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const completed = 1;
  const progressPercentage = (completed / weeklyGoal) * 100;

  if (viewMode === 'month') {
    const activeDays = monthDays.filter(day => isCurrentMonth(day) && hasActivity(day)).length;
    const totalDaysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const consistency = Math.round((activeDays / totalDaysInMonth) * 100);
    const questionsAnswered = activeDays * 25;

    return (
      <div className="bg-slate-800 rounded-xl p-4 space-y-4">
        {/* Header with toggle */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Study Progress</h3>
          <div className="flex items-center bg-slate-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className="px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 text-slate-300 hover:text-white"
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className="px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 text-white"
            >
              Month
            </button>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigateMonth('prev')} className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>
          <h4 className="text-lg font-semibold text-white">{formatMonthYear(currentDate)}</h4>
          <button onClick={() => navigateMonth('next')} className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Month Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">{activeDays}</div>
            <div className="text-xs text-slate-400">Active Days</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{consistency}%</div>
            <div className="text-xs text-slate-400">Consistency</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-400">{questionsAnswered}</div>
            <div className="text-xs text-slate-400">Questions</div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-xs font-medium text-slate-400 text-center py-1">
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
                    h-8 w-8 rounded-lg flex items-center justify-center text-xs font-medium transition-colors duration-200
                    ${isCurrentDay 
                      ? 'bg-blue-600 text-white' 
                      : hasActivityOnDay && isInCurrentMonth
                        ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                        : isInCurrentMonth
                          ? 'text-slate-300 hover:bg-slate-700'
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
    <div className="bg-slate-800 rounded-xl p-4 space-y-4">
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">This Week</h3>
        <div className="flex items-center bg-slate-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode('week')}
            className="px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 text-white"
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('month')}
            className="px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 text-slate-300 hover:text-white"
          >
            Month
          </button>
        </div>
      </div>

      {/* Weekly Goal */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white">Weekly Quiz Goal: {completed}/{weeklyGoal}</span>
          <span className="text-xs text-slate-400">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Enhanced Day Bubbles */}
      <div className="space-y-3">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, index) => {
            const isCurrentDay = isToday(day);
            const hasActivityOnDay = hasActivity(day);
            const dayName = getDayName(day).toUpperCase();
            const dateNum = day.getDate();
            
            return (
              <div key={index} className="flex flex-col items-center space-y-1">
                {/* Day label */}
                <div className="text-xs font-medium text-slate-400">
                  {dayName}
                </div>
                
                {/* Date bubble */}
                <div
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 cursor-pointer group
                    ${isCurrentDay 
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400/50' 
                      : hasActivityOnDay
                        ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50 hover:bg-blue-500/40'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }
                  `}
                  title={`${dayName} ${dateNum}${hasActivityOnDay ? ' - Quiz completed' : ''}${isCurrentDay ? ' (Today)' : ''}`}
                >
                  {dateNum}
                  
                  {/* Activity indicator dot */}
                  {hasActivityOnDay && !isCurrentDay && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudyProgressTracker;
