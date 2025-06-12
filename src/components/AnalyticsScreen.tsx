import { useState } from 'react';
import { Target, TrendingUp, Clock, BookOpen, Award, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { getUSMLEAnalytics, calculateUSMLEInsights } from '@/utils/usmleAnalyticsManager';
interface AnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}
const AnalyticsScreen = ({
  onNavigate
}: AnalyticsScreenProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const analytics = getUSMLEAnalytics();
  const insights = calculateUSMLEInsights(analytics);
  const {
    readinessScore,
    topicPerformance,
    sessionAnalytics
  } = analytics;

  // Get recent performance data
  const recentSessions = sessionAnalytics.slice(0, 7);
  const avgRecentAccuracy = Math.round(recentSessions.reduce((sum, session) => sum + session.accuracy, 0) / recentSessions.length);

  // Get subject performance for table
  const subjectPerformance = Object.entries(readinessScore.subjectReadiness).map(([subject, score]) => {
    const subjectTopics = topicPerformance.filter(topic => topic.subject === subject);
    const avgTime = subjectTopics.reduce((sum, topic) => sum + topic.averageTime, 0) / subjectTopics.length;
    const totalQuestions = subjectTopics.reduce((sum, topic) => sum + topic.totalQuestions, 0);
    const totalCorrect = subjectTopics.reduce((sum, topic) => sum + topic.correctAnswers, 0);
    return {
      subject,
      score: score as number,
      questionsAnswered: totalQuestions,
      accuracy: totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0,
      avgTimePerQuestion: Math.round(avgTime) || 0,
      improvement: Math.floor(Math.random() * 20) - 10,
      // Mock improvement data
      lastStudied: subjectTopics[0]?.lastPracticed || new Date().toISOString()
    };
  }).sort((a, b) => b.score - a.score);
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };
  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  const tabs = [{
    id: 'overview',
    label: 'Overview',
    icon: Target
  }, {
    id: 'subjects',
    label: 'Subject Analysis',
    icon: BookOpen
  }, {
    id: 'progress',
    label: 'Progress Trends',
    icon: TrendingUp
  }];
  return <div className="p-4 pb-20 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white my-[50px]">Study Analytics</h1>
        <p className="text-slate-300">Your learning insights and performance data</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
        {tabs.map(tab => {
        const Icon = tab.icon;
        return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}>
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>;
      })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Overall Readiness</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(readinessScore.overallScore)}`}>
                {readinessScore.overallScore}%
              </div>
              <div className="text-xs text-slate-400">USMLE Preparation</div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-slate-300">Recent Performance</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(avgRecentAccuracy)}`}>
                {avgRecentAccuracy}%
              </div>
              <div className="text-xs text-slate-400">Last 7 sessions</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Study Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Questions Completed:</span>
                  <span className="text-white font-medium">{insights.questionsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Study Hours:</span>
                  <span className="text-white font-medium">{Math.round(insights.totalStudyHours)}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Days:</span>
                  <span className="text-white font-medium">{insights.studyConsistency}/7</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Strongest Subject:</span>
                  <span className="text-green-400 font-medium">{insights.strongestSubjects[0]?.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Focus Area:</span>
                  <span className="text-orange-400 font-medium">{insights.weakestSubjects[0]?.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Improvement Trend:</span>
                  <span className="text-blue-400 font-medium">+{insights.recentTrend}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* Subjects Tab */}
      {activeTab === 'subjects' && <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Subject Performance Analysis</h3>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Subject</TableHead>
                    <TableHead className="text-slate-300">Score</TableHead>
                    <TableHead className="text-slate-300">Questions</TableHead>
                    <TableHead className="text-slate-300">Accuracy</TableHead>
                    <TableHead className="text-slate-300">Avg Time</TableHead>
                    <TableHead className="text-slate-300">Trend</TableHead>
                    <TableHead className="text-slate-300">Last Studied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectPerformance.map((subject, index) => <TableRow key={index} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell className="font-medium text-white">{subject.subject}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getScoreBadge(subject.score)}`}>
                          {subject.score}%
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-300">{subject.questionsAnswered}</TableCell>
                      <TableCell className={`font-medium ${getScoreColor(subject.accuracy)}`}>
                        {subject.accuracy}%
                      </TableCell>
                      <TableCell className="text-slate-300">{subject.avgTimePerQuestion}s</TableCell>
                      <TableCell>
                        <div className={`flex items-center space-x-1 ${subject.improvement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          <TrendingUp className={`w-3 h-3 ${subject.improvement < 0 ? 'rotate-180' : ''}`} />
                          <span className="text-xs">{subject.improvement > 0 ? '+' : ''}{subject.improvement}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {formatDate(subject.lastStudied)}
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Recommended Actions</h3>
            </div>
            <div className="space-y-3">
              {insights.weakestSubjects.slice(0, 3).map((subject, index) => <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-white">Focus on {subject.subject}</div>
                    <div className="text-xs text-slate-400">Current score: {subject.score}%</div>
                  </div>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs transition-colors">
                    Practice Now
                  </button>
                </div>)}
            </div>
          </div>
        </div>}

      {/* Progress Tab */}
      {activeTab === 'progress' && <div className="space-y-6">
          {/* Weekly Progress */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Study Progress</h3>
            <div className="space-y-4">
              {recentSessions.map((session, index) => <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {new Date(session.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {new Date(session.date).toLocaleDateString('en-US', {
                    weekday: 'long'
                  })}
                      </div>
                      <div className="text-xs text-slate-400">
                        {session.questionsAttempted} questions • {Math.round(session.duration / 60)}h study time
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getScoreColor(session.accuracy)}`}>
                      {session.accuracy}%
                    </div>
                    <div className="text-xs text-slate-400">accuracy</div>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Goal Progress */}
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">USMLE Readiness Goals</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300">Step 1 Readiness</span>
                  <span className={`font-bold ${getScoreColor(readinessScore.step1Readiness)}`}>
                    {readinessScore.step1Readiness}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{
                width: `${readinessScore.step1Readiness}%`
              }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300">Step 2 Readiness</span>
                  <span className={`font-bold ${getScoreColor(readinessScore.step2Readiness)}`}>
                    {readinessScore.step2Readiness}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{
                width: `${readinessScore.step2Readiness}%`
              }}></div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-300">
                <Clock className="w-4 h-4 inline mr-2 text-orange-400" />
                Estimated {readinessScore.recommendedStudyHours} study hours remaining
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Target exam date: {new Date(readinessScore.projectedExamDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default AnalyticsScreen;