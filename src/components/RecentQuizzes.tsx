
import { Clock, RotateCcw, Play } from "lucide-react";

interface RecentQuiz {
  id: string;
  name: string;
  subjects: string[];
  systems: string[];
  score: number;
  totalQuestions: number;
  date: string;
  duration: string;
}

interface RecentQuizzesProps {
  onQuizRestart: (subjects: string[], systems: string[]) => void;
  onQuizContinue: (quizId: string) => void;
}

const RecentQuizzes = ({ onQuizRestart, onQuizContinue }: RecentQuizzesProps) => {
  // Mock data - in real app this would come from localStorage or API
  const recentQuizzes: RecentQuiz[] = [
    {
      id: "1",
      name: "Cardio Focus",
      subjects: ["Anatomy", "Physiology"],
      systems: ["Cardiovascular System"],
      score: 7,
      totalQuestions: 10,
      date: "2 hours ago",
      duration: "8:32"
    },
    {
      id: "2", 
      name: "Neuro Essentials",
      subjects: ["Anatomy", "Physiology"],
      systems: ["Nervous System"],
      score: 12,
      totalQuestions: 15,
      date: "Yesterday",
      duration: "12:15"
    },
    {
      id: "3",
      name: "Custom Quiz",
      subjects: ["Pathology"],
      systems: ["Respiratory System"],
      score: 5,
      totalQuestions: 8,
      date: "2 days ago", 
      duration: "6:45"
    }
  ];

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (recentQuizzes.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 text-center">
        <div className="text-slate-400 space-y-2">
          <Clock className="w-8 h-8 mx-auto opacity-50" />
          <p className="text-sm">No recent quizzes</p>
          <p className="text-xs">Start a quiz to see your history here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">Recent Quizzes</h3>
      
      <div className="space-y-2">
        {recentQuizzes.map((quiz) => (
          <div key={quiz.id} className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white truncate">{quiz.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-slate-400 mt-1">
                  <span className={getScoreColor(quiz.score, quiz.totalQuestions)}>
                    {quiz.score}/{quiz.totalQuestions} ({Math.round((quiz.score / quiz.totalQuestions) * 100)}%)
                  </span>
                  <span>{quiz.duration}</span>
                  <span>{quiz.date}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {quiz.subjects.map(subject => (
                    <span key={subject} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                      {subject}
                    </span>
                  ))}
                  {quiz.systems.map(system => (
                    <span key={system} className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded-full">
                      {system.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-3">
                <button
                  onClick={() => onQuizRestart(quiz.subjects, quiz.systems)}
                  className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                  title="Restart quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onQuizContinue(quiz.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
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
