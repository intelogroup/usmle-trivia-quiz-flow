
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen, Lock, CheckCircle, Eye } from 'lucide-react';
import { getModulesBySystem, getUserProgress, getUnlockedLevel, LessonModule } from '@/data/moduleData';

interface ModuleSelectionScreenProps {
  system: string;
  onNavigate: (screen: string) => void;
  onModuleSelect: (moduleId: string) => void;
}

const ModuleSelectionScreen = ({ system, onNavigate, onModuleSelect }: ModuleSelectionScreenProps) => {
  const [modules, setModules] = useState<LessonModule[]>([]);
  const [userProgress, setUserProgress] = useState<any>({});
  const [unlockedLevel, setUnlockedLevel] = useState(0);

  useEffect(() => {
    const systemModules = getModulesBySystem(system);
    setModules(systemModules);
    setUserProgress(getUserProgress());
    setUnlockedLevel(getUnlockedLevel());
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
    return Math.round((progress.completedLessons / modules.find(m => m.id === moduleId)?.lessons.length || 1) * 100);
  };

  const canPreviewModule = (module: LessonModule) => {
    return module.previewAvailable && !isModuleUnlocked(module);
  };

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button onClick={() => onNavigate('learn')} className="text-white hover:text-slate-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">{system}</h1>
          <p className="text-slate-300">Choose a module to begin learning</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
        <h2 className="text-lg font-semibold text-white">Your Progress</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">
              {Object.values(userProgress).filter((p: any) => p.completed).length}
            </div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">{unlockedLevel}</div>
            <div className="text-xs text-slate-400">Level</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {modules.filter(m => isModuleUnlocked(m)).length}
            </div>
            <div className="text-xs text-slate-400">Unlocked</div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Available Modules</h2>
        
        {modules.map((module) => {
          const isUnlocked = isModuleUnlocked(module);
          const isCompleted = isModuleCompleted(module.id);
          const canPreview = canPreviewModule(module);
          const progress = getModuleProgress(module.id);

          return (
            <div
              key={module.id}
              className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                isUnlocked
                  ? 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-750'
                  : canPreview
                  ? 'bg-slate-800/30 border-slate-600/50 hover:border-slate-500/70'
                  : 'bg-slate-800/20 border-slate-600/30'
              }`}
            >
              {/* Level Badge */}
              <div className="absolute top-3 right-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isCompleted
                    ? 'bg-green-600 text-white'
                    : isUnlocked
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-600 text-slate-300'
                }`}>
                  Level {module.level}
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Module Header */}
                <div className="flex items-start space-x-3">
                  <div className={`text-2xl ${!isUnlocked && !canPreview ? 'grayscale opacity-50' : ''}`}>
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-semibold ${
                        isUnlocked ? 'text-white' : 'text-slate-400'
                      }`}>
                        {module.title}
                      </h3>
                      {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {!isUnlocked && !canPreview && <Lock className="w-4 h-4 text-slate-500" />}
                      {canPreview && <Eye className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className={`text-sm ${
                      isUnlocked ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Module Stats */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-400">{module.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-400">{module.estimatedTime} min</span>
                    </div>
                  </div>
                  <div className="text-slate-400">{module.subject}</div>
                </div>

                {/* Progress Bar */}
                {isUnlocked && progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-white">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => {
                    if (isUnlocked || canPreview) {
                      onModuleSelect(module.id);
                    }
                  }}
                  disabled={!isUnlocked && !canPreview}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isUnlocked
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                      : canPreview
                      ? 'bg-slate-700 hover:bg-slate-600 text-blue-400 border border-blue-500/30'
                      : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isCompleted
                    ? 'Review Module'
                    : isUnlocked
                    ? progress > 0
                      ? 'Continue Module'
                      : 'Start Module'
                    : canPreview
                    ? 'Preview Module'
                    : `Unlock at Level ${module.unlockLevel}`
                  }
                </button>

                {/* Unlock Requirements */}
                {!isUnlocked && !canPreview && (
                  <div className="text-xs text-slate-500 text-center">
                    Complete Level {module.unlockLevel - 1} modules to unlock
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleSelectionScreen;
