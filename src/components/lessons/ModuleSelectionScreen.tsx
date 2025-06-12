
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen, Lock, CheckCircle, Eye, Star, Award, TrendingUp } from 'lucide-react';
import { getModulesBySystem, getUserProgress, getUnlockedLevel, getTotalUserPoints, LessonModule } from '@/data/moduleData';

interface ModuleSelectionScreenProps {
  system: string;
  onNavigate: (screen: string) => void;
  onModuleSelect: (moduleId: string) => void;
}

const ModuleSelectionScreen = ({
  system,
  onNavigate,
  onModuleSelect
}: ModuleSelectionScreenProps) => {
  const [modules, setModules] = useState<LessonModule[]>([]);
  const [userProgress, setUserProgress] = useState<any>({});
  const [unlockedLevel, setUnlockedLevel] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const systemModules = getModulesBySystem(system);
    setModules(systemModules);
    setUserProgress(getUserProgress());
    setUnlockedLevel(getUnlockedLevel());
    setTotalPoints(getTotalUserPoints());
  }, [system]);

  const isModuleUnlocked = (module: LessonModule) => {
    return unlockedLevel >= module.unlockLevel;
  };

  const isModuleCompleted = (moduleId: string) => {
    return userProgress[moduleId]?.completed || false;
  };

  const getModuleProgress = (moduleId: string) => {
    const progress = userProgress[moduleId];
    if (!progress) return 0;
    const moduleData = modules.find(m => m.id === moduleId);
    if (!moduleData) return 0;
    return Math.round(progress.completedLessons / moduleData.lessons.length * 100);
  };

  const getEarnedPoints = (moduleId: string) => {
    return userProgress[moduleId]?.earnedPoints || 0;
  };

  const canPreviewModule = (module: LessonModule) => {
    return module.previewAvailable && !isModuleUnlocked(module);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Advanced':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  const completedModules = Object.values(userProgress).filter((p: any) => p.completed).length;

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button onClick={() => onNavigate('learn')} className="text-white hover:text-slate-300 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white my-[30px]">{system}</h1>
          <p className="text-slate-300 text-sm">Progressive learning modules</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold">{totalPoints}</span>
          </div>
          <div className="text-xs text-slate-400">Total Points</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Your Progress</h2>
          <div className="flex items-center space-x-1 text-blue-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Level {unlockedLevel}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600/20 border border-green-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-xl font-bold text-green-400">{completedModules}</div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-blue-400">{modules.filter(m => isModuleUnlocked(m)).length}</div>
            <div className="text-xs text-slate-400">Unlocked</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600/20 border border-purple-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-purple-400">{modules.length}</div>
            <div className="text-xs text-slate-400">Total Modules</div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
          <span>Learning Path</span>
          <div className="h-px bg-gradient-to-r from-blue-600 to-transparent flex-1"></div>
        </h2>
        
        {modules.map((module, index) => {
          const isUnlocked = isModuleUnlocked(module);
          const isCompleted = isModuleCompleted(module.id);
          const canPreview = canPreviewModule(module);
          const progress = getModuleProgress(module.id);
          const earnedPoints = getEarnedPoints(module.id);

          return (
            <div key={module.id} className="relative">
              {/* Connection Line */}
              {index < modules.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-8 bg-gradient-to-b from-slate-600 to-slate-700"></div>
              )}
              
              <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                isUnlocked 
                  ? 'bg-gradient-to-br from-slate-800 to-slate-800/50 border-slate-600 hover:border-slate-500 shadow-lg' 
                  : canPreview 
                  ? 'bg-slate-800/40 border-slate-600/50 hover:border-slate-500/70' 
                  : 'bg-slate-800/20 border-slate-700/30'
              }`}>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  {isCompleted && <div className="flex items-center space-x-1 bg-green-600/20 border border-green-600/30 rounded-full px-2 py-1">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-xs font-medium text-green-400">Complete</span>
                    </div>}
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Module Header */}
                  <div className="flex items-start space-x-4">
                    <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 transition-all duration-300 ${isCompleted ? 'bg-green-600/20 border-green-600/40 text-green-400' : isUnlocked ? 'bg-blue-600/20 border-blue-600/40 text-blue-400' : 'bg-slate-700/50 border-slate-600/30 text-slate-500 grayscale'}`}>
                      {module.icon}
                      {!isUnlocked && !canPreview && <div className="absolute inset-0 bg-slate-800/80 rounded-xl flex items-center justify-center">
                          <Lock className="w-4 h-4 text-slate-500" />
                        </div>}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-semibold text-lg leading-tight ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                            {module.title}
                          </h3>
                          <p className={`text-sm mt-1 ${isUnlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Module Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-slate-400 mb-1">
                        <BookOpen className="w-3 h-3" />
                        <span className="text-xs">{module.lessons.length} lessons</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-slate-400 mb-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{module.estimatedTime}min</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-medium">{earnedPoints}/{module.totalPoints} Points</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {isUnlocked && progress > 0 && <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500" style={{
                    width: `${progress}%`
                  }} />
                      </div>
                    </div>}

                  {/* Prerequisites */}
                  {module.prerequisites && module.prerequisites.length > 0 && <div className="text-xs text-slate-500">
                      <span>Prerequisites: </span>
                      {module.prerequisites.map((prereq, i) => <span key={prereq}>
                          {modules.find(m => m.id === prereq)?.title || prereq}
                          {i < module.prerequisites!.length - 1 && ', '}
                        </span>)}
                    </div>}

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      if (isUnlocked || canPreview) {
                        onModuleSelect(module.id);
                      }
                    }}
                    disabled={!isUnlocked && !canPreview}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isUnlocked 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                        : canPreview 
                        ? 'bg-slate-700 hover:bg-slate-600 text-blue-400 border border-blue-500/30' 
                        : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {canPreview && <Eye className="w-4 h-4" />}
                    <span>
                      {isCompleted 
                        ? 'Review Module' 
                        : isUnlocked 
                        ? progress > 0 
                          ? 'Continue Learning' 
                          : 'Start Learning' 
                        : canPreview 
                        ? 'Preview Available' 
                        : `Unlock at Level ${module.unlockLevel}`
                      }
                    </span>
                  </button>

                  {/* Unlock Requirements */}
                  {!isUnlocked && !canPreview && <div className="text-xs text-slate-500 text-center pt-2">
                      Complete previous modules to unlock this content
                    </div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleSelectionScreen;
