
import { useState } from 'react';
import AnalyticsHeader from './analytics/AnalyticsHeader';
import AnalyticsTabs from './analytics/AnalyticsTabs';
import OverviewTab from './analytics/OverviewTab';
import PerformanceTab from './analytics/PerformanceTab';
import ProgressTab from './analytics/ProgressTab';

interface AnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}

const AnalyticsScreen = ({
  onNavigate
}: AnalyticsScreenProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'progress'>('overview');

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AnalyticsHeader onNavigate={onNavigate} />

      <AnalyticsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && <OverviewTab onNavigate={onNavigate} />}
        {activeTab === 'performance' && <PerformanceTab />}
        {activeTab === 'progress' && <ProgressTab />}
      </div>
    </div>
  );
};
export default AnalyticsScreen;
