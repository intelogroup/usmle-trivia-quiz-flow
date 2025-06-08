
import { ArrowLeft, BookOpen, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ContinueStudyingScreenProps {
  onNavigate: (screen: string) => void;
}

interface UnfinishedLesson {
  id: string;
  category: string;
  subcategory: string;
  emoji: string;
  progress: number;
  lastStudied: string;
  timeSpent: string;
}

const ContinueStudyingScreen = ({ onNavigate }: ContinueStudyingScreenProps) => {
  // Mock data for unfinished lessons
  const [unfinishedLessons] = useState<UnfinishedLesson[]>([
    {
      id: '1',
      category: 'Pathology',
      subcategory: 'General Pathology',
      emoji: '🔬',
      progress: 65,
      lastStudied: '2 days ago',
      timeSpent: '25 min'
    },
    {
      id: '2',
      category: 'Anatomy',
      subcategory: 'Cardiovascular System',
      emoji: '🫀',
      progress: 40,
      lastStudied: '3 days ago',
      timeSpent: '18 min'
    },
    {
      id: '3',
      category: 'Physiology',
      subcategory: 'Cardiac Physiology',
      emoji: '⚡',
      progress: 80,
      lastStudied: '1 week ago',
      timeSpent: '32 min'
    },
    {
      id: '4',
      category: 'Pharmacology',
      subcategory: 'CNS Drugs',
      emoji: '💊',
      progress: 30,
      lastStudied: '1 week ago',
      timeSpent: '12 min'
    }
  ]);

  const handleLessonClick = (lesson: UnfinishedLesson) => {
    console.log('Continue lesson:', lesson);
    // Here you would navigate to the specific lesson content
  };

  const getProgressColor = (progress: number) => {
    if (progress < 40) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressTextColor = (progress: number) => {
    if (progress < 40) return 'text-red-400';
    if (progress < 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => onNavigate('home')}
          className="text-white hover:text-slate-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Continue Studying</h1>
          <p className="text-slate-300">Pick up where you left off</p>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">Most Recent Lesson</h3>
            <p className="text-blue-100 text-sm">
              {unfinishedLessons[0]?.category} - {unfinishedLessons[0]?.subcategory}
            </p>
            <p className="text-blue-200 text-xs">
              {unfinishedLessons[0]?.progress}% complete • Last studied {unfinishedLessons[0]?.lastStudied}
            </p>
          </div>
        </div>
        <button
          onClick={() => handleLessonClick(unfinishedLessons[0])}
          className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg mt-3 transition-colors"
        >
          Continue Learning
        </button>
      </div>

      {/* Unfinished Lessons */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Unfinished Lessons</h3>
        <div className="space-y-3">
          {unfinishedLessons.map((lesson) => (
            <div key={lesson.id} className="bg-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => handleLessonClick(lesson)}
                className="w-full p-4 text-left hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{lesson.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{lesson.category}</h4>
                    <p className="text-sm text-slate-300 truncate">{lesson.subcategory}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-xs ${getProgressTextColor(lesson.progress)}`}>
                        {lesson.progress}% complete
                      </span>
                      <span className="text-xs text-slate-400">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {lesson.timeSpent} spent
                      </span>
                      <span className="text-xs text-slate-400">
                        {lesson.lastStudied}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(lesson.progress)}`}
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Study Stats */}
      <div className="bg-slate-800 rounded-xl p-4 space-y-3">
        <h3 className="text-lg font-semibold text-white">Study Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{unfinishedLessons.length}</p>
            <p className="text-sm text-slate-400">Lessons in Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {Math.round(unfinishedLessons.reduce((acc, lesson) => acc + lesson.progress, 0) / unfinishedLessons.length)}%
            </p>
            <p className="text-sm text-slate-400">Average Progress</p>
          </div>
        </div>
      </div>

      {/* Start New Lesson */}
      <button
        onClick={() => onNavigate('learn')}
        className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl transition-colors border border-slate-600"
      >
        <div className="flex items-center justify-center space-x-2">
          <BookOpen className="w-5 h-5" />
          <span>Start New Lesson</span>
        </div>
      </button>
    </div>
  );
};

export default ContinueStudyingScreen;
