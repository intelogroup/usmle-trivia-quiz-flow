
import { TrendingUp, Target, Clock, Trophy, Calendar, BookOpen, ChevronUp, ChevronDown } from "lucide-react";
import { getUserProfile, getSubjectStats, getWeeklyActivity } from "@/utils/dataStore";
import { getUserProgress, getQuizHistory } from "@/utils/storageUtils";

const AnalyticsScreen = () => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const subjectStats = getSubjectStats();
  const quizHistory = getQuizHistory();

  // Calculate total study time (estimated 1.2 minutes per question)
  const totalTime = userProgress.totalQuestions * 1.2;

  // Calculate weekly data for the last 7 days
  const getWeeklyData = () => {
    const today = new Date();
    const weeklyData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = date.toLocaleDateString('en', { weekday: 'short' });
      
      const dayQuizzes = quizHistory.filter(quiz => {
        const quizDate = new Date(quiz.date);
        return quizDate.toDateString() === date.toDateString();
      });
      
      const dayScore = dayQuizzes.length > 0 
        ? Math.round(dayQuizzes.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions) * 100, 0) / dayQuizzes.length)
        : 0;
      
      weeklyData.push({
        day: dayName,
        quizzes: dayQuizzes.length,
        score: dayScore
      });
    }
    
    return weeklyData;
  };

  const weeklyData = getWeeklyData();

  // Filter subject performance to only show subjects with data
  const subjectPerformance = subjectStats
    .filter(stat => stat.totalQuestions > 0)
    .map(stat => ({
      subject: stat.subject,
      score: stat.averageScore,
      quizzes: Math.floor(stat.totalQuestions / 10), // Approximate number of quizzes
      trend: Math.random() > 0.5 ? 'up' : 'down' // Mock trend data
    }))
    .sort((a, b) => b.score - a.score);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;
  };

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      'Pathology': '🧬',
      'Physiology': '🫀',
      'Anatomy': '🦴',
      'Pharmacology': '💊',
      'Microbiology': '🦠',
      'Immunology': '🛡️'
    };
    return icons[subject] || '📚';
  };

  // Find best and worst performing subjects
  const bestSubject = subjectPerformance.length > 0 ? subjectPerformance[0] : null;
  const worstSubject = subjectPerformance.length > 0 ? subjectPerformance[subjectPerformance.length - 1] : null;

  return (
    <div className="p-4 pb-20 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto shadow-md">
          <TrendingUp className="w-8 h-8 text-teal-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 text-sm">Track your learning progress</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 text-center h-24 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
          <div className="w-8 h-8 bg-teal-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-xl font-bold text-white">{userProgress.totalQuizzes}</div>
          <div className="text-xs text-slate-400">
            {userProgress.totalQuizzes === 1 ? 'Quiz Completed' : 'Quizzes Completed'}
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center h-24 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
          <div className="w-8 h-8 bg-teal-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
            {userProgress.averageScore}%
            <ChevronUp className="w-3 h-3 text-green-400" />
          </div>
          <div className="text-xs text-slate-400">Average Score</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center h-24 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
          <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-xl font-bold text-white">{formatTime(totalTime)}</div>
          <div className="text-xs text-slate-400">Study Time</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center h-24 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
          <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
            {userProfile.studyStreak}
            <ChevronUp className="w-3 h-3 text-green-400" />
          </div>
          <div className="text-xs text-slate-400">Current Streak</div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
        <div className="bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-end space-x-2 h-32 mb-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-md w-full mb-2 transition-all duration-700 ease-out"
                  style={{ 
                    height: `${Math.max(day.quizzes * 20, 4)}px`,
                    minHeight: '4px',
                    animationDelay: `${index * 100}ms`
                  }}
                ></div>
                <div className="text-xs text-slate-400">{day.day}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-700 pt-3">
            <p className="text-sm text-slate-400 text-center">Quizzes completed this week</p>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      {subjectPerformance.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Subject Performance</h3>
          <div className="space-y-3">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                      <span className="text-sm">{getSubjectIcon(subject.subject)}</span>
                    </div>
                    <span className="font-medium text-white">{subject.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">{subject.quizzes} quiz{subject.quizzes !== 1 ? 'es' : ''}</span>
                    {subject.trend === 'up' ? (
                      <ChevronUp className="w-3 h-3 text-green-400" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-red-400" />
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        subject.score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' : 
                        subject.score >= 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 
                        'bg-gradient-to-r from-red-500 to-red-400'
                      }`}
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-white">{subject.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Study Insights</h3>
        <div className="bg-slate-800 rounded-xl p-4 space-y-3 shadow-sm">
          {userProgress.totalQuizzes > 1 && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-sm text-slate-300">You've completed {userProgress.totalQuizzes} quizzes with {userProgress.averageScore}% accuracy</span>
            </div>
          )}
          {bestSubject && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-300">Strongest subject: {bestSubject.subject} ({bestSubject.score}% avg)</span>
            </div>
          )}
          {worstSubject && worstSubject.score < 80 && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-slate-300">Focus area: {worstSubject.subject} needs improvement</span>
            </div>
          )}
          {userProgress.totalQuizzes === 0 && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-sm text-slate-300">Start taking quizzes to see your analytics here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
