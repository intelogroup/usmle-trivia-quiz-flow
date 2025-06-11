
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface LessonFiltersProps {
  onFilterSelect: (system: string, subject: string) => void;
}

const LessonFilters = ({ onFilterSelect }: LessonFiltersProps) => {
  const [expandedSystem, setExpandedSystem] = useState<string | null>(null);

  const systemsWithSubjects = {
    'Cardiovascular System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Respiratory System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Nervous System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Musculoskeletal System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Digestive System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Urogenital System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Endocrine System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Integumentary System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Immune System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Hematologic System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Lymphatic System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology'],
    'Reproductive System': ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology']
  };

  const toggleSystem = (system: string) => {
    setExpandedSystem(expandedSystem === system ? null : system);
  };

  const handleSubjectSelect = (system: string, subject: string) => {
    onFilterSelect(system, subject);
  };

  return (
    <div className="space-y-3">
      {Object.entries(systemsWithSubjects).map(([system, subjects]) => (
        <div key={system} className="bg-slate-800 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSystem(system)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">🫀</span>
              <h3 className="font-semibold text-white">{system}</h3>
            </div>
            {expandedSystem === system ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </button>
          
          {expandedSystem === system && (
            <div className="border-t border-slate-700">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => handleSubjectSelect(system, subject)}
                  className="w-full p-3 pl-6 text-left hover:bg-slate-700 transition-colors text-slate-300 border-b border-slate-700 last:border-b-0"
                >
                  {subject}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LessonFilters;
