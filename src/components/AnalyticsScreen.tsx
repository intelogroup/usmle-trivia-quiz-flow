
import { useState } from 'react';
import { ArrowLeft, TrendingUp, Target, Clock, Award, ChevronRight, BarChart3, Calendar, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import DailyActivityChart from './analytics/DailyActivityChart';

interface AnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}

const AnalyticsScreen = ({ onNavigate }: AnalyticsScreenProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'progress'>('overview');

  // Study progress data
  const studyProgressData = [
    { day: 'Mon', sessions: 3, minutes: 45 },
    { day: 'Tue', sessions: 2, minutes: 30 },
    { day: 'Wed', sessions: 4, minutes: 60 },
    { day: 'Thu', sessions: 3, minutes: 40 },
    { day: 'Fri', sessions: 5, minutes: 75 },
    { day: 'Sat', sessions: 2, minutes: 25 },
    { day: 'Sun', sessions: 1, minutes: 15 }
  ];

  // Subject performance data
  const subjectPerformanceData = [
    { subject: 'Anatomy', score: 85, improvement: 12 },
    { subject: 'Physiology', score: 78, improvement: 8 },
    { subject: 'Pathology', score: 92, improvement: 15 },
    { subject: 'Pharmacology', score: 74, improvement: -3 },
    { subject: 'Microbiology', score: 88, improvement: 10 },
    { subject: 'Biochemistry', score: 81, improvement: 5 }
  ];

  // Radar chart data for subject strengths
  const radarData = [
    { subject: 'Anatomy', score: 85, fullMark: 100 },
    { subject: 'Physiology', score: 78, fullMark: 100 },
    { subject: 'Pathology', score: 92, fullMark: 100 },
    { subject: 'Pharmacology', score: 74, fullMark: 100 },
    { subject: 'Microbiology', score: 88, fullMark: 100 },
    { subject: 'Biochemistry', score: 81, fullMark: 100 }
  ];

  // Weekly Points data
  const pointsProgressData = [
    { week: 'Week 1', points: 320 },
    { week: 'Week 2', points: 485 },
    { week: 'Week 3', points: 650 },
    { week: 'Week 4', points: 890 }
  ];

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { id: 'performance' as const, label: 'Performance', icon: Target },
    { id: 'progress' as const, label: 'Progress', icon: TrendingUp }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Study Time</p>
              <p className="text-lg font-bold text-white">24.5h</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">This week</p>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Points</p>
              <p className="text-lg font-bold text-white">4,289</p>
            </div>
          </div>
          <p className="text-xs text-green-400">+890 this week</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Avg Score</p>
              <p className="text-lg font-bold text-white">84%</p>
            </div>
          </div>
          <p className="text-xs text-purple-400">+7% improvement</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Streak</p>
              <p className="text-lg font-bold text-white">12 days</p>
            </div>
          </div>
          <p className="text-xs text-orange-400">Keep it up!</p>
        </div>
      </div>

      {/* Use the improved DailyActivityChart component */}
      <DailyActivityChart />

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={() => onNavigate('quiz')}
            className="bg-slate-800/50 hover:bg-slate-700/50 rounded-xl p-3 text-left transition-colors border border-slate-700/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Take Practice Quiz</p>
                  <p className="text-sm text-slate-400">Test your knowledge</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>

          <button 
            onClick={() => onNavigate('learn')}
            className="bg-slate-800/50 hover:bg-slate-700/50 rounded-xl p-3 text-left transition-colors border border-slate-700/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Continue Learning</p>
                  <p className="text-sm text-slate-400">Pick up where you left off</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      {/* Subject Performance */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Subject Performance</h3>
        <div className="space-y-3">
          {subjectPerformanceData.map((subject) => (
            <div key={subject.subject} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{subject.subject}</span>
                  <span className="text-sm text-slate-300">{subject.score}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
              <div className={`ml-4 text-sm font-medium ${
                subject.improvement > 0 ? 'text-green-400' : subject.improvement < 0 ? 'text-red-400' : 'text-slate-400'
              }`}>
                {subject.improvement > 0 ? '+' : ''}{subject.improvement}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Knowledge Radar</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} />
              <Radar 
                name="Score" 
                dataKey="score" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <p className="text-sm font-medium text-yellow-400 mb-1">Focus Area</p>
            <p className="text-sm text-slate-300">Spend more time on Pharmacology - your weakest subject</p>
          </div>
          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <p className="text-sm font-medium text-green-400 mb-1">Strength</p>
            <p className="text-sm text-slate-300">Excellent progress in Pathology - keep it up!</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressTab = () => (
    <div className="space-y-6">
      {/* Enhanced Progress Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Questions</p>
              <p className="text-lg font-bold text-white">342</p>
            </div>
          </div>
          <p className="text-xs text-blue-400">This week</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Modules</p>
              <p className="text-lg font-bold text-white">8</p>
            </div>
          </div>
          <p className="text-xs text-purple-400">Used this week</p>
        </div>
      </div>

      {/* Points Progress Chart */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Points Progress</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pointsProgressData}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Line 
                type="monotone" 
                dataKey="points" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-slate-400 mt-2">Weekly points accumulation trend</p>
      </div>

      {/* Enhanced Goals Section */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Study Goals</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Weekly Study Goal</span>
              <span className="text-sm text-white font-medium">24.5h / 25h</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{ width: '98%' }} />
            </div>
            <p className="text-xs text-green-400 mt-1">Almost there! 30 min to go</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Weekly Questions Target</span>
              <span className="text-sm text-white font-medium">342 / 400</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: '86%' }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">58 questions remaining this week</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Module Engagement</span>
              <span className="text-sm text-white font-medium">8 / 12</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '67%' }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">4 more modules to explore</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Weekly Points Target</span>
              <span className="text-sm text-white font-medium">890 / 1000</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{ width: '89%' }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">110 points to reach weekly target</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="font-medium text-white">Study Streak Master</p>
              <p className="text-xs text-slate-400">Studied for 10 consecutive days</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-white">Points Collector</p>
              <p className="text-xs text-slate-400">Earned 1000+ points this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button onClick={() => onNavigate('home')} className="text-white hover:text-slate-300 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-slate-300 text-sm">Track your learning progress</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-blue-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">This Week</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'performance' && renderPerformanceTab()}
        {activeTab === 'progress' && renderProgressTab()}
      </div>
    </div>
  );
};

export default AnalyticsScreen;
