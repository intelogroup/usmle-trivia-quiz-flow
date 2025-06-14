import { useState } from 'react';
import { ArrowLeft, Lock, CheckCircle, Clock, BookOpen, ChevronRight, Trophy, Target } from 'lucide-react';
import GrandLessonDetail from "./GrandLessonDetail";
import GrandLessonCard from "./GrandLessonCard";
import LearningProgressHeader from "./LearningProgressHeader";

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
    setSelectedGrandLesson(grandLessonId);
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

  const selectedLessonData = selectedGrandLesson
    ? grandLessons.find((gl) => gl.id === selectedGrandLesson)
    : null;

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() =>
            selectedGrandLesson ? setSelectedGrandLesson(null) : onNavigate("learn")
          }
          className="text-white hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">
            {selectedLessonData ? selectedLessonData.title : "Grand Lessons"}
          </h1>
          <p className="text-slate-300 text-sm">
            {selectedLessonData
              ? selectedLessonData.description
              : "Comprehensive learning paths for medical mastery"}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Trophy className="w-5 h-5 fill-current" />
            <span className="font-bold">4.2k</span>
          </div>
          <div className="text-xs text-slate-400">Total XP</div>
        </div>
      </div>
      {selectedLessonData ? (
        <GrandLessonDetail
          grandLesson={selectedLessonData}
          onBack={() => setSelectedGrandLesson(null)}
          onModuleClick={handleModuleClick}
          getDifficultyColor={getDifficultyColor}
        />
      ) : (
        <>
          <LearningProgressHeader />
          <div className="space-y-4">
            {grandLessons.map((grandLesson) => (
              <GrandLessonCard
                key={grandLesson.id}
                grandLesson={grandLesson}
                onClick={handleGrandLessonClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GrandLessonScreen;
