
interface LessonProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const LessonProgress = ({ currentStep, totalSteps, onStepClick }: LessonProgressProps) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between text-base">
        <span className="text-slate-300 font-medium">Lesson Progress</span>
        <span className="text-white font-bold text-lg">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>
      
      <div className="w-full bg-slate-700/60 rounded-full h-3 shadow-inner">
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/30"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-center space-x-3">
        {Array.from({ length: totalSteps }, (_, index) => (
          <button
            key={index}
            onClick={() => onStepClick?.(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index <= currentStep 
                ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                : 'bg-slate-600'
            } ${index < currentStep ? 'cursor-pointer hover:bg-blue-400 hover:scale-110' : ''}`}
            disabled={index > currentStep}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonProgress;
