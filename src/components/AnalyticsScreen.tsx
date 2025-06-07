
import { TrendingUp, Target, Clock, Trophy, Calendar, BookOpen } from "lucide-react";

const AnalyticsScreen = () => {
  const analyticsData = {
    totalQuizzes: 12,
    averageScore: 78,
    totalTime: 145, // minutes
    bestStreak: 7,
    weeklyData: [
      { day: 'Mon', quizzes: 2, score: 85 },
      { day: 'Tue', quizzes: 1, score: 72 },
      { day: 'Wed', quizzes: 3, score: 91 },
      { day: 'Thu', quizzes: 0, score: 0 },
      { day: 'Fri', quizzes: 2, score: 68 },
      { day: 'Sat', quizzes: 1, score: 95 },
      { day: 'Sun', quizzes: 2, score: 82 }
    ],
    subjectPerformance: [
      { subject: 'Anatomy', score: 85, quizzes: 3 },
      { subject: 'Physiology', score: 72, quizzes: 2 },
      { subject: 'Pharmacology', score: 91, quizzes: 4 },
      { subject: 'Pathology', score: 68, quizzes: 2 },
      { subject: 'Microbiology', score: 79, quizzes: 1 }
    ]
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

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
          <div className="text-2xl font-bold">{analyticsData.totalQuizzes}</div>
          <div className="text-sm text-slate-400">Total Quizzes</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">{analyticsData.averageScore}%</div>
          <div className="text-sm text-slate-400">Average Score</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">{formatTime(analyticsData.totalTime)}</div>
          <div className="text-sm text-slate-400">Study Time</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">{analyticsData.bestStreak}</div>
          <div className="text-sm text-slate-400">Best Streak</div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Weekly Activity</h3>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-end space-x-2 h-32">
            {analyticsData.weeklyData.map((day, index) => (
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
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Subject Performance</h3>
        <div className="space-y-3">
          {analyticsData.subjectPerformance.map((subject, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{subject.subject}</span>
                <span className="text-sm text-slate-400">{subject.quizzes} quizzes</span>
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

      {/* Study Insights */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Study Insights</h3>
        <div className="bg-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Your performance is improving by 5% weekly</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Strongest subject: Pharmacology (91% avg)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">Focus area: Pathology needs improvement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
