
import { useState } from 'react';
import { Target, TrendingUp, Clock, BookOpen, Award, AlertTriangle, Brain, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { getUSMLEAnalytics, calculateUSMLEInsights } from '@/utils/usmleAnalyticsManager';

interface AnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}

const AnalyticsScreen = ({ onNavigate }: AnalyticsScreenProps) => {
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
      lastStudied: subjectTopics[0]?.lastPracticed || new Date().toISOString(),
      status: (score as number) >= 80 ? 'strong' : (score as number) >= 60 ? 'fair' : 'weak'
    };
  }).sort((a, b) => b.score - a.score);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (score >= 70) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'strong':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'fair':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'weak':
        return <XCircle className="w-4 h-4 text-rose-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'subjects', label: 'Performance', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
  ];

  return (
    <div className="p-4 pb-20 space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white my-[50px]">📊 Study Analytics</h1>
        <p className="text-slate-300">Track your USMLE preparation progress</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl backdrop-blur-sm">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-300">Overall Readiness</span>
                  <div className="text-xs text-slate-400">USMLE Preparation</div>
                </div>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(readinessScore.overallScore)}`}>
                {readinessScore.overallScore}%
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-300">Recent Performance</span>
                  <div className="text-xs text-slate-400">Last 7 sessions</div>
                </div>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(avgRecentAccuracy)}`}>
                {avgRecentAccuracy}%
              </div>
            </div>
          </div>

          {/* Study Summary */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Study Summary</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Questions Completed</span>
                  </span>
                  <span className="text-blue-400 font-bold text-lg">{insights.questionsCompleted}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300 flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Study Hours</span>
                  </span>
                  <span className="text-amber-400 font-bold text-lg">{Math.round(insights.totalStudyHours)}h</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300 flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Active Days</span>
                  </span>
                  <span className="text-emerald-400 font-bold text-lg">{insights.studyConsistency}/7</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Strongest Subject</span>
                  <span className="text-emerald-400 font-semibold">{insights.strongestSubjects[0]?.subject}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Focus Area</span>
                  <span className="text-orange-400 font-semibold">{insights.weakestSubjects[0]?.subject}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Weekly Trend</span>
                  <span className="text-blue-400 font-semibold">+{insights.recentTrend}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'subjects' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <span>Subject Performance Analysis</span>
            </h3>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-600/50 hover:bg-slate-700/30">
                    <TableHead className="text-slate-300 font-semibold">Subject</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Score</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Questions</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Accuracy</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Avg Time</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Trend</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Last Study</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectPerformance.map((subject, index) => (
                    <TableRow key={index} className="border-slate-600/30 hover:bg-slate-700/20 transition-colors">
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(subject.status)}
                          <span>{subject.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          subject.status === 'strong' ? 'bg-emerald-500/20 text-emerald-400' :
                          subject.status === 'fair' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-rose-500/20 text-rose-400'
                        }`}>
                          {subject.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold border ${getScoreBadge(subject.score)}`}>
                          {subject.score}%
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-300 font-medium">{subject.questionsAnswered}</TableCell>
                      <TableCell className={`font-bold ${getScoreColor(subject.accuracy)}`}>
                        {subject.accuracy}%
                      </TableCell>
                      <TableCell className="text-slate-300">{subject.avgTimePerQuestion}s</TableCell>
                      <TableCell>
                        <div className={`flex items-center space-x-1 ${subject.improvement >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          <TrendingUp className={`w-3 h-3 ${subject.improvement < 0 ? 'rotate-180' : ''}`} />
                          <span className="text-xs font-medium">{subject.improvement > 0 ? '+' : ''}{subject.improvement}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {formatDate(subject.lastStudied)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-6 border border-orange-500/30">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-semibold text-white">🎯 Study Recommendations</h3>
            </div>
            <div className="space-y-3">
              {insights.weakestSubjects.slice(0, 3).map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Focus on {subject.subject}</div>
                      <div className="text-xs text-slate-400">Current score: {subject.score}% • Needs improvement</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('quiz')}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Practice Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          {/* Weekly Progress */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-blue-400" />
              <span>Weekly Study Progress</span>
            </h3>
            <div className="space-y-3">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {new Date(session.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long' })}
                      </div>
                      <div className="text-xs text-slate-400">
                        {session.questionsAttempted} questions • {Math.round(session.duration / 60)}h study time
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getScoreColor(session.accuracy)}`}>
                      {session.accuracy}%
                    </div>
                    <div className="text-xs text-slate-400">accuracy</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goal Progress */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">🏆 USMLE Readiness Goals</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Step 1 Readiness</span>
                  <span className={`font-bold text-lg ${getScoreColor(readinessScore.step1Readiness)}`}>
                    {readinessScore.step1Readiness}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${readinessScore.step1Readiness}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Step 2 Readiness</span>
                  <span className={`font-bold text-lg ${getScoreColor(readinessScore.step2Readiness)}`}>
                    {readinessScore.step2Readiness}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${readinessScore.step2Readiness}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20">
              <div className="text-sm text-slate-300 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Estimated <strong className="text-orange-400">{readinessScore.recommendedStudyHours}</strong> study hours remaining</span>
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Target exam date: <strong>{new Date(readinessScore.projectedExamDate).toLocaleDateString()}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsScreen;
