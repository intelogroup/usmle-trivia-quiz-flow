
import { useState, useEffect } from 'react';
import { getModuleById, getUserProgress, saveUserProgress, LessonModule, Lesson } from '@/data/moduleData';
import { getLessonById as getInteractiveLessonById } from '@/data/lessonData';
import LessonProgress from './LessonProgress';
import LessonContent from './LessonContent';
import ModuleLessonHeader from './ModuleLessonHeader';
import LessonInfoCard from './LessonInfoCard';
import ReadingContent from './ReadingContent';
import LessonQuiz from './LessonQuiz';
import PointsRewardAnimation from './PointsRewardAnimation';

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

  const [interactiveLesson, setInteractiveLesson] = useState<Lesson | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const moduleData = getModuleById(moduleId);
    if (moduleData) {
      setModule(moduleData);
      
      const lessonIndex = moduleData.lessons.findIndex(lesson => lesson.id === lessonId);
      if (lessonIndex !== -1) {
        const lesson = moduleData.lessons[lessonIndex];
        setCurrentLesson(lesson);
        setCurrentLessonIndex(lessonIndex);

        if (lesson.type === 'interactive') {
          const iLesson = getInteractiveLessonById(lesson.id);
          if (iLesson && iLesson.steps) {
            setInteractiveLesson(iLesson);
            setShowQuiz(false);
          } else {
            console.error(`Interactive lesson data not found for id: ${lesson.id}`);
          }
        } else {
          setInteractiveLesson(null);
        }
      }
      
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

    if (!wasAlreadyCompleted) {
      const newPoints = earnedPoints + currentLesson.pointsReward;
      setEarnedPoints(newPoints);
      setShowPointsReward(true);
      setTimeout(() => setShowPointsReward(false), 2000);
      
      const isModuleComplete = newCompletedLessons.size === module.lessons.length;
      saveUserProgress(moduleId, currentLessonIndex, newCompletedLessons.size, isModuleComplete, newPoints);
    }

    setTimeout(() => {
      onComplete();
    }, wasAlreadyCompleted ? 500 : 2000);
  };

  const handleNextParagraph = () => {
    if (!currentLesson || !currentLesson.content) return;

    if (currentParagraph < currentLesson.content.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
    } else if (currentLesson.quiz) {
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
    console.log('Step clicked:', step);
  };

  const handleNextStep = () => {
    if (interactiveLesson && interactiveLesson.steps && currentStepIndex < interactiveLesson.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleLessonComplete();
    }
  };

  if (!module || !currentLesson) {
    return (
      <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center space-x-3">
          <button onClick={() => onNavigate('module-lesson-list')} className="text-white hover:text-slate-300">
            <div className="w-6 h-6">←</div>
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
      {/* Points Reward Animation */}
      <PointsRewardAnimation 
        show={showPointsReward} 
        points={currentLesson.pointsReward} 
      />

      {/* Enhanced Header with System Context */}
      <ModuleLessonHeader
        module={module}
        currentLesson={currentLesson}
        currentLessonIndex={currentLessonIndex}
        earnedPoints={earnedPoints}
        isLessonCompleted={isLessonCompleted}
        onNavigate={onNavigate}
      />

      {/* Enhanced Progress Indicator */}
      <LessonProgress 
        currentStep={currentLessonIndex}
        totalSteps={module.lessons.length}
        onStepClick={handleStepClick}
      />

      {/* Enhanced Lesson Content with Better Hierarchy */}
      <div className="space-y-6">
        {/* Lesson Header Card with Learning Objectives */}
        <LessonInfoCard
          module={module}
          currentLesson={currentLesson}
          currentLessonIndex={currentLessonIndex}
          currentParagraph={currentParagraph}
          currentStepIndex={currentStepIndex}
          interactiveStepsLength={interactiveLesson?.steps?.length}
          showQuiz={showQuiz}
        />

        {/* Enhanced Image Display */}
        {currentLesson.image && !showQuiz && (
          <div className="text-center">
            <div className="relative inline-block rounded-2xl overflow-hidden border border-slate-600/30 shadow-2xl">
              <img 
                src={`https://images.unsplash.com/${currentLesson.image}?w=600&h=400&fit=crop`}
                alt={currentLesson.imageDescription || currentLesson.title}
                className="w-full max-w-lg mx-auto bg-slate-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>
            {currentLesson.imageDescription && (
              <div className="mt-4 max-w-lg mx-auto">
                <p className="text-sm text-slate-400 bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                  📊 {currentLesson.imageDescription}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Content Display */}
        {currentLesson.type === 'interactive' && interactiveLesson?.steps ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-700/40 rounded-2xl blur-lg"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30 shadow-xl">
              <LessonContent
                step={interactiveLesson.steps[currentStepIndex]}
                onStepComplete={handleNextStep}
              />
            </div>
          </div>
        ) : !showQuiz ? (
          <ReadingContent
            currentLesson={currentLesson}
            currentParagraph={currentParagraph}
            onNextParagraph={handleNextParagraph}
          />
        ) : (
          <LessonQuiz
            currentLesson={currentLesson}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            onQuizAnswer={handleQuizAnswer}
            onQuizComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
};

export default ModuleLessonScreen;
