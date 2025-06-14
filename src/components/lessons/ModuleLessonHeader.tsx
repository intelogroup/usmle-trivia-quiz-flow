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
        return <Heart className="w-5 h-5 text-red-400" />;
      case 'Respiratory System':
        return <Activity className="w-5 h-5 text-blue-400" />;
      case 'Nervous System':
        return <Brain className="w-5 h-5 text-purple-400" />;
      default:
        return <Activity className="w-5 h-5 text-green-400" />;
    }
  };
  const getLessonTypeIcon = () => {
    if (currentLesson?.type === 'interactive') {
      return <Target className="w-4 h-4 text-orange-400" />;
    }
    return <BookOpen className="w-4 h-4 text-blue-400" />;
  };
  return <div className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/25 to-purple-700/35 rounded-xl blur-xl"></div>
      
    </div>;
};
export default ModuleLessonHeader;