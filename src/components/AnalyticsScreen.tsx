
import { TrendingUp, Target, Clock, Trophy, Calendar, BookOpen } from "lucide-react";
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
      quizzes: Math.floor(stat.totalQuestions / 10) // Approximate number of quizzes
    }))
    .sort((a, b) => b.score - a.score);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Find best and worst performing subjects
  const bestSubject = subjectPerformance.length > 0 ? subjectPerformance[0] : null;
  const worstSubject = subjectPerformance.length > 0 ? subjectPerformance[subjectPerformance.length - 1] : null;

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
          <TrendingUp className="w-8 h-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-slate-300">Track your learning progress</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">{userProgress.totalQuizzes}</div>
          <div className="text-sm text-slate-400">Total Quizzes</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">{userProgress.averageScore}%</div>
          <div className="text-sm text-slate-400">Average Score</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">{formatTime(totalTime)}</div>
          <div className="text-sm text-slate-400">Study Time</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">{userProfile.studyStreak}</div>
          <div className="text-sm text-slate-400">Current Streak</div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Weekly Activity</h3>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-end space-x-2 h-32">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="bg-blue-600 rounded-t-sm w-full mb-2 transition-all duration-300"
                  style={{ 
                    height: `${Math.max(day.quizzes * 20, 8)}px`,
                    minHeight: '8px'
                  }}
                ></div>
                <div className="text-xs text-slate-400">{day.day}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-slate-400">Quizzes completed this week</p>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      {subjectPerformance.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Subject Performance</h3>
          <div className="space-y-3">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{subject.subject}</span>
                  <span className="text-sm text-slate-400">{subject.quizzes} quiz{subject.quizzes !== 1 ? 'es' : ''}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        subject.score >= 80 ? 'bg-green-500' : 
                        subject.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold">{subject.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Insights */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Study Insights</h3>
        <div className="bg-slate-800 rounded-xl p-4 space-y-3">
          {userProgress.totalQuizzes > 1 && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">You've completed {userProgress.totalQuizzes} quizzes with {userProgress.averageScore}% accuracy</span>
            </div>
          )}
          {bestSubject && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Strongest subject: {bestSubject.subject} ({bestSubject.score}% avg)</span>
            </div>
          )}
          {worstSubject && worstSubject.score < 80 && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Focus area: {worstSubject.subject} needs improvement</span>
            </div>
          )}
          {userProgress.totalQuizzes === 0 && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Start taking quizzes to see your analytics here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
