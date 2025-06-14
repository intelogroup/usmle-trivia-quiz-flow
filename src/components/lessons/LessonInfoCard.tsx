
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
      return <Target className="w-5 h-5 text-orange-400" />;
    }
    return <BookOpen className="w-5 h-5 text-blue-400" />;
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
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl blur-lg"></div>
      <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-700/90 backdrop-blur-md rounded-xl p-6 border border-slate-500/40 shadow-xl">
        {/* Lesson Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-sm">
            {getLessonTypeIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-1">
              <span className="text-xs font-medium text-blue-100 bg-blue-700/30 px-3 py-1 rounded-full border border-blue-500/40 shadow-sm">
                Lesson {currentLessonIndex + 1} of {module.lessons.length}
              </span>
              <span className="text-xs font-medium text-slate-400">{module.system}</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-1 truncate" title={currentLesson.title}>
              {currentLesson.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{currentLesson.description}</p>
          </div>
        </div>

        {/* Learning Objective */}
        {hasLearningObjective(currentLesson) && (
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl px-4 py-3 mb-4">
            <div className="flex items-start space-x-3">
              <Brain className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-blue-200 mb-1">Learning Objective</div>
                <div className="text-sm text-slate-300">{currentLesson.learningObjective}</div>
              </div>
            </div>
          </div>
        )}

        {/* Reading Progress */}
        <div className="bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-600/40">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm font-medium text-white">Reading Progress:</span>
              <span className="text-sm font-medium text-blue-200">{getProgressText()}</span>
            </div>
            <span className="text-sm font-bold text-blue-300">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-slate-700/60 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Keep going!</span>
            <div className="flex items-center space-x-1">
              <Trophy className="w-3 h-3 text-yellow-400" />
              <span>+{currentLesson.pointsReward} points on completion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonInfoCard;
