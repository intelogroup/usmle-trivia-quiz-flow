
interface LessonProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const LessonProgress = ({
  currentStep,
  totalSteps,
  onStepClick
}: LessonProgressProps) => {
  const progressPercentage = (currentStep + 1) / totalSteps * 100;
  
  // Simulate average user progress - typically around 60-70% of current lesson
  const averageProgress = Math.min(((currentStep + 1) * 0.65) / totalSteps * 100, 100);
  
  return (
    <div className="space-y-3 mb-6 my-[30px]">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400 font-medium">Lesson Progress</span>
        <span className="text-white font-medium">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>
      
      <div className="relative w-full bg-slate-700/50 rounded-full h-2 shadow-inner">
        {/* Main progress bar */}
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500 shadow-sm shadow-blue-500/20" 
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Average progress indicator line */}
        <div 
          className="absolute top-0 h-2 w-0.5 bg-purple-400 rounded-full shadow-sm transition-all duration-500"
          style={{ left: `${averageProgress}%` }}
          title={`Average user progress: ${Math.round(averageProgress)}%`}
        />
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            <span className="text-slate-400">Your progress</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-0.5 h-2 bg-purple-400 rounded-full" />
            <span className="text-slate-400">Average user</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <button 
            key={index} 
            onClick={() => onStepClick?.(index)} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index <= currentStep 
                ? 'bg-blue-500 shadow-sm shadow-blue-500/30' 
                : 'bg-slate-600'
            } ${
              index < currentStep 
                ? 'cursor-pointer hover:bg-blue-400 hover:scale-110' 
                : ''
            }`} 
            disabled={index > currentStep} 
          />
        ))}
      </div>
    </div>
  );
};

export default LessonProgress;
