
import { RotateCcw, BookOpen, CheckCircle, XCircle, Filter } from "lucide-react";

interface ReviewScreenProps {
  onNavigate: (screen: string) => void;
}

const ReviewScreen = ({ onNavigate }: ReviewScreenProps) => {
  const reviewQuestions = [
    {
      id: 1,
      question: "Which of the following is the most common cause of pneumonia in healthy adults?",
      category: "Microbiology",
      yourAnswer: "Haemophilus influenzae",
      correctAnswer: "Streptococcus pneumoniae",
      isCorrect: false,
      explanation: "Streptococcus pneumoniae is the most common bacterial cause of community-acquired pneumonia in healthy adults."
    },
    {
      id: 2,
      question: "What is the normal range for adult resting heart rate?",
      category: "Physiology",
      yourAnswer: "60-100 bpm",
      correctAnswer: "60-100 bpm",
      isCorrect: true,
      explanation: "The normal resting heart rate for adults ranges from 60 to 100 beats per minute."
    }
  ];

  const filterOptions = ["All", "Incorrect Only", "By Category"];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
          <RotateCcw className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold">Review Questions</h1>
        <p className="text-slate-300">Learn from your mistakes and improve</p>
      </div>

      {/* Filter Options */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
        {filterOptions.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              index === 0 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Review Summary */}
      <div className="bg-slate-800 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">2</div>
            <div className="text-sm text-slate-400">Total Questions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">1</div>
            <div className="text-sm text-slate-400">Incorrect</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">1</div>
            <div className="text-sm text-slate-400">Correct</div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {reviewQuestions.length > 0 ? (
          reviewQuestions.map((question) => (
            <div key={question.id} className="bg-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {question.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-sm bg-slate-700 px-2 py-1 rounded">{question.category}</span>
                  </div>
                  <p className="font-medium mb-3">{question.question}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className={`p-3 rounded-lg ${question.isCorrect ? 'bg-green-900/30 border border-green-600' : 'bg-red-900/30 border border-red-600'}`}>
                  <div className="text-sm text-slate-300">Your Answer:</div>
                  <div className="font-medium">{question.yourAnswer}</div>
                </div>

                {!question.isCorrect && (
                  <div className="p-3 rounded-lg bg-green-900/30 border border-green-600">
                    <div className="text-sm text-slate-300">Correct Answer:</div>
                    <div className="font-medium">{question.correctAnswer}</div>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-slate-700">
                  <div className="text-sm text-slate-300 mb-1">Explanation:</div>
                  <div className="text-sm">{question.explanation}</div>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                Practice Similar Questions
              </button>
            </div>
          ))
        ) : (
          <div className="bg-slate-800 rounded-xl p-8 text-center">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">No questions to review yet</h3>
            <p className="text-slate-400 mb-4">Take some quizzes to see questions that need review here</p>
            <button
              onClick={() => onNavigate('quiz')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Start a Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewScreen;
