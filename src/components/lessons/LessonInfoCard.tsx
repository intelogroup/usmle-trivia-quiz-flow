
import { Eye, Target, BookOpen, Star } from 'lucide-react';
import { LessonModule, Lesson } from '@/data/types';

interface LessonInfoCardProps {
  module: LessonModule;
  currentLesson: Lesson;
  currentLessonIndex: number;
  currentParagraph?: number;
  currentStepIndex?: number;
  interactiveStepsLength?: number;
  showQuiz: boolean;
}

const LessonInfoCard = ({
  module,
  currentLesson,
  currentLessonIndex,
  currentParagraph = 0,
  currentStepIndex = 0,
  interactiveStepsLength = 0,
  showQuiz
}: LessonInfoCardProps) => {
  const getLessonTypeIcon = () => {
    if (currentLesson?.type === 'interactive') {
      return <Target className="w-4 h-4 text-orange-400" />;
    }
    return <BookOpen className="w-4 h-4 text-blue-400" />;
  };

  const progressPercentage = currentLesson.content && currentLesson.content.length > 0 ? Math.round(((currentParagraph + 1) / currentLesson.content.length) * 100) : 0;
  const interactiveProgressPercentage = interactiveStepsLength ? Math.round(((currentStepIndex + 1) / interactiveStepsLength) * 100) : 0;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-lg"></div>
      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center">
                {getLessonTypeIcon()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentLesson.title}</h2>
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <span>Lesson {currentLessonIndex + 1} of {module.lessons.length}</span>
                  <span>•</span>
                  <span>{module.system}</span>
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">{currentLesson.description}</p>
            
            {/* Learning Objective */}
            <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Learning Objective</span>
              </div>
              <p className="text-sm text-slate-300">
                By the end of this lesson, you'll understand the key concepts of {currentLesson.title.toLowerCase()} and be able to apply this knowledge in clinical scenarios.
              </p>
            </div>
            
            {currentLesson.type === 'interactive' && interactiveStepsLength ? (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-slate-300">
                    Step: {currentStepIndex + 1} of {interactiveStepsLength}
                  </span>
                  <div className="w-32 bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${interactiveProgressPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{interactiveProgressPercentage}%</span>
                </div>
              </div>
            ) : !showQuiz && currentLesson.content && currentLesson.content.length > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-slate-300">
                    Reading Progress: {currentParagraph + 1} of {currentLesson.content.length}
                  </span>
                  <div className="w-32 bg-slate-600 rounded-full h-2">
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
  );
};

export default LessonInfoCard;
