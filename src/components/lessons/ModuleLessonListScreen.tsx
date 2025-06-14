import { useState, useEffect } from 'react';
import { ArrowLeft, Lock, CheckCircle, Star, Play, Trophy } from 'lucide-react';
import { getModuleById, getUserProgress, updateUserProgress, LessonModule, Lesson } from '@/data/moduleData';
interface ModuleLessonListScreenProps {
  moduleId: string;
  onNavigate: (screen: string) => void;
  onLessonSelect: (moduleId: string, lessonId: string) => void;
}
const ModuleLessonListScreen = ({
  moduleId,
  onNavigate,
  onLessonSelect
}: ModuleLessonListScreenProps) => {
  const [module, setModule] = useState<LessonModule | null>(null);
  const [userProgress, setUserProgress] = useState<any>({});
  useEffect(() => {
    const moduleData = getModuleById(moduleId);
    setModule(moduleData);
    setUserProgress(getUserProgress());
  }, [moduleId]);
  if (!module) {
    return <div className="p-4 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center text-white">Module not found</div>
      </div>;
  }
  const moduleProgress = userProgress[moduleId] || {
    completed: false,
    completedLessons: 0,
    earnedPoints: 0,
    unlockedLessons: 1
  };
  const isLessonUnlocked = (lessonIndex: number) => {
    return lessonIndex < moduleProgress.unlockedLessons;
  };
  const isLessonCompleted = (lessonId: string) => {
    return moduleProgress.completedLessonIds?.includes(lessonId) || false;
  };
  const handleLessonClick = (lesson: Lesson, lessonIndex: number) => {
    if (isLessonUnlocked(lessonIndex)) {
      onLessonSelect(moduleId, lesson.id);
    }
  };
  const getLessonStatus = (lesson: Lesson, lessonIndex: number) => {
    if (isLessonCompleted(lesson.id)) {
      return 'completed';
    } else if (isLessonUnlocked(lessonIndex)) {
      return 'available';
    } else {
      return 'locked';
    }
  };
  const completedLessonsCount = module.lessons.filter(lesson => isLessonCompleted(lesson.id)).length;
  const progressPercentage = Math.round(completedLessonsCount / module.lessons.length * 100);
  return <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button onClick={() => onNavigate('module-selection')} className="text-white hover:text-slate-300 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white my-[30px]">{module.title}</h1>
          <p className="text-slate-300 text-sm">{module.lessons.length} lessons</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Trophy className="w-4 h-4 fill-current" />
            <span className="font-bold">{moduleProgress.earnedPoints}/{module.totalPoints}</span>
          </div>
          <div className="text-xs text-slate-400">Points Progress</div>
        </div>
      </div>

      {/* Module Progress */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Module Progress</h2>
          <span className="text-sm text-slate-400">{completedLessonsCount}/{module.lessons.length} completed</span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500" style={{
          width: `${progressPercentage}%`
        }} />
        </div>
        
        <div className="flex justify-between text-xs text-slate-400">
          <span>{progressPercentage}% Complete</span>
          <span>{module.estimatedTime} min total</span>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
          <span>Lessons</span>
          <div className="h-px bg-gradient-to-r from-blue-600 to-transparent flex-1"></div>
        </h2>

        <div className="space-y-3">
          {module.lessons.map((lesson, index) => {
          const status = getLessonStatus(lesson, index);
          const isAvailable = status === 'available';
          const isCompleted = status === 'completed';
          const isLocked = status === 'locked';
          return <div key={lesson.id} className="relative">
                <button onClick={() => handleLessonClick(lesson, index)} disabled={isLocked} className={`w-full p-4 rounded-xl border transition-all duration-300 ${isCompleted ? 'bg-gradient-to-r from-green-600/20 to-green-500/10 border-green-600/30 hover:border-green-500/50' : isAvailable ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-blue-600/30 hover:border-blue-500/50 hover:scale-[1.02]' : 'bg-slate-800/40 border-slate-700/30 cursor-not-allowed opacity-60'}`}>
                  <div className="flex items-center space-x-4">
                    {/* Lesson Number/Status Icon */}
                    <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold border-2 ${isCompleted ? 'bg-green-600/20 border-green-600/40 text-green-400' : isAvailable ? 'bg-blue-600/20 border-blue-600/40 text-blue-400' : 'bg-slate-700/50 border-slate-600/30 text-slate-500'}`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6 text-green-400" /> : isLocked ? <Lock className="w-5 h-5 text-slate-500" /> : <Play className="w-5 h-5 text-blue-400" />}
                    </div>

                    {/* Lesson Content */}
                    <div className="flex-1 text-left">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-semibold text-lg leading-tight ${isLocked ? 'text-slate-500' : 'text-white'}`}>
                            {lesson.title}
                          </h3>
                          <p className={`text-sm mt-1 ${isLocked ? 'text-slate-600' : 'text-slate-300'}`}>
                            {lesson.description}
                          </p>
                        </div>
                      </div>

                      {/* Lesson Stats */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center space-x-1 ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                            <span className="text-xs">{lesson.duration} min</span>
                          </div>
                          <div className={`flex items-center space-x-1 ${isLocked ? 'text-slate-600' : 'text-yellow-400'}`}>
                            <Trophy className="w-3 h-3 fill-current" />
                            <span className="text-xs font-medium">+{lesson.pointsReward} pts</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        {isCompleted && <div className="flex items-center space-x-1 bg-green-600/20 border border-green-600/30 rounded-full px-2 py-1">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-xs font-medium text-green-400">Complete</span>
                          </div>}
                        
                        {isAvailable && !isCompleted && <div className="flex items-center space-x-1 bg-blue-600/20 border border-blue-600/30 rounded-full px-2 py-1">
                            <Play className="w-3 h-3 text-blue-400" />
                            <span className="text-xs font-medium text-blue-400">Start</span>
                          </div>}

                        {isLocked && <div className="flex items-center space-x-1 bg-slate-600/20 border border-slate-600/30 rounded-full px-2 py-1">
                            <Lock className="w-3 h-3 text-slate-500" />
                            <span className="text-xs font-medium text-slate-500">Locked</span>
                          </div>}
                      </div>
                    </div>
                  </div>
                </button>
              </div>;
        })}
        </div>
      </div>
    </div>;
};
export default ModuleLessonListScreen;