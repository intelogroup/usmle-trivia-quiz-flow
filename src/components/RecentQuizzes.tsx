
import { Clock, RotateCcw, Play, TrendingUp, Target, Calendar } from "lucide-react";
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

  const getScoreBadgeStyle = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "bg-green-500/20 border-green-500/50 text-green-300";
    if (percentage >= 60) return "bg-yellow-500/20 border-yellow-500/50 text-yellow-300";
    return "bg-red-500/20 border-red-500/50 text-red-300";
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (recentQuizzes.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl p-8 text-center border border-slate-700/50">
        <div className="text-slate-400 space-y-3">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 opacity-50" />
          </div>
          <div>
            <p className="text-lg font-medium text-slate-300">No recent quizzes</p>
            <p className="text-sm">Start a quiz to see your history here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-400" />
          Recent Quizzes
        </h3>
        <div className="text-xs text-slate-400">
          {recentQuizzes.length} quiz{recentQuizzes.length !== 1 ? 'es' : ''}
        </div>
      </div>
      
      <div className="space-y-3">
        {recentQuizzes.map((quiz, index) => (
          <div key={quiz.id} className="bg-gradient-to-r from-slate-800/70 to-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-white truncate">{quiz.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs border font-medium ${getScoreBadgeStyle(quiz.score, quiz.totalQuestions)}`}>
                    {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Target className="w-3 h-3" />
                    <span className={getScoreColor(quiz.score, quiz.totalQuestions)}>
                      {quiz.score}/{quiz.totalQuestions}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{quiz.duration}</span>
                  </div>
                  <span>{getRelativeTime(quiz.date)}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {quiz.config.subjects.slice(0, 2).map(subject => (
                    <span key={subject} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full border border-blue-600/30">
                      {subject}
                    </span>
                  ))}
                  {quiz.config.subjects.length > 2 && (
                    <span className="text-xs bg-slate-600/50 text-slate-300 px-2 py-1 rounded-full">
                      +{quiz.config.subjects.length - 2} more
                    </span>
                  )}
                  {quiz.config.systems.slice(0, 1).map(system => (
                    <span key={system} className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded-full border border-green-600/30">
                      {system.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onQuizRestart(quiz.config.subjects, quiz.config.systems)}
                  className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition-all duration-200 hover:scale-105 group"
                  title="Restart quiz"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => onQuizContinue(quiz.id)}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                  title="Review results"
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Performance indicator bar */}
            <div className="mt-3 bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  (quiz.score / quiz.totalQuestions) >= 0.8 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                  (quiz.score / quiz.totalQuestions) >= 0.6 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                  'bg-gradient-to-r from-red-500 to-red-400'
                }`}
                style={{ width: `${(quiz.score / quiz.totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQuizzes;
