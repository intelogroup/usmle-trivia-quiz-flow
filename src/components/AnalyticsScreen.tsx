
import { TrendingUp, Clock, Trophy, Calendar, BookOpen, Target, Brain, Activity } from "lucide-react";
import { getUserProgress } from "@/utils/storageUtils";
import { getUSMLEAnalytics, calculateUSMLEInsights } from "@/utils/usmleAnalyticsManager";
import USMLEReadinessCard from "./analytics/USMLEReadinessCard";
import SubjectPerformanceRadar from "./analytics/SubjectPerformanceRadar";
import WeaknessAnalysis from "./analytics/WeaknessAnalysis";
import ClinicalCorrelationCard from "./analytics/ClinicalCorrelationCard";

const AnalyticsScreen = () => {
  const userProgress = getUserProgress();
  const usmleAnalytics = getUSMLEAnalytics();
  const insights = calculateUSMLEInsights(usmleAnalytics);

  // Get recent study activity (last 7 days)
  const recentSessions = usmleAnalytics.sessionAnalytics.slice(0, 7);
  const weeklyActivity = recentSessions.map(session => ({
    date: new Date(session.date).toLocaleDateString('en', { weekday: 'short' }),
    questions: session.questionsAttempted,
    accuracy: session.accuracy,
    duration: Math.round(session.duration / 60 * 10) / 10 // Convert to hours
  }));

  // Calculate study streak
  const studyStreak = usmleAnalytics.sessionAnalytics
    .slice(0, 30)
    .reduce((streak, session, index) => {
      const sessionDate = new Date(session.date);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - index);
      
      if (sessionDate.toDateString() === expectedDate.toDateString()) {
        return streak + 1;
      }
      return streak;
    }, 0);

  const totalStudyHours = Math.round(insights.totalStudyHours);
  const averageSessionAccuracy = insights.recentTrend;

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto shadow-md">
          <Brain className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">USMLE Analytics</h1>
        <p className="text-slate-400 text-sm">Advanced insights for your medical exam preparation</p>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white">{averageSessionAccuracy}%</div>
          <div className="text-xs text-slate-400">7-Day Average</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-xl font-bold text-white">{totalStudyHours}h</div>
          <div className="text-xs text-slate-400">Total Study Time</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-xl font-bold text-white">{insights.questionsCompleted}</div>
          <div className="text-xs text-slate-400">Questions Completed</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white">{studyStreak}</div>
          <div className="text-xs text-slate-400">Day Streak</div>
        </div>
      </div>

      {/* USMLE Readiness */}
      <USMLEReadinessCard />

      {/* Weekly Study Activity */}
      <div className="bg-slate-800 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
        </div>
        <div className="flex justify-between items-end space-x-2 h-32 mb-4">
          {weeklyActivity.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="text-xs text-slate-400 mb-2">{day.accuracy}%</div>
              <div 
                className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md w-full mb-2 transition-all duration-700"
                style={{ 
                  height: `${Math.max(day.questions * 3, 4)}px`,
                  minHeight: '4px'
                }}
              ></div>
              <div className="text-xs text-slate-400">{day.date}</div>
              <div className="text-xs text-slate-500">{day.duration}h</div>
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-slate-400">
          Daily questions attempted and accuracy
        </div>
      </div>

      {/* Subject Performance Radar */}
      <SubjectPerformanceRadar />

      {/* Clinical Correlation */}
      <ClinicalCorrelationCard />

      {/* Strength & Weakness Analysis */}
      <div className="grid grid-cols-1 gap-6">
        {/* Strongest Areas */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>Strongest Areas</span>
          </h3>
          <div className="space-y-3">
            {insights.strongestSubjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-slate-300">{subject.subject}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                  <span className="text-green-400 font-medium text-sm">{subject.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-orange-400" />
            <span>Focus Areas</span>
          </h3>
          <div className="space-y-3">
            {insights.weakestSubjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-slate-300">{subject.subject}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                  <span className="text-orange-400 font-medium text-sm">{subject.score}%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors text-sm">
            Practice Weak Areas
          </button>
        </div>
      </div>

      {/* Weakness Patterns Analysis */}
      <WeaknessAnalysis />

      {/* Study Insights */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Study Insights</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-300">
              You've maintained a {studyStreak}-day study streak with {insights.studyConsistency}/7 days this week
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-300">
              Strongest performance in {insights.strongestSubjects[0]?.subject} ({insights.strongestSubjects[0]?.score}%)
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-slate-300">
              Focus needed in {insights.weakestSubjects[0]?.subject} for optimal USMLE preparation
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-slate-300">
              Average study time: {Math.round(totalStudyHours / 30 * 10) / 10}h per day over last 30 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
