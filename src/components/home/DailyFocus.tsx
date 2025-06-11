
import React from 'react';
import { Brain, RotateCcw } from 'lucide-react';
import { getWeakestSubjects } from '@/utils/dataStore';
import { getUserProgress } from '@/utils/storageUtils';

interface DailyFocusProps {
  onNavigate: (screen: string) => void;
}

const DailyFocus = ({ onNavigate }: DailyFocusProps) => {
  const weakestSubjects = getWeakestSubjects();
  const userProgress = getUserProgress();

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      'Pathology': '🧬',
      'Physiology': '🫀',
      'Anatomy': '🦴',
      'Pharmacology': '💊',
      'Microbiology': '🦠',
      'Immunology': '🛡️'
    };
    return icons[subject] || '📚';
  };

  const getSubjectColor = (score: number) => {
    if (score < 70) return 'bg-red-500';
    if (score < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center">
        <Brain className="w-6 h-6 mr-2 text-blue-400" />
        Daily Focus
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weakest Subjects */}
        {weakestSubjects.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Areas for Improvement</h3>
            <div className="space-y-2">
              {weakestSubjects.slice(0, 2).map((subject, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${getSubjectColor(subject.score)} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-xs">{getSubjectIcon(subject.subject)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{subject.subject}</h4>
                      <p className="text-xs text-slate-400">{subject.score}% avg</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('category')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs transition-colors"
                  >
                    Practice
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Mistakes */}
        {userProgress.totalQuizzes > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <RotateCcw className="w-5 h-5 mr-2 text-blue-400" />
              Review Mistakes
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white text-sm">{Math.max(userProgress.totalQuestions - userProgress.totalCorrect, 0)} questions</p>
                  <p className="text-xs text-slate-400">Need review</p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm">🔄</span>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('review')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors"
              >
                Start Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyFocus;
