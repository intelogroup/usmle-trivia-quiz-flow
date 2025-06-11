import { Bell, Settings } from "lucide-react";
import ProgressCard from "./ProgressCard";
import QuickActions from "./QuickActions";
import NotificationSystem from "./NotificationSystem";
import StudyProgressTracker from "./StudyProgressTracker";
import RecentQuizzes from "./RecentQuizzes";
import { getUserProfile, getWeakestSubjects } from "@/utils/dataStore";
import { getUserProgress } from "@/utils/storageUtils";
import { useState } from "react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onQuizRestart?: (subjects: string[], systems: string[]) => void;
}

const HomeScreen = ({ onNavigate, onQuizRestart }: HomeScreenProps) => {
  const userProfile = getUserProfile();
  const userProgress = getUserProgress();
  const weakestSubjects = getWeakestSubjects();

  // Mock notifications for demonstration
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'achievement' as const,
      title: 'First Quiz Completed!',
      message: 'Congratulations on completing your first quiz. Keep up the great work!',
      icon: '🏆',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false
    },
    {
      id: '2',
      type: 'streak' as const,
      title: 'Study Streak',
      message: `You're on a ${userProfile.studyStreak} day streak! Don't break it now.`,
      icon: '🔥',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false
    }
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleQuizRestart = (subjects: string[], systems: string[]) => {
    if (onQuizRestart) {
      onQuizRestart(subjects, systems);
    }
  };

  const handleQuizContinue = (quizId: string) => {
    console.log('Continue quiz:', quizId);
    onNavigate('review');
  };

  const handleContinueStudying = () => {
    console.log('Continue Studying button clicked - navigating to continue-studying');
    onNavigate('continue-studying');
  };

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      'Pathology': '🧬',
      'Physiology': '🫀',
      'Anatomy': '🦴',
      'Pharmacology': '💊',
      'Microbiology': '🦠',
      'Immunology': '🛡️'
    };
    return icons[subject] || '📚';
  };

  const getSubjectColor = (score: number) => {
    if (score < 70) return 'bg-red-600 hover:bg-red-700';
    if (score < 80) return 'bg-yellow-600 hover:bg-yellow-700';
    return 'bg-green-600 hover:bg-green-700';
  };

  return (
    <div className="p-4 pb-20 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-white">
            USMLE <span className="text-blue-400">T</span>
            <span className="text-green-400">R</span>
            <span className="text-yellow-400">I</span>
            <span className="text-red-400">V</span>
            <span className="text-purple-400">I</span>
            <span className="text-pink-400">A</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <NotificationSystem 
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onClearAll={handleClearAll}
          />
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">{userProfile.avatar}</span>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-3">
        <p className="text-slate-400 text-sm">Welcome back,</p>
        <h2 className="text-2xl font-bold text-white">{userProfile.name} 👋</h2>
        <p className="text-slate-400 text-sm">Ready to challenge yourself today? 🎯</p>
      </div>

      {/* Study Progress Tracker */}
      <StudyProgressTracker />

      {/* Start Quiz Button */}
      <button
        onClick={() => onNavigate('quiz')}
        className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        aria-label="Start a new quiz session"
      >
        <span className="text-xl">⚡</span>
        <span>Start New Quiz</span>
        <span className="text-xl">🚀</span>
      </button>

      {/* Recent Quizzes */}
      <RecentQuizzes 
        onQuizRestart={handleQuizRestart}
        onQuizContinue={handleQuizContinue}
      />

      {/* Weakest Subjects */}
      {weakestSubjects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Areas for Improvement</h3>
          <div className="space-y-3">
            {weakestSubjects.map((subject, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${getSubjectColor(subject.score)} rounded-lg flex items-center justify-center shadow-sm`}>
                      <span className="text-white text-sm">{getSubjectIcon(subject.subject)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{subject.subject}</h4>
                      <p className="text-sm text-slate-400">{subject.score}% average • {subject.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('category')}
                    className={`${getSubjectColor(subject.score)} text-white px-3 py-1 rounded-lg text-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900`}
                    aria-label={`Practice ${subject.subject}`}
                  >
                    Practice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Mistakes */}
      {userProgress.totalQuizzes > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Review Mistakes</h3>
          <div className="bg-slate-800/50 rounded-xl p-4 space-y-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                <span className="text-xl">🔄</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{Math.max(userProgress.totalQuestions - userProgress.totalCorrect, 0)} questions need review</p>
                <p className="text-sm text-slate-400">Focus on your recent mistakes</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('review')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Start reviewing mistakes"
            >
              Start Review
            </button>
          </div>
        </div>
      )}

      {/* Continue Learning */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Continue Learning</h3>
        <div className="bg-slate-800/50 rounded-xl p-4 space-y-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
              <span className="text-xl">🧬</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">Pathology</p>
              <p className="text-sm text-slate-400">Last studied 2 days ago</p>
            </div>
          </div>
          <button 
            onClick={handleContinueStudying}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Continue studying Pathology"
          >
            Continue Studying
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        <QuickActions onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default HomeScreen;
