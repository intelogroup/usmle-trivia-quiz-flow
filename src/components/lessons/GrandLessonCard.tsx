
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface GrandLessonCardProps {
  grandLesson: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    color: string;
    totalModules: number;
    completedModules: number;
    estimatedTime: string;
  };
  onClick: (grandLessonId: string) => void;
}

const GrandLessonCard: React.FC<GrandLessonCardProps> = ({ grandLesson, onClick }) => (
  <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
    <button
      onClick={() => onClick(grandLesson.id)}
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
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
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
          <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
            <div 
              className={`bg-gradient-to-r ${grandLesson.color} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(grandLesson.completedModules / grandLesson.totalModules) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  </div>
);

export default GrandLessonCard;
