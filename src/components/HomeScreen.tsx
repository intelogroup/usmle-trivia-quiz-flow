
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
    <div className="p-4 pb-20 space-y-6 bg-background min-h-screen">
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
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">JK</span>
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
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
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
        <div className="space-y-2">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🧬</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Pathology</h4>
                  <p className="text-sm text-muted-foreground">68% average • Needs focus</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('category')}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                Practice
              </button>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🫀</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Physiology</h4>
                  <p className="text-sm text-muted-foreground">72% average • Room for improvement</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('category')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
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
        <div className="bg-card rounded-xl border border-border p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xl">🔄</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">3 questions need review</p>
              <p className="text-sm text-muted-foreground">Focus on your recent mistakes</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('review')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg transition-colors"
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
