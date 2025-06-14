
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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-700/40 rounded-2xl blur-lg"></div>
      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30 shadow-xl">
        {/* Content with Better Typography */}
        <div className="prose prose-invert max-w-none">
          <div className="text-xl leading-relaxed text-white font-light mb-8 min-h-[120px] flex items-center">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <p className="pl-4">{currentLesson.content[currentParagraph]}</p>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Dots */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            {currentLesson.content.map((_, index) => (
              <div
                key={index}
                className={`relative transition-all duration-300 ${
                  index <= currentParagraph 
                    ? 'w-8 h-3' 
                    : 'w-3 h-3'
                } rounded-full ${
                  index <= currentParagraph 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                    : 'bg-slate-600'
                }`}
              >
                {index === currentParagraph && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <BookOpen className="w-4 h-4" />
            <span>{currentParagraph + 1} / {currentLesson.content.length}</span>
          </div>
        </div>

        {/* Enhanced Continue Button */}
        <button
          onClick={onNextParagraph}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span className="text-lg">
            {currentLesson.content && currentParagraph < currentLesson.content.length - 1 
              ? 'Continue Reading' 
              : currentLesson.quiz
              ? 'Take Knowledge Check' 
              : 'Complete Lesson'
            }
          </span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ReadingContent;
