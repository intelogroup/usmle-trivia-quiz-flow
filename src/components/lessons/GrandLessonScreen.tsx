
import { useState } from 'react';
import { ArrowLeft, Lock, CheckCircle, Clock, BookOpen, ChevronRight, Trophy, Target } from 'lucide-react';

interface GrandLessonScreenProps {
  onNavigate: (screen: string) => void;
  onGrandLessonSelect: (grandLessonId: string) => void;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  duration: string;
  isLocked: boolean;
  progress: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface GrandLesson {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  totalModules: number;
  completedModules: number;
  totalXP: number;
  earnedXP: number;
  estimatedTime: string;
  modules: Module[];
}

const GrandLessonScreen = ({ onNavigate, onGrandLessonSelect }: GrandLessonScreenProps) => {
  const [selectedGrandLesson, setSelectedGrandLesson] = useState<string | null>(null);

  const grandLessons: GrandLesson[] = [
    {
      id: 'foundations',
      title: 'Medical Foundations',
      subtitle: 'Build Your Core Knowledge',
      description: 'Master the fundamental concepts that form the backbone of medical practice',
      icon: '🏗️',
      color: 'from-blue-600 to-cyan-600',
      totalModules: 8,
      completedModules: 3,
      totalXP: 1200,
      earnedXP: 450,
      estimatedTime: '6-8 hours',
      modules: [
        {
          id: 'anatomy-basics',
          title: 'Human Anatomy Basics',
          description: 'Essential anatomical structures and systems',
          lessonCount: 12,
          duration: '2.5 hours',
          isLocked: false,
          progress: 100,
          difficulty: 'Beginner'
        },
        {
          id: 'physiology-intro',
          title: 'Introduction to Physiology',
          description: 'How body systems work together',
          lessonCount: 10,
          duration: '2 hours',
          isLocked: false,
          progress: 75,
          difficulty: 'Beginner'
        },
        {
          id: 'cell-biology',
          title: 'Cell Biology & Genetics',
          description: 'Cellular processes and genetic principles',
          lessonCount: 8,
          duration: '1.5 hours',
          isLocked: false,
          progress: 0,
          difficulty: 'Intermediate'
        },
        {
          id: 'biochemistry',
          title: 'Medical Biochemistry',
          description: 'Chemical processes in living organisms',
          lessonCount: 15,
          duration: '3 hours',
          isLocked: true,
          progress: 0,
          difficulty: 'Intermediate'
        }
      ]
    },
    {
      id: 'clinical-skills',
      title: 'Clinical Skills',
      subtitle: 'Master Patient Care',
      description: 'Develop essential skills for effective patient assessment and treatment',
      icon: '🩺',
      color: 'from-green-600 to-emerald-600',
      totalModules: 6,
      completedModules: 1,
      totalXP: 900,
      earnedXP: 150,
      estimatedTime: '8-10 hours',
      modules: [
        {
          id: 'history-taking',
          title: 'History Taking',
          description: 'Comprehensive patient history techniques',
          lessonCount: 8,
          duration: '2 hours',
          isLocked: false,
          progress: 100,
          difficulty: 'Beginner'
        },
        {
          id: 'physical-exam',
          title: 'Physical Examination',
          description: 'Systematic approach to patient examination',
          lessonCount: 12,
          duration: '3 hours',
          isLocked: false,
          progress: 25,
          difficulty: 'Intermediate'
        },
        {
          id: 'diagnostic-skills',
          title: 'Diagnostic Reasoning',
          description: 'Clinical decision-making and differential diagnosis',
          lessonCount: 10,
          duration: '2.5 hours',
          isLocked: true,
          progress: 0,
          difficulty: 'Advanced'
        }
      ]
    },
    {
      id: 'pathology',
      title: 'Disease & Pathology',
      subtitle: 'Understanding Disease',
      description: 'Comprehensive study of disease processes and pathological mechanisms',
      icon: '🔬',
      color: 'from-purple-600 to-violet-600',
      totalModules: 10,
      completedModules: 0,
      totalXP: 1500,
      earnedXP: 0,
      estimatedTime: '12-15 hours',
      modules: [
        {
          id: 'general-pathology',
          title: 'General Pathology',
          description: 'Basic principles of disease processes',
          lessonCount: 14,
          duration: '3.5 hours',
          isLocked: true,
          progress: 0,
          difficulty: 'Intermediate'
        },
        {
          id: 'infectious-diseases',
          title: 'Infectious Diseases',
          description: 'Bacterial, viral, and parasitic infections',
          lessonCount: 16,
          duration: '4 hours',
          isLocked: true,
          progress: 0,
          difficulty: 'Intermediate'
        }
      ]
    },
    {
      id: 'pharmacology',
      title: 'Pharmacology',
      subtitle: 'Drug Mechanisms & Therapy',
      description: 'Master drug actions, interactions, and therapeutic applications',
      icon: '💊',
      color: 'from-red-600 to-pink-600',
      totalModules: 7,
      completedModules: 0,
      totalXP: 1100,
      earnedXP: 0,
      estimatedTime: '10-12 hours',
      modules: [
        {
          id: 'pharmacokinetics',
          title: 'Pharmacokinetics',
          description: 'Drug absorption, distribution, and elimination',
          lessonCount: 10,
          duration: '2.5 hours',
          isLocked: true,
          progress: 0,
          difficulty: 'Advanced'
        }
      ]
    }
  ];

  const handleGrandLessonClick = (grandLessonId: string) => {
    if (selectedGrandLesson === grandLessonId) {
      setSelectedGrandLesson(null);
    } else {
      setSelectedGrandLesson(grandLessonId);
    }
  };

  const handleModuleClick = (moduleId: string, isLocked: boolean) => {
    if (!isLocked) {
      onGrandLessonSelect(moduleId);
    }
  };

  const getDifficultyColor = (difficulty: string, isLocked: boolean) => {
    if (isLocked) {
      return 'text-slate-600 bg-slate-700/30 border-slate-700/30';
    }
    
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

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button onClick={() => onNavigate('learn')} className="text-white hover:text-slate-300 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Grand Lessons</h1>
          <p className="text-slate-300 text-sm">Comprehensive learning paths for medical mastery</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Trophy className="w-5 h-5 fill-current" />
            <span className="font-bold">4.2k</span>
          </div>
          <div className="text-xs text-slate-400">Total XP</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Learning Progress</h2>
          <div className="flex items-center space-x-1 text-blue-400">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Level 3</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600/20 border border-green-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-xl font-bold text-green-400">4</div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-blue-400">8</div>
            <div className="text-xs text-slate-400">In Progress</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-600/20 border border-slate-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6 text-slate-400" />
            </div>
            <div className="text-xl font-bold text-slate-400">19</div>
            <div className="text-xs text-slate-400">Locked</div>
          </div>
        </div>
      </div>

      {/* Grand Lessons */}
      <div className="space-y-4">
        {grandLessons.map((grandLesson) => (
          <div key={grandLesson.id} className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            {/* Grand Lesson Header */}
            <button
              onClick={() => handleGrandLessonClick(grandLesson.id)}
              className="w-full p-6 text-left hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${grandLesson.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                  {grandLesson.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{grandLesson.title}</h3>
                      <p className="text-sm text-blue-400 font-medium mb-2">{grandLesson.subtitle}</p>
                      <p className="text-sm text-slate-300">{grandLesson.description}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${
                      selectedGrandLesson === grandLesson.id ? 'rotate-90' : ''
                    }`} />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">{grandLesson.completedModules}/{grandLesson.totalModules}</div>
                      <div className="text-xs text-slate-400">Modules</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-400">{grandLesson.estimatedTime}</div>
                      <div className="text-xs text-slate-400">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-400">{Math.round((grandLesson.completedModules / grandLesson.totalModules) * 100)}%</div>
                      <div className="text-xs text-slate-400">Complete</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                    <div 
                      className={`bg-gradient-to-r ${grandLesson.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(grandLesson.completedModules / grandLesson.totalModules) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </button>

            {/* Modules List */}
            {selectedGrandLesson === grandLesson.id && (
              <div className="border-t border-slate-700/50 bg-slate-900/30">
                <div className="p-4 space-y-3">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Available Modules</h4>
                  {grandLesson.modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => handleModuleClick(module.id, module.isLocked)}
                      disabled={module.isLocked}
                      className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                        module.isLocked 
                          ? 'bg-slate-800/20 border-slate-700/20 cursor-not-allowed opacity-50'
                          : module.progress === 100
                          ? 'bg-gradient-to-r from-green-600/20 to-green-500/10 border-green-600/30 hover:border-green-500/50'
                          : module.progress > 0
                          ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-blue-600/30 hover:border-blue-500/50 hover:scale-[1.02]'
                          : 'bg-gradient-to-r from-slate-700/30 to-slate-600/20 border-slate-600/30 hover:border-slate-500/50 hover:scale-[1.02]'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Status Icon */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          module.isLocked
                            ? 'bg-slate-700/30 text-slate-500'
                            : module.progress === 100
                            ? 'bg-green-600/20 text-green-400'
                            : module.progress > 0
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'bg-slate-600/20 text-slate-400'
                        }`}>
                          {module.isLocked ? (
                            <Lock className="w-5 h-5" />
                          ) : module.progress === 100 ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <BookOpen className="w-5 h-5" />
                          )}
                        </div>

                        {/* Module Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h5 className={`font-medium ${module.isLocked ? 'text-slate-500' : 'text-white'}`}>
                              {module.title}
                            </h5>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(module.difficulty, module.isLocked)}`}>
                              {module.difficulty}
                            </div>
                          </div>
                          <p className={`text-sm mb-2 ${module.isLocked ? 'text-slate-600' : 'text-slate-300'}`}>
                            {module.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs">
                              <div className={`flex items-center space-x-1 ${module.isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                                <BookOpen className="w-3 h-3" />
                                <span>{module.lessonCount} lessons</span>
                              </div>
                              <div className={`flex items-center space-x-1 ${module.isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                                <Clock className="w-3 h-3" />
                                <span>{module.duration}</span>
                              </div>
                            </div>
                            
                            {module.progress > 0 && !module.isLocked && (
                              <div className="text-xs text-slate-400">
                                {module.progress}% complete
                              </div>
                            )}
                          </div>

                          {/* Progress Bar for non-locked modules */}
                          {!module.isLocked && module.progress > 0 && (
                            <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                  module.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${module.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrandLessonScreen;
