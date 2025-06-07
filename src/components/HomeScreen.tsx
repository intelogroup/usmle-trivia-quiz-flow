
import { Bell, Settings } from "lucide-react";
import ProgressCard from "./ProgressCard";
import QuickActions from "./QuickActions";
import NotificationBadge from "./NotificationBadge";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="p-4 pb-20 space-y-6">
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
          <div className="relative">
            <Bell size={20} className="text-slate-300" />
            <NotificationBadge />
          </div>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">JK</span>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <p className="text-slate-300">Welcome back,</p>
        <h2 className="text-2xl font-bold">jim kali 👋</h2>
        <p className="text-slate-300">Ready to challenge yourself today? 🎯</p>
      </div>

      {/* Progress Card */}
      <ProgressCard />

      {/* Start Quiz Button */}
      <button
        onClick={() => onNavigate('quiz')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
      >
        <span className="text-xl">⚡</span>
        <span>Start New Quiz</span>
        <span className="text-xl">🚀</span>
      </button>

      {/* Weakest Subjects */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Weakest Subjects</h3>
        <div className="space-y-2">
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🧬</span>
                </div>
                <div>
                  <h4 className="font-medium">Pathology</h4>
                  <p className="text-sm text-slate-400">68% average • Needs focus</p>
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
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🫀</span>
                </div>
                <div>
                  <h4 className="font-medium">Physiology</h4>
                  <p className="text-sm text-slate-400">72% average • Room for improvement</p>
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
        <h3 className="text-lg font-semibold">Review Mistakes</h3>
        <div className="bg-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xl">🔄</span>
            </div>
            <div className="flex-1">
              <p className="font-medium">3 questions need review</p>
              <p className="text-sm text-slate-400">Focus on your recent mistakes</p>
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

      {/* Quick Actions */}
      <QuickActions onNavigate={onNavigate} />
    </div>
  );
};

export default HomeScreen;
