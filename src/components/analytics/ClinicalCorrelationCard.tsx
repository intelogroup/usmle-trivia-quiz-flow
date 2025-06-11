
import { Stethoscope, Brain, Shield, Target } from 'lucide-react';
import { getUSMLEAnalytics } from '@/utils/usmleAnalyticsManager';

const ClinicalCorrelationCard = () => {
  const analytics = getUSMLEAnalytics();
  const { clinicalCorrelation } = analytics;

  const metrics = [
    {
      label: 'Clinical Vignettes',
      score: clinicalCorrelation.clinicalVignetteScore,
      icon: Stethoscope,
      color: 'blue'
    },
    {
      label: 'Diagnostic Reasoning',
      score: clinicalCorrelation.diagnosticReasoningScore,
      icon: Brain,
      color: 'purple'
    },
    {
      label: 'Treatment Selection',
      score: clinicalCorrelation.treatmentSelectionScore,
      icon: Target,
      color: 'green'
    },
    {
      label: 'Patient Safety',
      score: clinicalCorrelation.patientSafetyScore,
      icon: Shield,
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Clinical Application</h3>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`p-3 rounded-lg border ${getColorClasses(metric.color)}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{metric.label}</span>
              </div>
              <div className={`text-xl font-bold ${getScoreColor(metric.score)}`}>
                {metric.score}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration Scores */}
      <div className="border-t border-slate-700 pt-4">
        <div className="text-sm text-slate-400 mb-3">Knowledge Integration</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-300">Basic Science Integration</span>
            <span className={`font-medium ${getScoreColor(clinicalCorrelation.basicScienceIntegration)}`}>
              {clinicalCorrelation.basicScienceIntegration}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              style={{ width: `${clinicalCorrelation.basicScienceIntegration}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-300">Real-World Application</span>
            <span className={`font-medium ${getScoreColor(clinicalCorrelation.realWorldApplication)}`}>
              {clinicalCorrelation.realWorldApplication}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
              style={{ width: `${clinicalCorrelation.realWorldApplication}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCorrelationCard;
