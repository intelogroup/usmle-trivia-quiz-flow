
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
      color: 'bg-purple-500',
      action: () => onNavigate('category')
    },
    {
      id: 'review',
      icon: RotateCcw,
      label: 'Review Mistakes',
      description: 'Learn from errors',
      color: 'bg-red-500',
      action: () => onNavigate('review')
    },
    {
      id: 'leaderboard',
      icon: Trophy,
      label: 'Rankings',
      description: 'See your rank',
      color: 'bg-yellow-500',
      action: () => onNavigate('leaderboard')
    },
    {
      id: 'analytics',
      icon: BarChart3,
      label: 'Analytics',
      description: 'Track progress',
      color: 'bg-green-500',
      action: () => onNavigate('analytics')
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className="glass-card hover:glass-button rounded-xl p-4 text-left transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{action.label}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
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
