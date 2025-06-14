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
  return <div className="space-y-3 mb-6 my-[30px]">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400 font-medium">Lesson Progress</span>
        <span className="text-white font-medium">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>
      
      <div className="w-full bg-slate-700/50 rounded-full h-2 shadow-inner">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500 shadow-sm shadow-blue-500/20" style={{
        width: `${progressPercentage}%`
      }} />
      </div>
      
      <div className="flex justify-center space-x-2">
        {Array.from({
        length: totalSteps
      }, (_, index) => <button key={index} onClick={() => onStepClick?.(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index <= currentStep ? 'bg-blue-500 shadow-sm shadow-blue-500/30' : 'bg-slate-600'} ${index < currentStep ? 'cursor-pointer hover:bg-blue-400 hover:scale-110' : ''}`} disabled={index > currentStep} />)}
      </div>
    </div>;
};
export default LessonProgress;