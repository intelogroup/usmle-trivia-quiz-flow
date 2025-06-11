
import PresetCombinations from "./PresetCombinations";
import SmartRecommendations from "./SmartRecommendations";
import CustomQuizSection from "./CustomQuizSection";
import QuickQuizSection from "./QuickQuizSection";
interface QuizScreenProps {
  onNavigate: (screen: string) => void;
  onCategorySelect: (category: string) => void;
  onPresetSelect?: (subjects: string[], systems: string[]) => void;
}
const QuizScreen = ({
  onNavigate,
  onCategorySelect,
  onPresetSelect
}: QuizScreenProps) => {
  const handleCreateCustomQuiz = () => {
    onNavigate('subject-system-selection');
  };
  const handleQuickQuizStart = (category: string) => {
    // Start quick quiz with default settings
    onCategorySelect(category);
  };
  const handlePresetSelect = (subjects: string[], systems: string[]) => {
    if (onPresetSelect) {
      onPresetSelect(subjects, systems);
    }
  };
  return <div className="p-4 pb-20 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white py-0 my-[50px]">Choose Your Study Path</h1>
        
      </div>

      {/* Custom Quiz Section */}
      <CustomQuizSection onCreateCustomQuiz={handleCreateCustomQuiz} />

      {/* Quick Quiz Section */}
      <QuickQuizSection onQuickQuizStart={handleQuickQuizStart} />

      {/* Quick Presets */}
      <PresetCombinations onPresetSelect={handlePresetSelect} />

      {/* Smart Recommendations */}
      <SmartRecommendations onRecommendationSelect={handlePresetSelect} />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700/70 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">73%</div>
          <div className="text-sm text-slate-400">Overall Progress</div>
        </div>
        <div className="bg-slate-700/70 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">12</div>
          <div className="text-sm text-slate-400">Day Streak</div>
        </div>
      </div>
    </div>;
};
export default QuizScreen;
