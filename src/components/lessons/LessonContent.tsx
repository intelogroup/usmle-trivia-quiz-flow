
import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { LessonStep } from '@/data/lessonData';

interface LessonContentProps {
  step: LessonStep;
  onStepComplete: () => void;
}

const LessonContent = ({ step, onStepComplete }: LessonContentProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({});
  const [allAnswered, setAllAnswered] = useState(false);

  const handleAnswerSelect = (blankId: number, choiceIndex: number) => {
    const newSelectedAnswers = { ...selectedAnswers, [blankId]: choiceIndex };
    setSelectedAnswers(newSelectedAnswers);
    setShowFeedback({ ...showFeedback, [blankId]: true });

    // Check if all blanks are answered
    const totalBlanks = step.blanks.length;
    const answeredBlanks = Object.keys(newSelectedAnswers).length;
    
    if (answeredBlanks === totalBlanks) {
      setAllAnswered(true);
    }
  };

  const renderSentenceWithBlanks = () => {
    let sentence = step.sentence;
    const blanks = step.blanks.sort((a, b) => a.id - b.id);
    
    blanks.forEach((blank, index) => {
      const isAnswered = selectedAnswers[blank.id] !== undefined;
      const selectedChoice = selectedAnswers[blank.id];
      const isCorrect = selectedChoice === blank.correct;
      
      let blankContent = '';
      if (isAnswered) {
        blankContent = blank.choices[selectedChoice];
      } else {
        blankContent = `[Select ${blank.id}]`;
      }
      
      const blankElement = `<span class="inline-block min-w-[80px] text-center px-2 py-1 rounded mx-1 ${
        isAnswered 
          ? isCorrect 
            ? 'bg-green-600 text-white' 
            : 'bg-red-600 text-white'
          : 'bg-slate-600 text-slate-300 cursor-pointer hover:bg-slate-500'
      }" data-blank-id="${blank.id}">${blankContent}</span>`;
      
      sentence = sentence.replace('_____', blankElement);
    });
    
    return sentence;
  };

  return (
    <div className="space-y-6">
      {/* Image if available */}
      {step.image && (
        <div className="text-center">
          <img 
            src={step.image} 
            alt={step.imageDescription || 'Lesson illustration'}
            className="w-full max-w-sm mx-auto rounded-lg bg-slate-700"
          />
          {step.imageDescription && (
            <p className="text-sm text-slate-400 mt-2">{step.imageDescription}</p>
          )}
        </div>
      )}

      {/* Interactive sentence */}
      <div className="bg-slate-800 rounded-xl p-4 space-y-4">
        <div 
          className="text-lg leading-relaxed text-white"
          dangerouslySetInnerHTML={{ __html: renderSentenceWithBlanks() }}
        />
        
        {/* Answer choices for current blank */}
        {step.blanks.map(blank => {
          const isAnswered = selectedAnswers[blank.id] !== undefined;
          const showChoices = !isAnswered;
          
          if (!showChoices) return null;
          
          return (
            <div key={blank.id} className="space-y-2">
              <p className="text-sm text-slate-400">Choose option {blank.id}:</p>
              <div className="grid grid-cols-1 gap-2">
                {blank.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(blank.id, index)}
                    className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-colors text-white"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {Object.keys(showFeedback).map(blankId => {
        const blankIdNum = parseInt(blankId);
        const blank = step.blanks.find(b => b.id === blankIdNum);
        const selectedChoice = selectedAnswers[blankIdNum];
        const isCorrect = selectedChoice === blank?.correct;
        
        if (!blank || selectedChoice === undefined) return null;
        
        return (
          <div key={blankId} className={`p-3 rounded-lg flex items-start space-x-3 ${
            isCorrect ? 'bg-green-900/30 border border-green-600/50' : 'bg-red-900/30 border border-red-600/50'
          }`}>
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`font-medium ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </p>
              <p className="text-sm text-slate-300">{blank.explanation}</p>
              {!isCorrect && (
                <p className="text-sm text-slate-400 mt-1">
                  Correct answer: {blank.choices[blank.correct]}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Next button */}
      {allAnswered && (
        <button
          onClick={onStepComplete}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default LessonContent;
