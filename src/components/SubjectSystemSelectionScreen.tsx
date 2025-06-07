
import { useState } from "react";
import { ChevronLeft, BookOpen, Activity, CheckCircle } from "lucide-react";
import { subjects, systems, getQuestionCount } from "@/data/questionBank";

interface SubjectSystemSelectionScreenProps {
  onNavigate: (screen: string) => void;
  onSelectionComplete: (selectedSubjects: string[], selectedSystems: string[]) => void;
}

const SubjectSystemSelectionScreen = ({ onNavigate, onSelectionComplete }: SubjectSystemSelectionScreenProps) => {
  const [activeTab, setActiveTab] = useState<'subjects' | 'systems'>('subjects');
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
    <div className="p-4 pb-20 space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => onNavigate('quiz')} className="p-2">
          <ChevronLeft className="w-6 h-6 text-slate-300" />
        </button>
        <h1 className="text-xl font-bold text-white">Create Quiz</h1>
        <div className="w-10"></div>
      </div>

      {/* Selection Summary */}
      <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Your Selection</h2>
          {availableQuestions > 0 && (
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {availableQuestions} questions
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Subjects: </span>
            <span className="text-blue-400">{selectedSubjects.length} selected</span>
          </div>
          <div>
            <span className="text-slate-400">Systems: </span>
            <span className="text-green-400">{selectedSystems.length} selected</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-800 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
            activeTab === 'subjects'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Subjects</span>
            {selectedSubjects.length > 0 && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs">
                {selectedSubjects.length}
              </div>
            )}
          </div>
        </button>
        <button
          onClick={() => setActiveTab('systems')}
          className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
            activeTab === 'systems'
              ? 'bg-green-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Systems</span>
            {selectedSystems.length > 0 && (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs">
                {selectedSystems.length}
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'subjects' && (
          <>
            <h3 className="text-lg font-semibold text-slate-200">Select Subjects</h3>
            <p className="text-sm text-slate-400 mb-4">Choose medical disciplines to focus on</p>
            {subjects.map((subject) => {
              const isSelected = selectedSubjects.includes(subject);
              const questionCount = getQuestionCount([subject], selectedSystems.length > 0 ? selectedSystems : systems);
              
              return (
                <button
                  key={subject}
                  onClick={() => handleSubjectToggle(subject)}
                  className={`w-full p-4 rounded-xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-600/20 border border-blue-500'
                      : 'bg-slate-800/50 hover:bg-slate-700/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getSubjectColor(subject)} rounded-lg flex items-center justify-center`}>
                        {isSelected ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white">{subject}</h4>
                        <p className="text-sm text-slate-400">{questionCount} questions available</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-blue-500 bg-blue-600' : 'border-slate-400'
                    }`}>
                      {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </>
        )}

        {activeTab === 'systems' && (
          <>
            <h3 className="text-lg font-semibold text-slate-200">Select Body Systems</h3>
            <p className="text-sm text-slate-400 mb-4">Choose anatomical systems to study</p>
            {systems.map((system) => {
              const isSelected = selectedSystems.includes(system);
              const questionCount = getQuestionCount(selectedSubjects.length > 0 ? selectedSubjects : subjects, [system]);
              
              return (
                <button
                  key={system}
                  onClick={() => handleSystemToggle(system)}
                  className={`w-full p-4 rounded-xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-green-600/20 border border-green-500'
                      : 'bg-slate-800/50 hover:bg-slate-700/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getSystemColor(system)} rounded-lg flex items-center justify-center`}>
                        {isSelected ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Activity className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white">{system}</h4>
                        <p className="text-sm text-slate-400">{questionCount} questions available</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-green-500 bg-green-600' : 'border-slate-400'
                    }`}>
                      {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
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
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto">
          <button
            onClick={handleProceed}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg"
          >
            Start Quiz ({availableQuestions} questions)
          </button>
        </div>
      )}

      {/* Validation Message */}
      {!canProceed && (selectedSubjects.length > 0 || selectedSystems.length > 0) && (
        <div className="bg-orange-900/30 border border-orange-500/50 rounded-xl p-4">
          <p className="text-orange-300 text-sm text-center">
            {selectedSubjects.length === 0 && "Please select at least one subject"}
            {selectedSystems.length === 0 && selectedSubjects.length > 0 && "Please select at least one body system"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubjectSystemSelectionScreen;
