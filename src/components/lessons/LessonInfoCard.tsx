
import { Target, BookOpen, User, Brain, Trophy, CheckCircle } from 'lucide-react';
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
      return <Target className="w-6 h-6 text-orange-400" />;
    }
    return <BookOpen className="w-6 h-6 text-blue-400" />;
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
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-lg"></div>
      <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-700/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-500/40 shadow-xl">
        {/* Lesson Header */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-500/40 rounded-2xl flex items-center justify-center">
            {getLessonTypeIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-sm font-bold text-blue-300 bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">
                Lesson {currentLessonIndex + 1} of {module.lessons.length}
              </span>
              <span className="text-sm font-medium text-slate-400">
                {module.system}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
              {currentLesson.title}
            </h2>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              {currentLesson.description}
            </p>
          </div>
        </div>

        {/* Learning Objective */}
        {currentLesson.learningObjective && (
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Brain className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-blue-300 mb-2">Learning Objective</h3>
                <p className="text-base text-slate-300 leading-relaxed">
                  {currentLesson.learningObjective}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reading Progress */}
        <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-600/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-bold text-white">Reading Progress:</h3>
              <span className="text-base font-medium text-slate-300">{getProgressText()}</span>
            </div>
            <span className="text-base font-bold text-blue-300">{getProgressPercentage()}%</span>
          </div>
          
          <div className="w-full bg-slate-700/60 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-slate-400">
            <span>Keep going!</span>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>+{currentLesson.pointsReward} points on completion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonInfoCard;
