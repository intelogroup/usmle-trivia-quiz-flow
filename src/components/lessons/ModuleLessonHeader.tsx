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
}: any) => {
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
    <div className="relative mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/35 to-purple-700/45 rounded-3xl blur-2xl"></div>
      <div className="relative bg-gradient-to-r from-slate-800/100 to-slate-700/95 backdrop-blur-lg rounded-3xl p-10 border border-slate-500/50 shadow-2xl">
        <div className="flex items-start space-x-8">
          <button 
            onClick={() => onNavigate('module-lesson-list')} 
            className="mt-4 mr-1 p-3 text-white hover:text-blue-300 transition-colors hover:bg-slate-600/70 rounded-xl"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>
          
          <div className="flex-1">
            <div className="flex items-center space-x-6 mb-5">
              {getSystemIcon(module.system)}
              <span className="text-4xl">{module.icon}</span>
              <h1 className="text-3xl font-extrabold text-white leading-tight">{module.title}</h1>
              {isLessonCompleted && (
                <div className="w-7 h-7 text-green-400 bg-green-400/10 rounded-full flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
            <div className="flex items-center space-x-10 text-lg text-slate-200">
              <div className="flex items-center space-x-4">
                {getLessonTypeIcon()}
                <span className="font-medium">{currentLesson.type === 'interactive' ? 'Interactive' : 'Reading'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-blue-400" />
                <span className="font-medium">{currentLesson.estimatedTime || currentLesson.duration} min</span>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="font-bold text-yellow-300 text-lg">{currentLesson.pointsReward} pts</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-4 bg-gradient-to-r from-yellow-600/40 to-orange-600/40 rounded-full px-8 py-4 border border-yellow-500/50 shadow-2xl">
              <Star className="w-6 h-6 fill-current text-yellow-400" />
              <span className="font-bold text-yellow-200 text-2xl">{earnedPoints}/{module.totalPoints}</span>
            </div>
            <div className="text-base text-slate-400 mt-3 font-semibold">Module Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleLessonHeader;
