
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
        return <Heart className="w-8 h-8 text-red-400" />;
      case 'Respiratory System':
        return <Activity className="w-8 h-8 text-blue-400" />;
      case 'Nervous System':
        return <Brain className="w-8 h-8 text-purple-400" />;
      default:
        return <Activity className="w-8 h-8 text-green-400" />;
    }
  };

  const getLessonTypeIcon = () => {
    if (currentLesson?.type === 'interactive') {
      return <Target className="w-5 h-5 text-orange-400" />;
    }
    return <BookOpen className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-xl"></div>
      <div className="relative bg-gradient-to-r from-slate-800/95 to-slate-700/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-500/40 shadow-2xl">
        <div className="flex items-start space-x-6">
          <button 
            onClick={() => onNavigate('module-lesson-list')} 
            className="mt-2 p-2 text-white hover:text-blue-300 transition-colors hover:bg-slate-600/50 rounded-lg"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              {getSystemIcon(module.system)}
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{module.icon}</span>
                <h1 className="text-2xl font-bold text-white leading-tight">{module.title}</h1>
                {isLessonCompleted && (
                  <div className="w-6 h-6 text-green-400 bg-green-400/20 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-8 text-base text-slate-300">
              <div className="flex items-center space-x-3">
                {getLessonTypeIcon()}
                <span className="font-medium">{currentLesson.type === 'interactive' ? 'Interactive' : 'Reading'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-medium">{currentLesson.estimatedTime || currentLesson.duration} min</span>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold text-yellow-300">{currentLesson.pointsReward} pts</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-full px-5 py-3 border border-yellow-500/40 shadow-lg">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <span className="font-bold text-yellow-300 text-lg">{earnedPoints}/{module.totalPoints}</span>
            </div>
            <div className="text-sm text-slate-400 mt-2 font-medium">Module Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleLessonHeader;
