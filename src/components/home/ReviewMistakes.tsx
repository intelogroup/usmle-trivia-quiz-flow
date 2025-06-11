
import { getUserProgress } from "@/utils/storageUtils";
import { RefreshCw } from "lucide-react";

interface ReviewMistakesProps {
  onNavigate: (screen: string) => void;
}

const ReviewMistakes = ({ onNavigate }: ReviewMistakesProps) => {
  const userProgress = getUserProgress();

  if (userProgress.totalQuizzes === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Review Mistakes</h3>
      <div className="bg-slate-800/50 rounded-xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
            <RefreshCw size={20} className="text-blue-400" />
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
  );
};

export default ReviewMistakes;
