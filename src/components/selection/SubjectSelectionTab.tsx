
import { BookOpen, CheckCircle } from "lucide-react";
import { subjects, systems, getQuestionCount } from "@/data/questionBank";

interface SubjectSelectionTabProps {
  selectedSubjects: string[];
  selectedSystems: string[];
  onSubjectToggle: (subject: string) => void;
}

const SubjectSelectionTab = ({ 
  selectedSubjects, 
  selectedSystems, 
  onSubjectToggle 
}: SubjectSelectionTabProps) => {
  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      "Anatomy": "from-red-500 to-red-600",
      "Physiology": "from-blue-500 to-blue-600", 
      "Pathology": "from-purple-500 to-purple-600",
      "Pharmacology": "from-green-500 to-green-600",
      "Microbiology": "from-yellow-500 to-yellow-600",
      "Immunology": "from-teal-500 to-teal-600",
      "Biochemistry": "from-orange-500 to-orange-600",
      "Embryology": "from-pink-500 to-pink-600",
      "Histology": "from-indigo-500 to-indigo-600",
      "Radiology": "from-cyan-500 to-cyan-600",
      "Clinical Medicine": "from-emerald-500 to-emerald-600",
      "Surgery": "from-rose-500 to-rose-600"
    };
    return colors[subject] || "from-slate-500 to-slate-600";
  };

  return (
    <>
      <h3 className="text-base font-semibold text-slate-200">Select Subjects</h3>
      <p className="text-xs text-slate-400 mb-3">Choose specific disciplines within your selected systems</p>
      {subjects.map((subject) => {
        const isSelected = selectedSubjects.includes(subject);
        const questionCount = getQuestionCount(
          [subject], 
          selectedSystems.length > 0 ? selectedSystems : systems
        );
        
        return (
          <button
            key={subject}
            onClick={() => onSubjectToggle(subject)}
            className={`w-full p-3 rounded-lg transition-all duration-200 ${
              isSelected
                ? 'bg-blue-600/20 border border-blue-500'
                : 'bg-slate-800/50 hover:bg-slate-700/50 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`w-8 h-8 bg-gradient-to-r ${getSubjectColor(subject)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {isSelected ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-left min-w-0 flex-1">
                  <h4 className="font-semibold text-white text-sm truncate">{subject}</h4>
                  <p className="text-xs text-slate-400">{questionCount} questions</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'border-blue-500 bg-blue-600' : 'border-slate-400'
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

export default SubjectSelectionTab;
