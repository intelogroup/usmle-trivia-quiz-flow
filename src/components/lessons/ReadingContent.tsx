
import { BookOpen, ChevronRight } from 'lucide-react';
import { Lesson } from '@/data/types';

interface ReadingContentProps {
  currentLesson: Lesson;
  currentParagraph: number;
  onNextParagraph: () => void;
}

const ReadingContent = ({ currentLesson, currentParagraph, onNextParagraph }: ReadingContentProps) => {
  if (!currentLesson.content) return null;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-xl blur-lg"></div>
      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-xl p-6 border border-slate-500/30 shadow-lg">
        {/* Content with Better Typography */}
        <div className="prose prose-invert max-w-none">
          <div className="text-base leading-relaxed text-white font-light mb-6 min-h-[100px] flex items-center">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-sm"></div>
              <p className="pl-6 text-sm leading-loose">{currentLesson.content[currentParagraph]}</p>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Dots */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {currentLesson.content.map((_, index) => (
              <div
                key={index}
                className={`relative transition-all duration-300 ${
                  index <= currentParagraph 
                    ? 'w-6 h-3' 
                    : 'w-3 h-3'
                } rounded-full ${
                  index <= currentParagraph 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm shadow-blue-500/20' 
                    : 'bg-slate-600'
                }`}
              >
                {index === currentParagraph && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="font-medium">{currentParagraph + 1} / {currentLesson.content.length}</span>
          </div>
        </div>

        {/* Enhanced Continue Button */}
        <button
          onClick={onNextParagraph}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-blue-500/20"
        >
          <span>
            {currentLesson.content && currentParagraph < currentLesson.content.length - 1 
              ? 'Continue Reading' 
              : currentLesson.quiz
              ? 'Take Knowledge Check' 
              : 'Complete Lesson'
            }
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReadingContent;
