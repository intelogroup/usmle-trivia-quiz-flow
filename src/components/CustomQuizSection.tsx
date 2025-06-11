
import { Target, Settings, ChevronRight } from "lucide-react";
import Section from "./ui/Section";

interface CustomQuizSectionProps {
  onCreateCustomQuiz: () => void;
}

const CustomQuizSection = ({ onCreateCustomQuiz }: CustomQuizSectionProps) => {
  return (
    <Section title="Create a Custom Quiz">
      <p className="text-slate-400 text-sm mb-4">
        Design your perfect study session with full control over subjects, systems, and settings
      </p>
      
      <div className="bg-slate-700/70 rounded-xl p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
            <Target className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Personalized Learning</h3>
            <p className="text-sm text-slate-400">
              Select specific subjects and body systems that match your study goals
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-600/60 rounded-lg p-3 text-center">
              <Settings className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <div className="text-white font-medium">Custom Settings</div>
              <div className="text-slate-400 text-xs">Questions, difficulty, time</div>
            </div>
            <div className="bg-slate-600/60 rounded-lg p-3 text-center">
              <Target className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <div className="text-white font-medium">Targeted Practice</div>
              <div className="text-slate-400 text-xs">Focus on weak areas</div>
            </div>
          </div>
          
          <button 
            onClick={onCreateCustomQuiz}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Configure Custom Quiz</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default CustomQuizSection;
