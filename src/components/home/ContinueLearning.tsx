
import { Activity } from "lucide-react";

interface ContinueLearningProps {
  onNavigate: (screen: string) => void;
}

const ContinueLearning = ({ onNavigate }: ContinueLearningProps) => {
  const handleContinueStudying = () => {
    console.log('Continue Studying button clicked - navigating to continue-studying');
    onNavigate('continue-studying');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Continue Learning</h3>
      <div className="bg-slate-800/50 rounded-xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
            <Activity size={20} className="text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-white">Pathology</p>
            <p className="text-sm text-slate-400">Last studied 2 days ago</p>
          </div>
        </div>
        <button 
          onClick={handleContinueStudying}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="Continue studying Pathology"
        >
          Continue Studying
        </button>
      </div>
    </div>
  );
};

export default ContinueLearning;
