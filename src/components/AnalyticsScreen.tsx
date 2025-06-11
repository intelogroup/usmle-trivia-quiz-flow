
import { TrendingUp, Clock, Trophy, Calendar, BookOpen, Target, Brain, Activity } from "lucide-react";
import { getUserProgress } from "@/utils/storageUtils";
import { getUSMLEAnalytics, calculateUSMLEInsights } from "@/utils/usmleAnalyticsManager";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

  // Get recent study activity (last 7 days)
  const recentSessions = usmleAnalytics.sessionAnalytics.slice(0, 7);
  const weeklyActivity = recentSessions.map(session => ({
    date: new Date(session.date).toLocaleDateString('en', { weekday: 'short' }),
    questions: session.questionsAttempted,
    accuracy: session.accuracy,
    duration: Math.round(session.duration / 60 * 10) / 10,
  }));

  const totalWeeklyQuestions = weeklyActivity.reduce((sum, day) => sum + day.questions, 0);
  const weeklyStudyHours = weeklyActivity.reduce((sum, day) => sum + day.duration, 0);
  const activeDays = weeklyActivity.filter(d => d.questions > 0).length;
  const bestDay = weeklyActivity.reduce((best, day) => day.questions > best.questions ? day : best, weeklyActivity[0]);

  const analytics = getUSMLEAnalytics();
  const { readinessScore } = analytics;

  // Calculate averages
  const subjectScores = Object.values(readinessScore.subjectReadiness) as number[];
  const systemScores = Object.values(readinessScore.systemReadiness) as number[];
  const avgSubjectScore = Math.round(subjectScores.reduce((sum, score) => sum + score, 0) / subjectScores.length);
  const avgSystemScore = Math.round(systemScores.reduce((sum, score) => sum + score, 0) / systemScores.length);

  // Get weakest areas for focus
  const weakestSubjects = Object.entries(readinessScore.subjectReadiness)
    .sort(([,a], [,b]) => (a as number) - (b as number))
    .slice(0, 2)
    .map(([subject, score]) => ({ name: subject, score: score as number, type: 'Subject' }));

  const weakestSystems = Object.entries(readinessScore.systemReadiness)
    .sort(([,a], [,b]) => (a as number) - (b as number))
    .slice(0, 2)
    .map(([system, score]) => ({ name: system, score: score as number, type: 'System' }));

  const focusAreas = [...weakestSubjects, ...weakestSystems].sort((a, b) => a.score - b.score);

  const getBarHeight = (questions: number) => {
    const maxQuestions = Math.max(...weeklyActivity.map(d => d.questions));
    return Math.max((questions / maxQuestions) * 100, 5);
  };

  const getTopSubjects = () => Object.entries(readinessScore.subjectReadiness)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 6);

  const getTopSystems = () => Object.entries(readinessScore.systemReadiness)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 6);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (score >= 70) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <div className="p-4 pb-20 space-y-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">USMLE Analytics</h1>
        <p className="text-slate-400 text-xs">Track your progress across subjects and systems</p>
      </div>

      {/* Top-level KPI Hero Strip */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-3 text-center space-y-1 border border-slate-700/50">
            <div className={`text-lg font-semibold ${getScoreColor(averageSessionAccuracy)}`}>
              {averageSessionAccuracy}%
            </div>
            <div className="text-xs text-slate-400">Seven-Day Avg</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-3 text-center space-y-1 border border-slate-700/50">
            <div className="text-lg font-semibold text-blue-400">{totalStudyHours}h</div>
            <div className="text-xs text-slate-400">Total Study</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-3 text-center space-y-1 border border-slate-700/50">
            <div className="text-lg font-semibold text-purple-400">{insights.questionsCompleted.toLocaleString()}</div>
            <div className="text-xs text-slate-400">Questions</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-3 text-center space-y-1 border border-slate-700/50">
            <div className="text-lg font-semibold text-orange-400">{studyStreak}d</div>
            <div className="text-xs text-slate-400">Streak</div>
          </div>
        </div>
      </section>

      {/* USMLE Readiness & Category Summary */}
      <section className="grid md:grid-cols-2 gap-4">
        {/* USMLE Readiness */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">USMLE Readiness</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="text-slate-300">Overall</div>
            <div className={`font-semibold text-right ${getScoreColor(readinessScore.overallScore)}`}>
              {readinessScore.overallScore}%
            </div>
            <div className="text-slate-300">Step 1</div>
            <div className={`font-semibold text-right ${getScoreColor(readinessScore.step1Readiness)}`}>
              {readinessScore.step1Readiness}%
            </div>
            <div className="text-slate-300">Step 2</div>
            <div className={`font-semibold text-right ${getScoreColor(readinessScore.step2Readiness)}`}>
              {readinessScore.step2Readiness}%
            </div>
            <div className="text-slate-300">Study-hours left</div>
            <div className="font-semibold text-right text-orange-400">{readinessScore.recommendedStudyHours}h</div>
            <div className="text-slate-300">Projected exam</div>
            <div className="font-semibold text-right text-purple-400">
              {new Date(readinessScore.projectedExamDate).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="text-slate-300">vs peers</div>
            <div className="font-semibold text-right text-emerald-400">{analytics.peerComparison.percentile}th percentile</div>
          </div>
        </div>

        {/* Category Insights */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-semibold text-white">Category Insights</h3>
          </div>
          
          {/* Subjects/Systems Summary */}
          <div className="grid grid-cols-2 gap-4 mb-3 pb-3 border-b border-slate-700">
            <div className="text-center">
              <div className={`text-lg font-bold ${getScoreColor(avgSubjectScore)}`}>{avgSubjectScore}%</div>
              <div className="text-xs text-slate-400">Subjects • 12 total</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold ${getScoreColor(avgSystemScore)}`}>{avgSystemScore}%</div>
              <div className="text-xs text-slate-400">Systems • 12 total</div>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Strongest</span>
              <span className="text-emerald-400 font-medium">
                {insights.strongestSubjects[0]?.subject} ({insights.strongestSubjects[0]?.score}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Focus</span>
              <span className="text-orange-400 font-medium">
                {insights.weakestSubjects[0]?.subject} ({insights.weakestSubjects[0]?.score}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Mastered</span>
              <span className="text-purple-400 font-medium">
                {[...subjectScores, ...systemScores].filter(score => score >= 85).length} areas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Study Activity */}
      <section>
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Daily Study Activity</h3>
            </div>
            <div className="text-xs text-slate-400">
              Last 7 days • {totalWeeklyQuestions} Q • {Math.round(weeklyActivity.reduce((sum, day) => sum + day.accuracy, 0) / weeklyActivity.length)}% Acc • {weeklyStudyHours.toFixed(1)} h
            </div>
          </div>
          
          {/* Compact Chart */}
          <div className="h-20 flex items-end justify-between space-x-1 mb-3 bg-slate-900/50 rounded-lg p-3">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center h-full justify-end max-w-8">
                <div 
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm w-full transition-all duration-300 hover:from-blue-500 hover:to-blue-300 group relative"
                  style={{ height: `${getBarHeight(day.questions)}%` }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-slate-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-600 z-10">
                    {day.questions} Q • {day.accuracy}%
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-1">{day.date}</div>
              </div>
            ))}
          </div>

          {/* Weekly Insights */}
          <div className="text-xs text-slate-400 space-y-1 bg-slate-900/30 rounded-lg p-2">
            <div>• Best day: {bestDay.date} ({bestDay.questions} questions)</div>
            <div>• Daily average: {Math.round(totalWeeklyQuestions / 7)} questions</div>
            <div>• Active days: {activeDays}/7</div>
          </div>
        </div>
      </section>

      {/* Performance Tables */}
      <section>
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-2 mb-3">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Performance by Category</h3>
          </div>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="subjects" className="border-slate-700">
              <AccordionTrigger className="text-sm text-slate-300 hover:text-white py-2">
                Subject Performance
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="space-y-2">
                  {getTopSubjects().slice(0, 3).map(([subject, score], index) => (
                    <div key={index} className="flex justify-between items-center py-1 px-2 rounded bg-slate-900/30">
                      <span className="text-sm text-slate-300">{subject}</span>
                      <span className={`text-sm font-semibold px-2 py-1 rounded text-xs border ${getScoreBadgeColor(score as number)}`}>
                        {score as number}%
                      </span>
                    </div>
                  ))}
                  {getTopSubjects().length > 3 && (
                    <div className="text-xs text-slate-500 text-center pt-1">
                      +{getTopSubjects().length - 3} more subjects
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="systems" className="border-slate-700">
              <AccordionTrigger className="text-sm text-slate-300 hover:text-white py-2">
                System Performance
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="space-y-2">
                  {getTopSystems().slice(0, 3).map(([system, score], index) => (
                    <div key={index} className="flex justify-between items-center py-1 px-2 rounded bg-slate-900/30">
                      <span className="text-sm text-slate-300">{system}</span>
                      <span className={`text-sm font-semibold px-2 py-1 rounded text-xs border ${getScoreBadgeColor(score as number)}`}>
                        {score as number}%
                      </span>
                    </div>
                  ))}
                  {getTopSystems().length > 3 && (
                    <div className="text-xs text-slate-500 text-center pt-1">
                      +{getTopSystems().length - 3} more systems
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Priority Focus Areas */}
      <section>
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-semibold text-white">Priority Focus Areas</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {focusAreas.slice(0, 4).map((area, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-3 space-y-2 border border-slate-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">{area.name}</div>
                    <div className="text-xs text-slate-400">{area.type}</div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${getScoreBadgeColor(area.score)}`}>
                    {area.score}%
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-1.5 rounded text-xs transition-all duration-200 font-medium">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsScreen;
