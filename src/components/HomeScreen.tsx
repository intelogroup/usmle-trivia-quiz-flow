
import { Bell, Settings } from "lucide-react";
import NotificationSystem from "./NotificationSystem";
import RecentQuizzes from "./RecentQuizzes";
import DailyFocus from "./home/DailyFocus";
import ActivityCard from "./home/ActivityCard";
import { getUserProfile } from "@/utils/dataStore";
import { useState } from "react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onQuizRestart?: (subjects: string[], systems: string[]) => void;
}

const HomeScreen = ({ onNavigate, onQuizRestart }: HomeScreenProps) => {
  const userProfile = getUserProfile();

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

  return (
    <div className="p-4 pb-20 space-y-6">
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
            <span className="text-sm font-semibold text-white">{userProfile.avatar}</span>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <p className="text-slate-400">Welcome back,</p>
        <h2 className="text-2xl font-bold text-white">{userProfile.name} 👋</h2>
        <p className="text-slate-400">Ready to challenge yourself today? 🎯</p>
      </div>

      {/* Start Quiz Button - Hero CTA with Gradient */}
      <button
        onClick={() => onNavigate('quiz')}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg"
      >
        <span className="text-xl">⚡</span>
        <span>Start New Quiz</span>
        <span className="text-xl">🚀</span>
      </button>

      {/* Daily Focus Section */}
      <DailyFocus onNavigate={onNavigate} />

      {/* Activity Card - Unified Progress & Actions */}
      <ActivityCard onNavigate={onNavigate} />

      {/* Recent Quizzes */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Recent Quizzes</h2>
        <RecentQuizzes 
          onQuizRestart={handleQuizRestart}
          onQuizContinue={handleQuizContinue}
        />
      </div>

      {/* Continue Learning */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Continue Learning</h2>
        <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xl">🧬</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">Pathology</p>
              <p className="text-sm text-slate-400">Last studied 2 days ago</p>
            </div>
          </div>
          <button 
            onClick={handleContinueStudying}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
          >
            Continue Studying
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
