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
    <div className="p-4 pb-20 space-y-6 bg-app-background text-app-primary">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">
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
      <div className="space-y-2">
        <p className="text-app-secondary">Welcome back,</p>
        <h2 className="text-2xl font-bold">{userProfile.name} 👋</h2>
        <p className="text-app-secondary">Ready to challenge yourself today? 🎯</p>
      </div>

      {/* Study Progress Tracker */}
      <StudyProgressTracker />

      {/* Start Quiz Button */}
      <button
        onClick={() => onNavigate('quiz')}
        className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg"
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
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Areas for Improvement</h3>
          <div className="space-y-2">
            {weakestSubjects.map((subject, index) => (
              <div key={index} className="bg-app-surface rounded-xl p-4 border border-app-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${getSubjectColor(subject.score)} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-sm">{getSubjectIcon(subject.subject)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{subject.subject}</h4>
                      <p className="text-sm text-app-muted">{subject.score}% average • {subject.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('category')}
                    className={`${getSubjectColor(subject.score)} text-white px-3 py-1 rounded-lg text-sm transition-colors`}
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
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Review Mistakes</h3>
          <div className="bg-app-surface rounded-xl p-4 space-y-3 border border-app-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl">🔄</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{Math.max(userProgress.totalQuestions - userProgress.totalCorrect, 0)} questions need review</p>
                <p className="text-sm text-app-muted">Focus on your recent mistakes</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('review')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
            >
              Start Review
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <QuickActions onNavigate={onNavigate} />
    </div>
  );
};

export default HomeScreen;
