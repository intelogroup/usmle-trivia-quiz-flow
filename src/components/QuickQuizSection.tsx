
import { BookOpen, Clock, Target, Activity } from "lucide-react";
import Section from "./ui/Section";

interface QuickQuizSectionProps {
  onQuickQuizStart: (category: string) => void;
}

const QuickQuizSection = ({ onQuickQuizStart }: QuickQuizSectionProps) => {
  // Updated to represent system-based quick quizzes with mixed subjects
  const quickQuizCategories = [
    { 
      name: "Cardiovascular System", 
      color: "from-red-500 to-pink-600",
      description: "Heart & circulation (all subjects)",
      questions: 45,
      icon: <Activity className="w-5 h-5 text-white" />
    },
    { 
      name: "Respiratory System", 
      color: "from-blue-500 to-cyan-600",
      description: "Breathing & lungs (all subjects)",
      questions: 52,
      icon: <Activity className="w-5 h-5 text-white" />
    },
    { 
      name: "Nervous System", 
      color: "from-purple-500 to-indigo-600",
      description: "Brain & nerves (all subjects)",
      questions: 38,
      icon: <Activity className="w-5 h-5 text-white" />
    },
    { 
      name: "Gastrointestinal System", 
      color: "from-green-500 to-emerald-600",
      description: "Digestive system (all subjects)",
      questions: 41,
      icon: <Activity className="w-5 h-5 text-white" />
    },
    { 
      name: "Musculoskeletal System", 
      color: "from-yellow-500 to-orange-600",
      description: "Bones & muscles (all subjects)",
      questions: 29,
      icon: <Activity className="w-5 h-5 text-white" />
    },
    { 
      name: "Endocrine System", 
      color: "from-teal-500 to-blue-600",
      description: "Hormones & glands (all subjects)",
      questions: 33,
      icon: <Activity className="w-5 h-5 text-white" />
    },
  ];

  const handleQuickStart = (categoryName: string) => {
    onQuickQuizStart(categoryName);
  };

  return (
    <Section title="Start a Quick Quiz">
      <p className="text-slate-400 text-sm mb-4">
        Jump straight into system-based practice with 10 mixed-subject questions
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {quickQuizCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleQuickStart(category.name)}
            className="bg-slate-700/70 hover:bg-slate-600/70 rounded-xl p-4 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {category.icon}
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
      
      <div className="bg-slate-700/50 rounded-lg p-3 mt-4">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Target className="w-4 h-4" />
          <span>Quick quizzes mix all subjects within the selected system: anatomy, physiology, pathology, etc.</span>
        </div>
      </div>
    </Section>
  );
};

export default QuickQuizSection;
