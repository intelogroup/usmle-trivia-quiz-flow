
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

  return (
    <div className="p-4 pb-20 space-y-8 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto shadow-sm border border-slate-700">
          <Brain className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">USMLE Analytics</h1>
        <p className="text-slate-400 text-sm">Track your progress across subjects and systems</p>
      </div>

      {/* Top-level KPI Hero Strip */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-800 rounded-lg p-4 text-center space-y-1 shadow-sm border border-slate-700">
            <div className="text-xl font-semibold text-white">{averageSessionAccuracy}%</div>
            <div className="text-xs text-slate-400">Seven-Day Average</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center space-y-1 shadow-sm border border-slate-700">
            <div className="text-xl font-semibold text-white">{totalStudyHours}h</div>
            <div className="text-xs text-slate-400">Total Study Time</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center space-y-1 shadow-sm border border-slate-700">
            <div className="text-xl font-semibold text-white">{insights.questionsCompleted.toLocaleString()}</div>
            <div className="text-xs text-slate-400">Questions Completed</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center space-y-1 shadow-sm border border-slate-700">
            <div className="text-xl font-semibold text-white">{studyStreak}d</div>
            <div className="text-xs text-slate-400">Current Streak</div>
          </div>
        </div>
      </section>

      {/* USMLE Readiness & Category Summary */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* USMLE Readiness */}
        <div className="bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-700">
          <h3 className="text-base font-semibold text-white mb-3">USMLE Readiness</h3>
          <div className="grid grid-cols-2 gap-y-1 text-sm">
            <div className="text-slate-300">Overall</div>
            <div className="font-semibold text-right text-blue-400">{readinessScore.overallScore}%</div>
            <div className="text-slate-300">Step 1</div>
            <div className="font-semibold text-right text-green-400">{readinessScore.step1Readiness}%</div>
            <div className="text-slate-300">Step 2</div>
            <div className="font-semibold text-right text-yellow-400">{readinessScore.step2Readiness}%</div>
            <div className="text-slate-300">Study-hours left</div>
            <div className="font-semibold text-right text-orange-400">{readinessScore.recommendedStudyHours}h</div>
            <div className="text-slate-300">Projected exam</div>
            <div className="font-semibold text-right text-purple-400">{new Date(readinessScore.projectedExamDate).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            <div className="text-slate-300">vs peers</div>
            <div className="font-semibold text-right text-emerald-400">{analytics.peerComparison.percentile}th percentile</div>
          </div>
        </div>

        {/* Category Insights */}
        <div className="bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-700">
          <h3 className="text-base font-semibold text-white mb-3">Category Insights</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Subjects</span>
              <span className="font-semibold text-blue-400">{avgSubjectScore}% • 12 subjects</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Systems</span>
              <span className="font-semibold text-green-400">{avgSystemScore}% • 12 systems</span>
            </div>
            <hr className="my-2 border-slate-700" />
            <div className="flex justify-between">
              <span className="text-slate-300">Strongest</span>
              <span className="font-semibold text-green-400">{insights.strongestSubjects[0]?.subject} ({insights.strongestSubjects[0]?.score}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Focus</span>
              <span className="font-semibold text-orange-400">{insights.weakestSubjects[0]?.subject} ({insights.weakestSubjects[0]?.score}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Mastered</span>
              <span className="font-semibold text-purple-400">{[...subjectScores, ...systemScores].filter(score => score >= 85).length} areas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Study Activity */}
      <section>
        <div className="bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Daily Study Activity</h3>
            <div className="text-xs text-slate-400">Last 7 days • {totalWeeklyQuestions} Q • {Math.round(weeklyActivity.reduce((sum, day) => sum + day.accuracy, 0) / weeklyActivity.length)}% Acc • {weeklyStudyHours.toFixed(1)} h</div>
          </div>
          
          {/* Compact Chart */}
          <div className="h-24 flex items-end justify-between space-x-2 mb-4 bg-slate-900 rounded-lg p-3">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center h-full justify-end">
                <div 
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm w-full transition-all duration-300 hover:bg-blue-600 group relative"
                  style={{ height: `${getBarHeight(day.questions)}%` }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-slate-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-600">
                    {day.questions} questions • {day.accuracy}%
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-1">{day.date}</div>
              </div>
            ))}
          </div>

          {/* Weekly Insights */}
          <div className="text-xs text-slate-400 space-y-1 bg-slate-900 rounded-lg p-3">
            <div>• Best day: {bestDay.date} ({bestDay.questions} questions)</div>
            <div>• Daily average: {Math.round(totalWeeklyQuestions / 7)} questions</div>
            <div>• Active days: {activeDays}/7</div>
          </div>
        </div>
      </section>

      {/* Performance Tables */}
      <section>
        <div className="bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-700">
          <h3 className="text-base font-semibold text-white mb-3">Performance by Category</h3>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="subjects" className="border-slate-700">
              <AccordionTrigger className="text-sm text-slate-300 hover:text-white">Subject Performance</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {getTopSubjects().map(([subject, score], index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-sm text-slate-300">{subject}</span>
                      <span className="text-sm font-semibold text-blue-400">{score as number}%</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="systems" className="border-slate-700">
              <AccordionTrigger className="text-sm text-slate-300 hover:text-white">System Performance</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {getTopSystems().map(([system, score], index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-sm text-slate-300">{system}</span>
                      <span className="text-sm font-semibold text-green-400">{score as number}%</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Priority Focus Areas */}
      <section>
        <div className="bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-700">
          <h3 className="text-base font-semibold text-white mb-3">Priority Focus Areas</h3>
          <div className="grid grid-cols-2 gap-3">
            {focusAreas.slice(0, 4).map((area, index) => (
              <div key={index} className="bg-slate-900 rounded-lg p-3 space-y-2 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">{area.name}</div>
                    <div className="text-xs text-slate-400">{area.type}</div>
                  </div>
                  <span className="text-sm font-bold text-orange-400">{area.score}%</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-xs transition-colors">
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
