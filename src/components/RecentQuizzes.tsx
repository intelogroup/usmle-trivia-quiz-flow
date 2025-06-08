
import { Clock, RotateCcw, Play } from "lucide-react";
import { getRecentQuizzes, QuizResult } from "@/utils/storageUtils";

interface RecentQuizzesProps {
  onQuizRestart: (subjects: string[], systems: string[]) => void;
  onQuizContinue: (quizId: string) => void;
}

const RecentQuizzes = ({ onQuizRestart, onQuizContinue }: RecentQuizzesProps) => {
  const recentQuizzes: QuizResult[] = getRecentQuizzes();

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (recentQuizzes.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 text-center border border-border">
        <div className="text-app-muted space-y-2">
          <Clock className="w-8 h-8 mx-auto opacity-50" />
          <p className="text-sm">No recent quizzes</p>
          <p className="text-xs">Start a quiz to see your history here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-app-primary">Recent Quizzes</h3>
      
      <div className="space-y-2">
        {recentQuizzes.map((quiz) => (
          <div key={quiz.id} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-app-primary truncate">{quiz.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-app-muted mt-1">
                  <span className={getScoreColor(quiz.score, quiz.totalQuestions)}>
                    {quiz.score}/{quiz.totalQuestions} ({Math.round((quiz.score / quiz.totalQuestions) * 100)}%)
                  </span>
                  <span>{quiz.duration}</span>
                  <span>{getRelativeTime(quiz.date)}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {quiz.config.subjects.map(subject => (
                    <span key={subject} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                      {subject}
                    </span>
                  ))}
                  {quiz.config.systems.map(system => (
                    <span key={system} className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded-full">
                      {system.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-3">
                <button
                  onClick={() => onQuizRestart(quiz.config.subjects, quiz.config.systems)}
                  className="bg-muted hover:bg-accent text-app-primary p-2 rounded-lg transition-colors"
                  title="Restart quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onQuizContinue(quiz.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-app-primary p-2 rounded-lg transition-colors"
                  title="Review results"
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQuizzes;
