

import { Brain, BookOpen, Trophy, BarChart3, RotateCcw, Settings } from "lucide-react";

interface QuickActionsProps {
  onNavigate: (screen: string) => void;
}

const QuickActions = ({ onNavigate }: QuickActionsProps) => {
  const actions = [
    {
      id: 'category',
      icon: Brain,
      label: 'Browse Topics',
      description: 'Explore by subject',
      color: 'bg-purple-600',
      action: () => onNavigate('category')
    },
    {
      id: 'review',
      icon: RotateCcw,
      label: 'Review Mistakes',
      description: 'Learn from errors',
      color: 'bg-red-600',
      action: () => onNavigate('review')
    },
    {
      id: 'leaderboard',
      icon: Trophy,
      label: 'Rankings',
      description: 'See your rank',
      color: 'bg-yellow-600',
      action: () => onNavigate('leaderboard')
    },
    {
      id: 'analytics',
      icon: BarChart3,
      label: 'Analytics',
      description: 'Track progress',
      color: 'bg-green-600',
      action: () => onNavigate('analytics')
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-left transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-white">{action.label}</div>
                  <div className="text-xs text-slate-400">{action.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

