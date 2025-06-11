
import { TrendingUp, Clock, Trophy, Calendar, BookOpen, Target, Brain, Activity } from "lucide-react";
import { getUserProgress } from "@/utils/storageUtils";
import { getUSMLEAnalytics, calculateUSMLEInsights } from "@/utils/usmleAnalyticsManager";
import USMLEReadinessCard from "./analytics/USMLEReadinessCard";
import SubjectSystemPerformance from "./analytics/SubjectSystemPerformance";
import SimplifiedWeaknessAnalysis from "./analytics/SimplifiedWeaknessAnalysis";
import CategoryOverview from "./analytics/CategoryOverview";
import DailyActivityChart from "./analytics/DailyActivityChart";

const AnalyticsScreen = () => {
  const userProgress = getUserProgress();
  const usmleAnalytics = getUSMLEAnalytics();
  const insights = calculateUSMLEInsights(usmleAnalytics);

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
        <p className="text-slate-400 text-sm">Track your progress across subjects and systems</p>
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

      {/* Category Overview */}
      <CategoryOverview />

      {/* Enhanced Daily Activity Chart */}
      <DailyActivityChart />

      {/* Subject & System Performance */}
      <SubjectSystemPerformance />

      {/* Focus Areas */}
      <SimplifiedWeaknessAnalysis />

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
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
