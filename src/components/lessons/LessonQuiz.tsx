
import { Award, Trophy } from 'lucide-react';
import { Lesson } from '@/data/types';

interface LessonQuizProps {
  currentLesson: Lesson;
  selectedAnswer: number | null;
  showFeedback: boolean;
  onQuizAnswer: (answerIndex: number) => void;
  onQuizComplete: () => void;
}

const LessonQuiz = ({ 
  currentLesson, 
  selectedAnswer, 
  showFeedback, 
  onQuizAnswer, 
  onQuizComplete 
}: LessonQuizProps) => {
  if (!currentLesson.quiz) return null;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-lg"></div>
      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30 shadow-xl">
        <div className="text-center space-y-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-2xl flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">Knowledge Check</h3>
          <p className="text-white text-xl leading-relaxed max-w-2xl mx-auto">{currentLesson.quiz.question}</p>
        </div>

        <div className="space-y-4">
          {currentLesson.quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onQuizAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-5 rounded-xl text-left transition-all duration-300 border-2 transform hover:scale-[1.02] ${
                selectedAnswer === null
                  ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white border-slate-600/50 hover:border-slate-500 shadow-lg'
                  : selectedAnswer === index
                  ? index === currentLesson.quiz.correct
                    ? 'bg-green-600/20 border-green-500 text-green-300 shadow-green-500/20'
                    : 'bg-red-600/20 border-red-500 text-red-300 shadow-red-500/20'
                  : index === currentLesson.quiz.correct
                  ? 'bg-green-600/20 border-green-500 text-green-300 shadow-green-500/20'
                  : 'bg-slate-700/30 border-slate-600/30 text-slate-400'
              } shadow-lg`}
            >
              <div className="flex items-center space-x-4">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold border-2 ${
                  selectedAnswer === null
                    ? 'bg-slate-600 border-slate-500 text-white'
                    : selectedAnswer === index
                    ? index === currentLesson.quiz.correct
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-red-600 border-red-500 text-white'
                    : index === currentLesson.quiz.correct
                    ? 'bg-green-600 border-green-500 text-white'
                    : 'bg-slate-600 border-slate-500 text-slate-400'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-lg">{option}</span>
                {showFeedback && index === currentLesson.quiz.correct && (
                  <div className="w-6 h-6 text-green-400">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>

        {showFeedback && currentLesson.quiz && (
          <div className={`mt-8 p-6 rounded-xl border-2 ${
            selectedAnswer === currentLesson.quiz.correct
              ? 'bg-green-900/20 border-green-600/50'
              : 'bg-blue-900/20 border-blue-600/50'
          }`}>
            <p className={`font-bold text-xl mb-3 ${
              selectedAnswer === currentLesson.quiz.correct ? 'text-green-300' : 'text-blue-300'
            }`}>
              {selectedAnswer === currentLesson.quiz.correct ? '🎉 Excellent Work!' : '💡 Good Effort!'}
            </p>
            <p className="text-slate-300 mb-6 text-lg leading-relaxed">{currentLesson.quiz.explanation}</p>

            <button
              onClick={onQuizComplete}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Trophy className="w-5 h-5 fill-current" />
              <span className="text-lg">Earn {currentLesson.pointsReward} Points & Continue</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonQuiz;
