
import { BookOpen, Target, Trophy } from "lucide-react";

interface EmptyStateProps {
  type: 'quiz' | 'review' | 'achievements';
  onAction?: () => void;
}

const EmptyState = ({ type, onAction }: EmptyStateProps) => {
  const config = {
    quiz: {
      icon: BookOpen,
      title: "No quizzes yet",
      description: "Start your first quiz to begin your USMLE journey",
      actionText: "Start Quiz",
      emoji: "📚"
    },
    review: {
      icon: Target,
      title: "Nothing to review",
      description: "Take some quizzes to see questions that need review here",
      actionText: "Take Quiz",
      emoji: "🎯"
    },
    achievements: {
      icon: Trophy,
      title: "No achievements yet",
      description: "Complete quizzes and reach milestones to unlock achievements",
      actionText: "Start Learning",
      emoji: "🏆"
    }
  };

  const currentConfig = config[type];
  const Icon = currentConfig.icon;

  return (
    <div className="bg-slate-800 rounded-xl p-8 text-center">
      <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <div className="text-4xl mb-3">{currentConfig.emoji}</div>
      <h3 className="text-lg font-semibold mb-2">{currentConfig.title}</h3>
      <p className="text-slate-400 mb-6">{currentConfig.description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {currentConfig.actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
