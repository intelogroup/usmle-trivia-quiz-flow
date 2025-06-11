
import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { getLessonById, Lesson } from '@/data/lessonData';
import LessonProgress from './LessonProgress';
import LessonContent from './LessonContent';

interface QuickLessonScreenProps {
  lessonId: string;
  onNavigate: (screen: string) => void;
}

const QuickLessonScreen = ({ lessonId, onNavigate }: QuickLessonScreenProps) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const lessonData = getLessonById(lessonId);
    if (lessonData) {
      setLesson(lessonData);
    }
  }, [lessonId]);

  const handleStepComplete = () => {
    const newCompletedSteps = new Set(completedSteps);
    newCompletedSteps.add(currentStep);
    setCompletedSteps(newCompletedSteps);

    if (currentStep < (lesson?.steps.length || 0) - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Lesson complete
      handleLessonComplete();
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (completedSteps.has(stepIndex) || stepIndex === currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleLessonComplete = () => {
    // Save progress to localStorage
    const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    progress[lessonId] = {
      completed: true,
      completedAt: new Date().toISOString(),
      stepsCompleted: lesson?.steps.length || 0
    };
    localStorage.setItem('lessonProgress', JSON.stringify(progress));

    // Navigate back to lessons
    onNavigate('learn');
  };

  if (!lesson) {
    return (
      <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center space-x-3">
          <button onClick={() => onNavigate('learn')} className="text-white hover:text-slate-300">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Lesson Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = lesson.steps[currentStep];

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button onClick={() => onNavigate('learn')} className="text-white hover:text-slate-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{lesson.title}</h1>
          <div className="flex items-center space-x-3 text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{lesson.system}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{lesson.estimatedTime} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <LessonProgress 
        currentStep={currentStep}
        totalSteps={lesson.steps.length}
        onStepClick={handleStepClick}
      />

      {/* Lesson Content */}
      <LessonContent 
        step={currentStepData}
        onStepComplete={handleStepComplete}
      />

      {/* Lesson info */}
      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
        <p className="text-sm text-slate-400">
          {lesson.subject} • {lesson.description}
        </p>
      </div>
    </div>
  );
};

export default QuickLessonScreen;
