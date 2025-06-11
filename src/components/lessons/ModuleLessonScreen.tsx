
import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { getModuleById, getUserProgress, saveUserProgress, LessonModule, ModuleLesson } from '@/data/moduleData';

interface ModuleLessonScreenProps {
  moduleId: string;
  onNavigate: (screen: string) => void;
}

const ModuleLessonScreen = ({ moduleId, onNavigate }: ModuleLessonScreenProps) => {
  const [module, setModule] = useState<LessonModule | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const moduleData = getModuleById(moduleId);
    if (moduleData) {
      setModule(moduleData);
      
      // Load user progress
      const progress = getUserProgress();
      const moduleProgress = progress[moduleId];
      if (moduleProgress) {
        setCurrentLessonIndex(moduleProgress.currentLesson || 0);
        setCompletedLessons(new Set(Array.from({length: moduleProgress.completedLessons || 0}, (_, i) => i)));
      }
    }
  }, [moduleId]);

  const currentLesson = module?.lessons[currentLessonIndex];

  const handleLessonComplete = () => {
    if (!module) return;

    const newCompletedLessons = new Set(completedLessons);
    newCompletedLessons.add(currentLessonIndex);
    setCompletedLessons(newCompletedLessons);

    // Save progress
    const isModuleComplete = newCompletedLessons.size === module.lessons.length;
    saveUserProgress(moduleId, currentLessonIndex, newCompletedLessons.size, isModuleComplete);

    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentParagraph(0);
      setShowQuiz(false);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Module complete
      onNavigate('module-selection');
    }
  };

  const handleNextParagraph = () => {
    if (!currentLesson) return;

    if (currentParagraph < currentLesson.content.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
    } else if (currentLesson.type === 'interactive' && currentLesson.quiz) {
      setShowQuiz(true);
    } else {
      handleLessonComplete();
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
  };

  const handleQuizComplete = () => {
    handleLessonComplete();
  };

  if (!module || !currentLesson) {
    return (
      <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center space-x-3">
          <button onClick={() => onNavigate('module-selection')} className="text-white hover:text-slate-300">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Module Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentLessonIndex + (currentParagraph + 1) / currentLesson.content.length) / module.lessons.length) * 100;

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button onClick={() => onNavigate('module-selection')} className="text-white hover:text-slate-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white">{module.title}</h1>
          <div className="flex items-center space-x-3 text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{module.system}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{currentLesson.estimatedTime} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Module Progress</span>
          <span className="text-white font-medium">
            Lesson {currentLessonIndex + 1} of {module.lessons.length}
          </span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-center space-x-2">
          {module.lessons.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index < currentLessonIndex 
                  ? 'bg-green-600' 
                  : index === currentLessonIndex
                  ? 'bg-blue-600'
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="space-y-6">
        {/* Lesson Header */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-white">{currentLesson.title}</h2>
          <p className="text-slate-300">{currentLesson.description}</p>
        </div>

        {/* Image if available */}
        {currentLesson.image && !showQuiz && (
          <div className="text-center">
            <img 
              src={currentLesson.image} 
              alt={currentLesson.imageDescription || currentLesson.title}
              className="w-full max-w-sm mx-auto rounded-lg bg-slate-700"
            />
            {currentLesson.imageDescription && (
              <p className="text-sm text-slate-400 mt-2">{currentLesson.imageDescription}</p>
            )}
          </div>
        )}

        {/* Content or Quiz */}
        {!showQuiz ? (
          <div className="bg-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Paragraph {currentParagraph + 1} of {currentLesson.content.length}
              </span>
              <div className="flex space-x-1">
                {currentLesson.content.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index <= currentParagraph ? 'bg-blue-600' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-lg leading-relaxed text-white">
              {currentLesson.content[currentParagraph]}
            </p>

            <button
              onClick={handleNextParagraph}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>
                {currentParagraph < currentLesson.content.length - 1 
                  ? 'Continue Reading' 
                  : currentLesson.type === 'interactive' 
                  ? 'Take Quiz' 
                  : 'Complete Lesson'
                }
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Check</h3>
              <p className="text-white mb-6">{currentLesson.quiz?.question}</p>
            </div>

            <div className="space-y-3">
              {currentLesson.quiz?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedAnswer === null
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : selectedAnswer === index
                      ? index === currentLesson.quiz?.correct
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                      : index === currentLesson.quiz?.correct
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showFeedback && index === currentLesson.quiz?.correct && (
                      <CheckCircle className="w-5 h-5 text-white ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showFeedback && currentLesson.quiz && (
              <div className={`p-4 rounded-lg ${
                selectedAnswer === currentLesson.quiz.correct
                  ? 'bg-green-900/30 border border-green-600/50'
                  : 'bg-red-900/30 border border-red-600/50'
              }`}>
                <p className={`font-medium ${
                  selectedAnswer === currentLesson.quiz.correct ? 'text-green-300' : 'text-red-300'
                }`}>
                  {selectedAnswer === currentLesson.quiz.correct ? 'Correct!' : 'Not quite right'}
                </p>
                <p className="text-sm text-slate-300 mt-2">{currentLesson.quiz.explanation}</p>

                <button
                  onClick={handleQuizComplete}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 mt-4"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleLessonScreen;
