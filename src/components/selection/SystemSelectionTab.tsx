
import { Activity, CheckCircle } from "lucide-react";
import { systems, getQuestionCount } from "@/data/questionBank";

interface SystemSelectionTabProps {
  selectedSystems: string[];
  selectedSubjects: string[];
  onSystemToggle: (system: string) => void;
}

const SystemSelectionTab = ({ 
  selectedSystems, 
  selectedSubjects, 
  onSystemToggle 
}: SystemSelectionTabProps) => {
  const getSystemColor = (system: string) => {
    const colors: { [key: string]: string } = {
      "Cardiovascular System": "from-red-500 to-red-600",
      "Respiratory System": "from-blue-500 to-blue-600",
      "Nervous System": "from-purple-500 to-purple-600", 
      "Musculoskeletal System": "from-orange-500 to-orange-600",
      "Gastrointestinal System": "from-green-500 to-green-600",
      "Genitourinary System": "from-yellow-500 to-yellow-600",
      "Endocrine System": "from-pink-500 to-pink-600",
      "Reproductive System": "from-rose-500 to-rose-600",
      "Integumentary System": "from-amber-500 to-amber-600",
      "Hematologic System": "from-red-600 to-red-700",
      "Immune System": "from-teal-500 to-teal-600",
      "Sensory Systems": "from-indigo-500 to-indigo-600"
    };
    return colors[system] || "from-slate-500 to-slate-600";
  };

  return (
    <>
      <h3 className="text-base font-semibold text-slate-200">Select Body Systems</h3>
      <p className="text-xs text-slate-400 mb-3">Choose anatomical systems as your primary focus</p>
      {systems.map((system) => {
        const isSelected = selectedSystems.includes(system);
        const questionCount = getQuestionCount(
          selectedSubjects.length > 0 ? selectedSubjects : ["Anatomy", "Physiology", "Pathology", "Pharmacology", "Microbiology", "Immunology", "Biochemistry", "Embryology", "Histology", "Radiology", "Clinical Medicine", "Surgery"], 
          [system]
        );
        
        return (
          <button
            key={system}
            onClick={() => onSystemToggle(system)}
            className={`w-full p-3 rounded-lg transition-all duration-200 ${
              isSelected
                ? 'bg-green-600/20 border border-green-500'
                : 'bg-slate-800/50 hover:bg-slate-700/50 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`w-8 h-8 bg-gradient-to-r ${getSystemColor(system)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {isSelected ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Activity className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-left min-w-0 flex-1">
                  <h4 className="font-semibold text-white text-sm truncate">{system}</h4>
                  <p className="text-xs text-slate-400">{questionCount} questions</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'border-green-500 bg-green-600' : 'border-slate-400'
              }`}>
                {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
};

export default SystemSelectionTab;
