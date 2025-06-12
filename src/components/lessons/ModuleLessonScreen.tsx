
import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, ChevronRight, CheckCircle, Star, Award } from 'lucide-react';
import { getModuleById, getUserProgress, saveUserProgress, LessonModule, Lesson } from '@/data/moduleData';
import LessonProgress from './LessonProgress';

interface ModuleLessonScreenProps {
  moduleId: string;
  lessonId: string;
  onNavigate: (screen: string) => void;
  onComplete: () => void;
}

const ModuleLessonScreen = ({ moduleId, lessonId, onNavigate, onComplete }: ModuleLessonScreenProps) => {
  const [module, setModule] = useState<LessonModule | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [showXpReward, setShowXpReward] = useState(false);

  useEffect(() => {
    const moduleData = getModuleById(moduleId);
    if (moduleData) {
      setModule(moduleData);
      
      // Find the specific lesson
      const lessonIndex = moduleData.lessons.findIndex(lesson => lesson.id === lessonId);
      if (lessonIndex !== -1) {
        setCurrentLesson(moduleData.lessons[lessonIndex]);
        setCurrentLessonIndex(lessonIndex);
      }
      
      // Load user progress
      const progress = getUserProgress();
      const moduleProgress = progress[moduleId];
      if (moduleProgress) {
        setCompletedLessons(new Set(Array.from({length: moduleProgress.completedLessons || 0}, (_, i) => i)));
        setEarnedXp(moduleProgress.earnedXp || 0);
      }
    }
  }, [moduleId, lessonId]);

  const handleLessonComplete = () => {
    if (!module || !currentLesson) return;

    const newCompletedLessons = new Set(completedLessons);
    const wasAlreadyCompleted = newCompletedLessons.has(currentLessonIndex);
    newCompletedLessons.add(currentLessonIndex);
    setCompletedLessons(newCompletedLessons);

    // Add XP reward if lesson wasn't already completed
    if (!wasAlreadyCompleted) {
      const newXp = earnedXp + currentLesson.xpReward;
      setEarnedXp(newXp);
      setShowXpReward(true);
      setTimeout(() => setShowXpReward(false), 2000);
      
      // Save progress with XP
      const isModuleComplete = newCompletedLessons.size === module.lessons.length;
      saveUserProgress(moduleId, currentLessonIndex, newCompletedLessons.size, isModuleComplete, newXp);
    }

    // Navigate back to lesson list after delay
    setTimeout(() => {
      onComplete();
    }, wasAlreadyCompleted ? 500 : 2000);
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

  const handleStepClick = (step: number) => {
    // For now, we'll just stay on the current lesson
    // In a full implementation, this would navigate between lessons
    console.log('Step clicked:', step);
  };

  if (!module || !currentLesson) {
    return (
      <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center space-x-3">
          <button onClick={() => onNavigate('module-lesson-list')} className="text-white hover:text-slate-300">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Lesson Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  const isLessonCompleted = completedLessons.has(currentLessonIndex);

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* XP Reward Animation */}
      {showXpReward && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-scale-in flex items-center space-x-2">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold">+{currentLesson.xpReward} XP</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center space-x-3">
        <button onClick={() => onNavigate('module-lesson-list')} className="text-white hover:text-slate-300 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white">{module.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{module.system}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{currentLesson.estimatedTime || currentLesson.duration} min</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold">{earnedXp}/{module.totalXp}</span>
          </div>
          <div className="text-xs text-slate-400">Module XP</div>
        </div>
      </div>

      {/* Progress */}
      <LessonProgress 
        currentStep={currentLessonIndex}
        totalSteps={module.lessons.length}
        onStepClick={handleStepClick}
      />

      {/* Lesson Content */}
      <div className="space-y-6">
        {/* Lesson Header */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-xl font-semibold text-white">{currentLesson.title}</h2>
                {isLessonCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
              </div>
              <p className="text-slate-300 text-sm">{currentLesson.description}</p>
            </div>
            <div className="flex items-center space-x-1 text-yellow-400 ml-4">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{currentLesson.xpReward} XP</span>
            </div>
          </div>
        </div>

        {/* Image if available */}
        {currentLesson.image && !showQuiz && (
          <div className="text-center">
            <div className="inline-block rounded-xl overflow-hidden border border-slate-700/50 shadow-lg">
              <img 
                src={currentLesson.image} 
                alt={currentLesson.imageDescription || currentLesson.title}
                className="w-full max-w-sm mx-auto bg-slate-700"
              />
            </div>
            {currentLesson.imageDescription && (
              <p className="text-sm text-slate-400 mt-3 max-w-sm mx-auto">{currentLesson.imageDescription}</p>
            )}
          </div>
        )}

        {/* Content or Quiz */}
        {!showQuiz ? (
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-6 space-y-6 border border-slate-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">
                Section {currentParagraph + 1} of {currentLesson.content.length}
              </span>
              <div className="flex space-x-1">
                {currentLesson.content.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index <= currentParagraph ? 'bg-blue-500' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-white font-light">
                {currentLesson.content[currentParagraph]}
              </p>
            </div>

            <button
              onClick={handleNextParagraph}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>
                {currentParagraph < currentLesson.content.length - 1 
                  ? 'Continue Reading' 
                  : currentLesson.type === 'interactive' 
                  ? 'Take Knowledge Check' 
                  : 'Complete Lesson'
                }
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-6 space-y-6 border border-slate-700/50 shadow-lg">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Knowledge Check</h3>
              <p className="text-white text-lg leading-relaxed">{currentLesson.quiz?.question}</p>
            </div>

            <div className="space-y-3">
              {currentLesson.quiz?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-300 border ${
                    selectedAnswer === null
                      ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white border-slate-600/50 hover:border-slate-500'
                      : selectedAnswer === index
                      ? index === currentLesson.quiz?.correct
                        ? 'bg-green-600/20 border-green-600/50 text-green-300'
                        : 'bg-red-600/20 border-red-600/50 text-red-300'
                      : index === currentLesson.quiz?.correct
                      ? 'bg-green-600/20 border-green-600/50 text-green-300'
                      : 'bg-slate-700/30 border-slate-600/30 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      selectedAnswer === null
                        ? 'bg-slate-600 text-white'
                        : selectedAnswer === index
                        ? index === currentLesson.quiz?.correct
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                        : index === currentLesson.quiz?.correct
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-600 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showFeedback && index === currentLesson.quiz?.correct && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showFeedback && currentLesson.quiz && (
              <div className={`p-4 rounded-lg border ${
                selectedAnswer === currentLesson.quiz.correct
                  ? 'bg-green-900/20 border-green-600/30'
                  : 'bg-blue-900/20 border-blue-600/30'
              }`}>
                <p className={`font-semibold mb-2 ${
                  selectedAnswer === currentLesson.quiz.correct ? 'text-green-300' : 'text-blue-300'
                }`}>
                  {selectedAnswer === currentLesson.quiz.correct ? '🎉 Excellent!' : '💡 Good try!'}
                </p>
                <p className="text-sm text-slate-300 mb-4">{currentLesson.quiz.explanation}</p>

                <button
                  onClick={handleQuizComplete}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span>Earn {currentLesson.xpReward} XP & Continue</span>
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
