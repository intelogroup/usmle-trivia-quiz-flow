
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { getQuestionCount } from "@/data/questionBank";
import SelectionHeader from "./selection/SelectionHeader";
import SelectionSummary from "./selection/SelectionSummary";
import SelectionTabs from "./selection/SelectionTabs";
import SystemSelectionTab from "./selection/SystemSelectionTab";
import SubjectSelectionTab from "./selection/SubjectSelectionTab";

interface SubjectSystemSelectionScreenProps {
  onNavigate: (screen: string) => void;
  onSelectionComplete: (selectedSubjects: string[], selectedSystems: string[]) => void;
}

const SubjectSystemSelectionScreen = ({ onNavigate, onSelectionComplete }: SubjectSystemSelectionScreenProps) => {
  const [activeTab, setActiveTab] = useState<'systems' | 'subjects'>('systems');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSystemToggle = (system: string) => {
    setSelectedSystems(prev => 
      prev.includes(system)
        ? prev.filter(s => s !== system) 
        : [...prev, system]
    );
  };

  const canProceed = selectedSubjects.length > 0 && selectedSystems.length > 0;
  const availableQuestions = getQuestionCount(selectedSubjects, selectedSystems);

  const handleProceed = () => {
    if (canProceed) {
      onSelectionComplete(selectedSubjects, selectedSystems);
    }
  };

  return (
    <div className="p-3 pb-20 space-y-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen max-w-sm mx-auto">
      <SelectionHeader onNavigate={onNavigate} />
      
      <SelectionSummary 
        selectedSystems={selectedSystems}
        selectedSubjects={selectedSubjects}
        availableQuestions={availableQuestions}
      />

      <SelectionTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedSystems={selectedSystems.length}
        selectedSubjects={selectedSubjects.length}
      />

      <div className="space-y-2">
        {activeTab === 'systems' && (
          <SystemSelectionTab 
            selectedSystems={selectedSystems}
            selectedSubjects={selectedSubjects}
            onSystemToggle={handleSystemToggle}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectSelectionTab 
            selectedSubjects={selectedSubjects}
            selectedSystems={selectedSystems}
            onSubjectToggle={handleSubjectToggle}
          />
        )}
      </div>

      {canProceed && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-3">
          <button
            onClick={handleProceed}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg text-sm"
          >
            Start Quiz ({availableQuestions} questions)
          </button>
        </div>
      )}

      {!canProceed && (selectedSubjects.length > 0 || selectedSystems.length > 0) && (
        <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3">
          <p className="text-orange-300 text-xs text-center">
            {selectedSystems.length === 0 && "Please select at least one body system"}
            {selectedSubjects.length === 0 && selectedSystems.length > 0 && "Please select at least one subject"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubjectSystemSelectionScreen;
