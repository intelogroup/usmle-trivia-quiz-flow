
import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, ChevronRight, CheckCircle, Star, Award, Trophy, Zap } from 'lucide-react';
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
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showPointsReward, setShowPointsReward] = useState(false);

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
        setEarnedPoints(moduleProgress.earnedPoints || 0);
      }
    }
  }, [moduleId, lessonId]);

  const handleLessonComplete = () => {
    if (!module || !currentLesson) return;

    const newCompletedLessons = new Set(completedLessons);
    const wasAlreadyCompleted = newCompletedLessons.has(currentLessonIndex);
    newCompletedLessons.add(currentLessonIndex);
    setCompletedLessons(newCompletedLessons);

    // Add points reward if lesson wasn't already completed
    if (!wasAlreadyCompleted) {
      const newPoints = earnedPoints + currentLesson.pointsReward;
      setEarnedPoints(newPoints);
      setShowPointsReward(true);
      setTimeout(() => setShowPointsReward(false), 2000);
      
      // Save progress with points
      const isModuleComplete = newCompletedLessons.size === module.lessons.length;
      saveUserProgress(moduleId, currentLessonIndex, newCompletedLessons.size, isModuleComplete, newPoints);
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
  const progressPercentage = Math.round((currentParagraph / currentLesson.content.length) * 100);

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Points Reward Animation */}
      {showPointsReward && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-scale-in flex items-center space-x-3">
            <Trophy className="w-6 h-6 fill-current animate-pulse" />
            <span className="font-bold text-lg">+{currentLesson.pointsReward} Points!</span>
            <Zap className="w-5 h-5 fill-current" />
          </div>
        </div>
      )}

      {/* Modern Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
        <div className="relative bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
          <div className="flex items-start space-x-4">
            <button onClick={() => onNavigate('module-lesson-list')} className="mt-1 text-white hover:text-slate-300 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{module.icon}</span>
                <h1 className="text-xl font-bold text-white">{module.title}</h1>
                {isLessonCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{module.system}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentLesson.estimatedTime || currentLesson.duration} min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium text-yellow-400">{currentLesson.pointsReward} pts</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-full px-3 py-1 border border-yellow-600/30">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                <span className="font-bold text-yellow-400">{earnedPoints}/{module.totalPoints}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">Module Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <LessonProgress 
        currentStep={currentLessonIndex}
        totalSteps={module.lessons.length}
        onStepClick={handleStepClick}
      />

      {/* Modern Lesson Content */}
      <div className="space-y-6">
        {/* Lesson Header Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-3">{currentLesson.title}</h2>
                <p className="text-slate-300 text-lg leading-relaxed">{currentLesson.description}</p>
                
                {!showQuiz && (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-slate-300">
                        Progress: {currentParagraph + 1} of {currentLesson.content.length}
                      </span>
                      <div className="w-24 bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">{progressPercentage}%</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-6 text-center">
                <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl p-3 border border-yellow-600/30">
                  <Star className="w-6 h-6 fill-current text-yellow-400 mx-auto mb-1" />
                  <span className="text-lg font-bold text-yellow-400">{currentLesson.pointsReward}</span>
                  <div className="text-xs text-slate-400">points</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image if available */}
        {currentLesson.image && !showQuiz && (
          <div className="text-center">
            <div className="inline-block rounded-2xl overflow-hidden border border-slate-600/30 shadow-2xl">
              <img 
                src={currentLesson.image} 
                alt={currentLesson.imageDescription || currentLesson.title}
                className="w-full max-w-md mx-auto bg-slate-700"
              />
            </div>
            {currentLesson.imageDescription && (
              <p className="text-sm text-slate-400 mt-4 max-w-md mx-auto">{currentLesson.imageDescription}</p>
            )}
          </div>
        )}

        {/* Content or Quiz */}
        {!showQuiz ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-700/40 rounded-2xl blur-lg"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30 shadow-xl">
              <div className="prose prose-invert max-w-none">
                <div className="text-xl leading-relaxed text-white font-light mb-8 min-h-[120px] flex items-center">
                  {currentLesson.content[currentParagraph]}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  {currentLesson.content.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= currentParagraph 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                          : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  {currentParagraph + 1} / {currentLesson.content.length}
                </span>
              </div>

              <button
                onClick={handleNextParagraph}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="text-lg">
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
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-lg"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30 shadow-xl">
              <div className="text-center space-y-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-2xl flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Knowledge Check</h3>
                <p className="text-white text-xl leading-relaxed max-w-2xl mx-auto">{currentLesson.quiz?.question}</p>
              </div>

              <div className="space-y-4">
                {currentLesson.quiz?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-5 rounded-xl text-left transition-all duration-300 border-2 transform hover:scale-[1.02] ${
                      selectedAnswer === null
                        ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white border-slate-600/50 hover:border-slate-500 shadow-lg'
                        : selectedAnswer === index
                        ? index === currentLesson.quiz?.correct
                          ? 'bg-green-600/20 border-green-500 text-green-300 shadow-green-500/20'
                          : 'bg-red-600/20 border-red-500 text-red-300 shadow-red-500/20'
                        : index === currentLesson.quiz?.correct
                        ? 'bg-green-600/20 border-green-500 text-green-300 shadow-green-500/20'
                        : 'bg-slate-700/30 border-slate-600/30 text-slate-400'
                    } shadow-lg`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold border-2 ${
                        selectedAnswer === null
                          ? 'bg-slate-600 border-slate-500 text-white'
                          : selectedAnswer === index
                          ? index === currentLesson.quiz?.correct
                            ? 'bg-green-600 border-green-500 text-white'
                            : 'bg-red-600 border-red-500 text-white'
                          : index === currentLesson.quiz?.correct
                          ? 'bg-green-600 border-green-500 text-white'
                          : 'bg-slate-600 border-slate-500 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-lg">{option}</span>
                      {showFeedback && index === currentLesson.quiz?.correct && (
                        <CheckCircle className="w-6 h-6 text-green-400" />
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
                    onClick={handleQuizComplete}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Trophy className="w-5 h-5 fill-current" />
                    <span className="text-lg">Earn {currentLesson.pointsReward} Points & Continue</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleLessonScreen;
