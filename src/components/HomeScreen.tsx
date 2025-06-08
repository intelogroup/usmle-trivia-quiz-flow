
import { Zap, Trophy, Brain, TrendingUp } from "lucide-react";
import QuickActions from "./QuickActions";
import RecentQuizzes from "./RecentQuizzes";
import StudyProgressTracker from "./StudyProgressTracker";
import { getUserProfile } from "@/utils/dataStore";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onQuizStart: (subjects: string[], systems: string[]) => void;
  onQuizContinue: (quizId: string) => void;
}

const HomeScreen = ({ onNavigate, onQuizStart, onQuizContinue }: HomeScreenProps) => {
  const userProfile = getUserProfile();

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-app-primary">
          Welcome back, {userProfile.name}!
        </h1>
        <p className="text-app-secondary">Ready to continue your medical studies?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl p-4 text-center border border-border">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-5 h-5 text-app-primary" />
          </div>
          <div className="text-lg font-bold text-app-primary">{userProfile.rank}</div>
          <div className="text-sm text-app-muted">Global Rank</div>
        </div>

        <div className="bg-card rounded-xl p-4 text-center border border-border">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Brain className="w-5 h-5 text-app-primary" />
          </div>
          <div className="text-lg font-bold text-app-primary">{userProfile.studyStreak}</div>
          <div className="text-sm text-app-muted">Day Streak</div>
        </div>
      </div>

      {/* Quick Start Button */}
      <button 
        onClick={() => onNavigate('quiz')}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-app-primary py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Zap className="w-5 h-5" />
        <span>Start Quick Quiz</span>
      </button>

      {/* Study Progress Tracker */}
      <StudyProgressTracker />

      {/* Quick Actions */}
      <QuickActions onNavigate={onNavigate} />

      {/* Recent Quizzes */}
      <RecentQuizzes 
        onQuizRestart={onQuizStart}
        onQuizContinue={onQuizContinue}
      />
    </div>
  );
};

export default HomeScreen;
