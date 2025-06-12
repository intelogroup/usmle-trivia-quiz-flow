
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
  const { readinessScore, sessionAnalytics } = analytics;

  // Get recent performance data
  const recentSessions = sessionAnalytics.slice(0, 7);
  const avgRecentAccuracy = Math.round(recentSessions.reduce((sum, session) => sum + session.accuracy, 0) / recentSessions.length);

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'subjects', label: 'Performance', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
  ];

  return (
    <div className="p-3 pb-20 space-y-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-1 pt-8 pb-2">
        <h1 className="text-2xl font-bold text-white">Study Analytics</h1>
        <p className="text-sm text-slate-300">Track your USMLE preparation progress</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl backdrop-blur-sm">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600/50">
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-1.5 bg-blue-500/20 rounded-lg">
                  <Target className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-300">Overall Readiness</span>
                  <div className="text-xs text-slate-400">USMLE Preparation</div>
                </div>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(readinessScore.overallScore)}`}>
                {readinessScore.overallScore}%
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600/50">
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-300">Recent Performance</span>
                  <div className="text-xs text-slate-400">Last 7 sessions</div>
                </div>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(avgRecentAccuracy)}`}>
                {avgRecentAccuracy}%
              </div>
            </div>
          </div>

          {/* Study Summary */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600/50">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Study Summary</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2.5 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300 flex items-center space-x-2 text-sm">
                    <BookOpen className="w-3 h-3" />
                    <span>Questions</span>
                  </span>
                  <span className="text-blue-400 font-bold">{insights.questionsCompleted}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300 flex items-center space-x-2 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>Study Hours</span>
                  </span>
                  <span className="text-amber-400 font-bold">{Math.round(insights.totalStudyHours)}h</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2.5 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300 text-sm">Strongest</span>
                  <span className="text-emerald-400 font-semibold text-sm">{insights.strongestSubjects[0]?.subject}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300 text-sm">Focus Area</span>
                  <span className="text-orange-400 font-semibold text-sm">{insights.weakestSubjects[0]?.subject}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'subjects' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span>Subject Performance</span>
            </h3>
            
            {/* Simplified Performance Cards */}
            <div className="space-y-3">
              {Object.entries(readinessScore.subjectReadiness).slice(0, 6).map(([subject, score], index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{subject}</div>
                      <div className="text-xs text-slate-400">Medical Subject</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getScoreColor(score as number)}`}>
                      {score}%
                    </div>
                    <div className="text-xs text-slate-400">readiness</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Study Recommendations</h3>
            </div>
            <div className="space-y-2">
              {insights.weakestSubjects.slice(0, 3).map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 font-bold text-xs">{index + 1}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Focus on {subject.subject}</div>
                      <div className="text-xs text-slate-400">Current: {subject.score}%</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('quiz')}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  >
                    Practice
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-4">
          {/* Weekly Progress */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600/50">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span>Recent Sessions</span>
            </h3>
            <div className="space-y-2">
              {recentSessions.slice(0, 5).map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {new Date(session.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long' })}
                      </div>
                      <div className="text-xs text-slate-400">
                        {session.questionsAttempted} questions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getScoreColor(session.accuracy)}`}>
                      {session.accuracy}%
                    </div>
                    <div className="text-xs text-slate-400">accuracy</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goal Progress */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600/50">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">USMLE Readiness Goals</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium text-sm">Step 1 Readiness</span>
                  <span className={`font-bold ${getScoreColor(readinessScore.step1Readiness)}`}>
                    {readinessScore.step1Readiness}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${readinessScore.step1Readiness}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium text-sm">Step 2 Readiness</span>
                  <span className={`font-bold ${getScoreColor(readinessScore.step2Readiness)}`}>
                    {readinessScore.step2Readiness}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${readinessScore.step2Readiness}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20">
              <div className="text-sm text-slate-300 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Estimated <strong className="text-orange-400">{readinessScore.recommendedStudyHours}</strong> hours remaining</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Target: <strong>{new Date(readinessScore.projectedExamDate).toLocaleDateString()}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsScreen;
