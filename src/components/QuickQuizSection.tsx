
import { BookOpen, Clock, Target } from "lucide-react";
import Section from "./ui/Section";

interface QuickQuizSectionProps {
  onQuickQuizStart: (category: string) => void;
}

const QuickQuizSection = ({ onQuickQuizStart }: QuickQuizSectionProps) => {
  const quickQuizCategories = [
    { 
      name: "Anatomy", 
      color: "from-red-500 to-pink-600",
      description: "Human body structure",
      questions: 45
    },
    { 
      name: "Physiology", 
      color: "from-blue-500 to-cyan-600",
      description: "Body functions & processes",
      questions: 52
    },
    { 
      name: "Pathology", 
      color: "from-purple-500 to-indigo-600",
      description: "Disease mechanisms",
      questions: 38
    },
    { 
      name: "Pharmacology", 
      color: "from-green-500 to-emerald-600",
      description: "Drug actions & effects",
      questions: 41
    },
    { 
      name: "Microbiology", 
      color: "from-yellow-500 to-orange-600",
      description: "Microorganisms & infections",
      questions: 29
    },
    { 
      name: "Immunology", 
      color: "from-teal-500 to-blue-600",
      description: "Immune system responses",
      questions: 33
    },
  ];

  const handleQuickStart = (categoryName: string) => {
    onQuickQuizStart(categoryName);
  };

  return (
    <Section title="Start a Quick Quiz">
      <p className="text-slate-400 text-sm mb-4">
        Jump straight into practice with 10 mixed-difficulty questions
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {quickQuizCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleQuickStart(category.name)}
            className="bg-slate-800/50 hover:bg-slate-700/50 rounded-xl p-4 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-white text-sm truncate">{category.name}</h4>
                <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>~12 min</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="bg-slate-800/30 rounded-lg p-3 mt-4">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Target className="w-4 h-4" />
          <span>Quick quizzes use default settings: 10 questions, mixed difficulty, no time limit</span>
        </div>
      </div>
    </Section>
  );
};

export default QuickQuizSection;
