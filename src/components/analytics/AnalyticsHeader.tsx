
import { ArrowLeft, Calendar } from 'lucide-react';

interface AnalyticsHeaderProps {
  onNavigate: (screen: string) => void;
}

const AnalyticsHeader = ({ onNavigate }: AnalyticsHeaderProps) => {
  return (
    <div className="flex items-center space-x-3 my-[30px]">
      <button onClick={() => onNavigate('home')} className="text-white hover:text-slate-300 transition-colors">
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-slate-300 text-sm">Track your learning progress</p>
      </div>
      <div className="text-right">
        <div className="flex items-center space-x-1 text-blue-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">This Week</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
