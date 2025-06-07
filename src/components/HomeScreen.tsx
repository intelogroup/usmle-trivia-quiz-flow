
import { Bell, Settings } from "lucide-react";
import ProgressCard from "./ProgressCard";
import QuickActions from "./QuickActions";
import NotificationBadge from "./NotificationBadge";
import RecentQuizzes from "./RecentQuizzes";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onQuizRestart?: (subjects: string[], systems: string[]) => void;
}

const HomeScreen = ({ onNavigate, onQuizRestart }: HomeScreenProps) => {
  const handleQuizRestart = (subjects: string[], systems: string[]) => {
    if (onQuizRestart) {
      onQuizRestart(subjects, systems);
    }
  };

  const handleQuizContinue = (quizId: string) => {
    // Navigate to quiz results/review screen
    console.log('Continue quiz:', quizId);
    onNavigate('review');
  };

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-foreground">
            USMLE <span className="text-blue-400">T</span>
            <span className="text-green-400">R</span>
            <span className="text-yellow-400">I</span>
            <span className="text-red-400">V</span>
            <span className="text-purple-400">I</span>
            <span className="text-pink-400">A</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell size={20} className="text-muted-foreground" />
            <NotificationBadge />
          </div>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm font-semibold text-white">JK</span>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <p className="text-muted-foreground">Welcome back,</p>
        <h2 className="text-2xl font-bold text-foreground">jim kali 👋</h2>
        <p className="text-muted-foreground">Ready to challenge yourself today? 🎯</p>
      </div>

      {/* Progress Card */}
      <ProgressCard />

      {/* Start Quiz Button */}
      <button
        onClick={() => onNavigate('quiz')}
        className="w-full gradient-primary text-primary-foreground font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg"
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
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Weakest Subjects</h3>
        <div className="space-y-3">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🧬</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Pathology</h4>
                  <p className="text-sm text-muted-foreground">68% average • Needs focus</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('category')}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Practice
              </button>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🫀</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Physiology</h4>
                  <p className="text-sm text-muted-foreground">72% average • Room for improvement</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('category')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Practice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Mistakes */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Review Mistakes</h3>
        <div className="glass-card rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl">🔄</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">3 questions need review</p>
              <p className="text-sm text-muted-foreground">Focus on your recent mistakes</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('review')}
            className="w-full gradient-primary text-primary-foreground py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Start Review
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions onNavigate={onNavigate} />
    </div>
  );
};

export default HomeScreen;
