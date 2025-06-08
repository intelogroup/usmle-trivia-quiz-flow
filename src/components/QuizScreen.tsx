
import { ChevronRight, Target, BookOpen, Users, Zap } from "lucide-react";
import PresetCombinations from "./PresetCombinations";
import SmartRecommendations from "./SmartRecommendations";

interface QuizScreenProps {
  onNavigate: (screen: string) => void;
  onCategorySelect: (category: string) => void;
  onPresetSelect?: (subjects: string[], systems: string[]) => void;
}

const QuizScreen = ({ onNavigate, onCategorySelect, onPresetSelect }: QuizScreenProps) => {
  const categories = [
    { 
      name: "Anatomy", 
      questions: 45, 
      difficulty: 3, 
      color: "from-red-500 to-pink-600",
      description: "Human body structure",
      completion: 85
    },
    { 
      name: "Physiology", 
      questions: 52, 
      difficulty: 3, 
      color: "from-blue-500 to-cyan-600",
      description: "Body functions & processes",
      completion: 72
    },
    { 
      name: "Pathology", 
      questions: 38, 
      difficulty: 4, 
      color: "from-purple-500 to-indigo-600",
      description: "Disease mechanisms",
      completion: 45
    },
    { 
      name: "Pharmacology", 
      questions: 41, 
      difficulty: 4, 
      color: "from-green-500 to-emerald-600",
      description: "Drug actions & effects",
      completion: 60
    },
    { 
      name: "Microbiology", 
      questions: 29, 
      difficulty: 3, 
      color: "from-yellow-500 to-orange-600",
      description: "Microorganisms & infections",
      completion: 38
    },
    { 
      name: "Immunology", 
      questions: 33, 
      difficulty: 4, 
      color: "from-teal-500 to-blue-600",
      description: "Immune system responses",
      completion: 92
    },
  ];

  const handleCreateCustomQuiz = () => {
    onNavigate('subject-system-selection');
  };

  const handlePresetSelect = (subjects: string[], systems: string[]) => {
    if (onPresetSelect) {
      onPresetSelect(subjects, systems);
    }
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-app-primary">Quiz Categories</h1>
        <p className="text-app-muted">Choose your practice area</p>
      </div>

      {/* Quick Presets */}
      <PresetCombinations onPresetSelect={handlePresetSelect} />

      {/* Smart Recommendations */}
      <SmartRecommendations onRecommendationSelect={handlePresetSelect} />

      {/* Create Custom Quiz */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto">
            <Target className="w-6 h-6 text-app-primary" />
          </div>
          <h3 className="text-lg font-semibold text-app-primary">Custom Quiz</h3>
          <p className="text-sm text-app-muted">Select specific subjects and systems</p>
          <button 
            onClick={handleCreateCustomQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-app-primary py-3 rounded-lg font-medium transition-colors"
          >
            Create Custom Quiz
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl p-4 text-center border border-border">
          <div className="text-2xl font-bold text-blue-400">73%</div>
          <div className="text-sm text-app-muted">Overall Progress</div>
        </div>
        <div className="bg-card rounded-xl p-4 text-center border border-border">
          <div className="text-2xl font-bold text-green-400">12</div>
          <div className="text-sm text-app-muted">Day Streak</div>
        </div>
      </div>

      {/* Legacy Categories */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-app-primary">Browse by Subject</h3>
        
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category.name)}
            className="w-full bg-card hover:bg-accent rounded-xl p-4 transition-colors border border-border"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                  <BookOpen className="w-6 h-6 text-app-primary" />
                </div>
                
                <div className="text-left">
                  <h4 className="font-semibold text-app-primary">{category.name}</h4>
                  <p className="text-sm text-app-muted">{category.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-app-muted mt-1">
                    <span>{category.questions} Questions</span>
                    <span>{category.completion}% Complete</span>
                  </div>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-app-muted" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizScreen;
