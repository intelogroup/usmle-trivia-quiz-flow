
import { ChevronLeft } from "lucide-react";

interface SelectionHeaderProps {
  onNavigate: (screen: string) => void;
}

const SelectionHeader = ({ onNavigate }: SelectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <button onClick={() => onNavigate('quiz')} className="p-2">
        <ChevronLeft className="w-5 h-5 text-slate-300" />
      </button>
      <h1 className="text-lg font-bold text-white">Create Quiz</h1>
      <div className="w-9"></div>
    </div>
  );
};

export default SelectionHeader;
