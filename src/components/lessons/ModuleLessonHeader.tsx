
import { ArrowLeft, Clock, Trophy, Star, Heart, Activity, Brain, Target, BookOpen } from 'lucide-react';
import { LessonModule, Lesson } from '@/data/types';

interface ModuleLessonHeaderProps {
  module: LessonModule;
  currentLesson: Lesson;
  currentLessonIndex: number;
  earnedPoints: number;
  isLessonCompleted: boolean;
  onNavigate: (screen: string) => void;
}

const ModuleLessonHeader = ({
  module,
  currentLesson,
  currentLessonIndex,
  earnedPoints,
  isLessonCompleted,
  onNavigate
}: ModuleLessonHeaderProps) => {
  const getSystemIcon = (system: string) => {
    switch (system) {
      case 'Cardiovascular System':
        return <Heart className="w-6 h-6 text-red-400" />;
      case 'Respiratory System':
        return <Activity className="w-6 h-6 text-blue-400" />;
      case 'Nervous System':
        return <Brain className="w-6 h-6 text-purple-400" />;
      default:
        return <Activity className="w-6 h-6 text-green-400" />;
    }
  };

  const getLessonTypeIcon = () => {
    if (currentLesson?.type === 'interactive') {
      return <Target className="w-4 h-4 text-orange-400" />;
    }
    return <BookOpen className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
      <div className="relative bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
        <div className="flex items-start space-x-4">
          <button onClick={() => onNavigate('module-lesson-list')} className="mt-1 text-white hover:text-slate-300 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {getSystemIcon(module.system)}
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{module.icon}</span>
                <h1 className="text-xl font-bold text-white">{module.title}</h1>
                {isLessonCompleted && <div className="w-5 h-5 text-green-400">✓</div>}
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                {getLessonTypeIcon()}
                <span>{currentLesson.type === 'interactive' ? 'Interactive' : 'Reading'}</span>
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
  );
};

export default ModuleLessonHeader;
