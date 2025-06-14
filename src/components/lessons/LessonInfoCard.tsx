
import { Target, BookOpen, Brain, Trophy } from 'lucide-react';
import { LessonModule, Lesson } from '@/data/types';

interface LessonInfoCardProps {
  module: LessonModule;
  currentLesson: Lesson;
  currentLessonIndex: number;
  currentParagraph: number;
  currentStepIndex: number;
  interactiveStepsLength?: number;
  showQuiz: boolean;
}

// Safely narrows to lessons with 'learningObjective'
function hasLearningObjective(obj: unknown): obj is { learningObjective: string } {
  return typeof obj === 'object' && obj !== null && 'learningObjective' in obj && typeof (obj as any).learningObjective === 'string';
}

const LessonInfoCard = ({
  module,
  currentLesson,
  currentLessonIndex,
  currentParagraph,
  currentStepIndex,
  interactiveStepsLength,
  showQuiz
}: LessonInfoCardProps) => {
  const getLessonTypeIcon = () => {
    if (currentLesson?.type === 'interactive') {
      return <Target className="w-7 h-7 text-orange-400" />;
    }
    return <BookOpen className="w-7 h-7 text-blue-400" />;
  };

  const getProgressText = () => {
    if (showQuiz) {
      return "Knowledge Check";
    } else if (currentLesson.type === 'interactive' && interactiveStepsLength) {
      return `Step ${currentStepIndex + 1} of ${interactiveStepsLength}`;
    } else if (currentLesson.content) {
      return `Section ${currentParagraph + 1} of ${currentLesson.content.length}`;
    }
    return "In Progress";
  };

  const getProgressPercentage = () => {
    if (showQuiz) {
      return 90;
    } else if (currentLesson.type === 'interactive' && interactiveStepsLength) {
      return Math.round(((currentStepIndex + 1) / interactiveStepsLength) * 80);
    } else if (currentLesson.content) {
      return Math.round(((currentParagraph + 1) / currentLesson.content.length) * 80);
    }
    return 0;
  };

  return (
    <div className="relative mb-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-3xl blur-xl"></div>
      <div className="relative bg-gradient-to-b from-slate-800/95 to-slate-700/95 backdrop-blur-md rounded-3xl p-10 border border-slate-500/50 shadow-2xl">
        {/* Lesson Header */}
        <div className="flex items-center space-x-6 mb-7">
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-500/40 rounded-2xl flex items-center justify-center shadow-md">
            {getLessonTypeIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-base font-bold text-blue-100 bg-blue-700/40 px-4 py-1 rounded-full border border-blue-500/50 shadow">
                Lesson {currentLessonIndex + 1} of {module.lessons.length}
              </span>
              <span className="text-base font-medium text-slate-300">{module.system}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2 truncate" title={currentLesson.title}>
              {currentLesson.title}
            </h2>
            <p className="text-lg text-slate-200 leading-relaxed">{currentLesson.description}</p>
          </div>
        </div>

        {/* Learning Objective */}
        {hasLearningObjective(currentLesson) && (
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/40 rounded-2xl px-7 py-5 mb-7">
            <div className="flex items-start space-x-4">
              <Brain className="w-7 h-7 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <div className="text-lg font-bold text-blue-200 mb-1">Learning Objective</div>
                <div className="text-base text-slate-200">{currentLesson.learningObjective}</div>
              </div>
            </div>
          </div>
        )}

        {/* Reading Progress */}
        <div className="bg-slate-800/80 rounded-2xl px-7 py-6 border border-slate-600/50 mb-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xl font-semibold text-white">Reading Progress:</span>
              <span className="text-base font-medium text-blue-100">{getProgressText()}</span>
            </div>
            <span className="text-lg font-bold text-blue-300">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-slate-700/80 rounded-full h-3 mb-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="flex justify-between text-base text-slate-400">
            <span>Keep going!</span>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>+{currentLesson.pointsReward} points on completion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonInfoCard;
