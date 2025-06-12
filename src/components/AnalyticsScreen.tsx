
import USMLEReadinessCard from './analytics/USMLEReadinessCard';
import CategoryOverview from './analytics/CategoryOverview';
import SubjectSystemPerformance from './analytics/SubjectSystemPerformance';
import SimplifiedWeaknessAnalysis from './analytics/SimplifiedWeaknessAnalysis';
import SubjectPerformanceRadar from './analytics/SubjectPerformanceRadar';
import ClinicalCorrelationCard from './analytics/ClinicalCorrelationCard';
import DailyActivityChart from './analytics/DailyActivityChart';

interface AnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}

const AnalyticsScreen = ({ onNavigate }: AnalyticsScreenProps) => {
  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-slate-300">Track your learning progress</p>
      </div>
      
      {/* USMLE Readiness Overview */}
      <USMLEReadinessCard />
      
      {/* Category Performance Overview */}
      <CategoryOverview />
      
      {/* Daily Activity Chart */}
      <DailyActivityChart />
      
      {/* Subject & System Performance */}
      <SubjectSystemPerformance />
      
      {/* Subject Performance Radar */}
      <SubjectPerformanceRadar />
      
      {/* Clinical Correlation */}
      <ClinicalCorrelationCard />
      
      {/* Weakness Analysis */}
      <SimplifiedWeaknessAnalysis />
    </div>
  );
};

export default AnalyticsScreen;
