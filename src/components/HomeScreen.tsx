
import { Target, Zap } from "lucide-react";
import ProgressCard from "./ProgressCard";
import QuickActions from "./QuickActions";
import NotificationSystem from "./NotificationSystem";
import StudyProgressTracker from "./StudyProgressTracker";
import RecentQuizzes from "./RecentQuizzes";
import WeakestSubjects from "./home/WeakestSubjects";
import ReviewMistakes from "./home/ReviewMistakes";
import ContinueLearning from "./home/ContinueLearning";
import QuickStatsWidget from "./home/QuickStatsWidget";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getUserProfile } from "@/utils/dataStore";
import { useState } from "react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onQuizRestart?: (subjects: string[], systems: string[]) => void;
  onProfileClick: () => void;
}

const HomeScreen = ({
  onNavigate,
  onQuizRestart,
  onProfileClick
}: HomeScreenProps) => {
  const userProfile = getUserProfile();

  // Mock notifications for demonstration
  const [notifications, setNotifications] = useState([{
    id: '1',
    type: 'achievement' as const,
    title: 'First Quiz Completed!',
    message: 'Congratulations on completing your first quiz. Keep up the great work!',
    icon: '🏆',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false
  }, {
    id: '2',
    type: 'streak' as const,
    title: 'Study Streak',
    message: `You're on a ${userProfile.studyStreak} day streak! Don't break it now.`,
    icon: '🔥',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false
  }]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => notification.id === id ? {
      ...notification,
      read: true
    } : notification));
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

  return (
    <div className="min-h-screen bg-slate-900 p-4 pb-20 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-white my-[2px]">
            USMLE <span className="text-blue-400">T</span>
            <span className="text-green-400">R</span>
            <span className="text-yellow-400">I</span>
            <span className="text-red-400">V</span>
            <span className="text-purple-400">I</span>
            <span className="text-pink-400">A</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <NotificationSystem notifications={notifications} onMarkAsRead={handleMarkAsRead} onClearAll={handleClearAll} />
          <button
            onClick={onProfileClick}
            className="relative group transition-all duration-200 hover:scale-105"
            aria-label="View Profile"
          >
            <Avatar className="w-8 h-8 ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all duration-200">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face" 
                alt="Profile" 
              />
              <AvatarFallback className="text-sm bg-orange-500 text-white font-semibold group-hover:bg-orange-600 transition-colors duration-200">
                {userProfile.avatar}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>

      {/* Study Progress Tracker */}
      <StudyProgressTracker />

      {/* Today's Progress Quick Stats */}
      <QuickStatsWidget />

      {/* Start Quiz Button */}
      <button onClick={() => onNavigate('quiz')} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900" aria-label="Start a new quiz session">
        <Zap size={20} className="fill-current" />
        <span>Start New Quiz</span>
        <Zap size={20} className="fill-current" />
      </button>

      {/* Recent Quizzes */}
      <RecentQuizzes onQuizRestart={handleQuizRestart} onQuizContinue={handleQuizContinue} />

      {/* Weakest Subjects */}
      <WeakestSubjects onNavigate={onNavigate} />

      {/* Review Mistakes */}
      <ReviewMistakes onNavigate={onNavigate} />

      {/* Continue Learning */}
      <ContinueLearning onNavigate={onNavigate} />

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        <QuickActions onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default HomeScreen;
