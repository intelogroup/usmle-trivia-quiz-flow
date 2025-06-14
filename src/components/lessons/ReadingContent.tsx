
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
      <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-700/95 backdrop-blur-sm rounded-2xl p-10 border border-slate-500/40 shadow-xl">
        {/* Content with Better Typography */}
        <div className="prose prose-invert max-w-none">
          <div className="text-xl leading-relaxed text-white font-light mb-10 min-h-[140px] flex items-center">
            <div className="relative">
              <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
              <p className="pl-8 text-lg leading-loose">{currentLesson.content[currentParagraph]}</p>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Dots */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-3">
            {currentLesson.content.map((_, index) => (
              <div
                key={index}
                className={`relative transition-all duration-300 ${
                  index <= currentParagraph 
                    ? 'w-10 h-4' 
                    : 'w-4 h-4'
                } rounded-full ${
                  index <= currentParagraph 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-600'
                }`}
              >
                {index === currentParagraph && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-3 text-base text-slate-300">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="font-medium">{currentParagraph + 1} / {currentLesson.content.length}</span>
          </div>
        </div>

        {/* Enhanced Continue Button */}
        <button
          onClick={onNextParagraph}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-blue-500/30"
        >
          <span>
            {currentLesson.content && currentParagraph < currentLesson.content.length - 1 
              ? 'Continue Reading' 
              : currentLesson.quiz
              ? 'Take Knowledge Check' 
              : 'Complete Lesson'
            }
          </span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ReadingContent;
