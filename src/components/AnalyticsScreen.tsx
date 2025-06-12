
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
      
      <div className="bg-slate-800 rounded-xl p-4">
        <p className="text-slate-300">Analytics functionality coming soon...</p>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
