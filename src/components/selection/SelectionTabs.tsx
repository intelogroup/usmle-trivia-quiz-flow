
import { BookOpen, Activity } from "lucide-react";

interface SelectionTabsProps {
  activeTab: 'systems' | 'subjects';
  onTabChange: (tab: 'systems' | 'subjects') => void;
  selectedSystems: number;
  selectedSubjects: number;
}

const SelectionTabs = ({ 
  activeTab, 
  onTabChange, 
  selectedSystems, 
  selectedSubjects 
}: SelectionTabsProps) => {
  return (
    <div className="flex bg-slate-800 rounded-lg p-0.5 w-full">
      <button
        onClick={() => onTabChange('systems')}
        className={`flex-1 py-2 px-2 rounded-md transition-colors ${
          activeTab === 'systems'
            ? 'bg-green-600 text-white'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <div className="flex items-center justify-center space-x-1.5">
          <Activity className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-sm font-medium">Systems</span>
          {selectedSystems > 0 && (
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              {selectedSystems}
            </div>
          )}
        </div>
      </button>
      <button
        onClick={() => onTabChange('subjects')}
        className={`flex-1 py-2 px-2 rounded-md transition-colors ${
          activeTab === 'subjects'
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <div className="flex items-center justify-center space-x-1.5">
          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-sm font-medium">Subjects</span>
          {selectedSubjects > 0 && (
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              {selectedSubjects}
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default SelectionTabs;
