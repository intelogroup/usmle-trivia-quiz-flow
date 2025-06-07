
import { ChevronRight, Target } from "lucide-react";

interface QuizScreenProps {
  onNavigate: (screen: string) => void;
  onCategorySelect: (category: string) => void;
}

const QuizScreen = ({ onNavigate, onCategorySelect }: QuizScreenProps) => {
  const categories = [
    { name: "Miscellaneous (Multisystem)", questions: 6, difficulty: 3 },
    { name: "System", questions: 0, difficulty: 3 },
    { name: "Allergy & Immunology", questions: 0, difficulty: 3 },
    { name: "General Principles", questions: 0, difficulty: 3 },
    { name: "Biochemistry (General Principles)", questions: 0, difficulty: 3 },
    { name: "Subject", questions: 0, difficulty: 3 },
    { name: "Anatomy", questions: 7, difficulty: 3 },
    { name: "Behavioral science", questions: 0, difficulty: 3 },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Choose Your Challenge 🎯</h1>
          <p className="text-slate-300">Pick a topic and test your knowledge! 🧠✨</p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors flex items-center space-x-2 mx-auto">
          <span>✨</span>
          <span>Ready to level up?</span>
          <span>🚀</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="space-y-3">
            {index === 0 && <h3 className="text-lg font-semibold">System</h3>}
            {index === 3 && <h3 className="text-lg font-semibold">General Principles</h3>}
            {index === 5 && <h3 className="text-lg font-semibold">Subject</h3>}
            
            <button
              onClick={() => onCategorySelect(category.name)}
              className="w-full bg-slate-800 hover:bg-slate-700 rounded-xl p-4 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                    📚
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold">{category.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <span>{category.questions} Questions</span>
                      <span>📝</span>
                    </div>
                    <p className="text-sm text-slate-400">Ready for the challenge? 🎯</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className="text-blue-400">⭐</span>
                    ))}
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizScreen;
