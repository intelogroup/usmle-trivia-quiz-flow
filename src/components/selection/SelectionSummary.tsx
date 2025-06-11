
interface SelectionSummaryProps {
  selectedSystems: string[];
  selectedSubjects: string[];
  availableQuestions: number;
}

const SelectionSummary = ({ 
  selectedSystems, 
  selectedSubjects, 
  availableQuestions 
}: SelectionSummaryProps) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">Your Selection</h2>
        {availableQuestions > 0 && (
          <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
            {availableQuestions} questions
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-slate-400">Systems: </span>
          <span className="text-green-400">{selectedSystems.length} selected</span>
        </div>
        <div>
          <span className="text-slate-400">Subjects: </span>
          <span className="text-blue-400">{selectedSubjects.length} selected</span>
        </div>
      </div>
    </div>
  );
};

export default SelectionSummary;
