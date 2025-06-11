
import { useState } from "react";
import { ChevronLeft, BookOpen, Activity, CheckCircle } from "lucide-react";
import { subjects, systems, getQuestionCount } from "@/data/questionBank";

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
    <div className="p-3 pb-20 space-y-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => onNavigate('quiz')} className="p-2">
          <ChevronLeft className="w-5 h-5 text-slate-300" />
        </button>
        <h1 className="text-lg font-bold text-white">Create Quiz</h1>
        <div className="w-9"></div>
      </div>

      {/* Selection Summary */}
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

      {/* Tabs - Systems first */}
      <div className="flex bg-slate-800 rounded-lg p-0.5 w-full">
        <button
          onClick={() => setActiveTab('systems')}
          className={`flex-1 py-2 px-2 rounded-md transition-colors ${
            activeTab === 'systems'
              ? 'bg-green-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-sm font-medium">Systems</span>
            {selectedSystems.length > 0 && (
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                {selectedSystems.length}
              </div>
            )}
          </div>
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex-1 py-2 px-2 rounded-md transition-colors ${
            activeTab === 'subjects'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-sm font-medium">Subjects</span>
            {selectedSubjects.length > 0 && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                {selectedSubjects.length}
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Content - Systems first */}
      <div className="space-y-2">
        {activeTab === 'systems' && (
          <>
            <h3 className="text-base font-semibold text-slate-200">Select Body Systems</h3>
            <p className="text-xs text-slate-400 mb-3">Choose anatomical systems as your primary focus</p>
            {systems.map((system) => {
              const isSelected = selectedSystems.includes(system);
              const questionCount = getQuestionCount(selectedSubjects.length > 0 ? selectedSubjects : subjects, [system]);
              
              return (
                <button
                  key={system}
                  onClick={() => handleSystemToggle(system)}
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
        )}

        {activeTab === 'subjects' && (
          <>
            <h3 className="text-base font-semibold text-slate-200">Select Subjects</h3>
            <p className="text-xs text-slate-400 mb-3">Choose specific disciplines within your selected systems</p>
            {subjects.map((subject) => {
              const isSelected = selectedSubjects.includes(subject);
              const questionCount = getQuestionCount([subject], selectedSystems.length > 0 ? selectedSystems : systems);
              
              return (
                <button
                  key={subject}
                  onClick={() => handleSubjectToggle(subject)}
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
        )}
      </div>

      {/* Start Quiz Button */}
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

      {/* Validation Message */}
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
