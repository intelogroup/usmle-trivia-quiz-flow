
import { BarChart3, Target, TrendingUp } from 'lucide-react';

type TabId = 'overview' | 'performance' | 'progress';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

interface AnalyticsTabsProps {
  activeTab: TabId;
  setActiveTab: (tabId: TabId) => void;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'performance', label: 'Performance', icon: Target },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
];

const AnalyticsTabs = ({ activeTab, setActiveTab }: AnalyticsTabsProps) => {
  return (
    <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AnalyticsTabs;
