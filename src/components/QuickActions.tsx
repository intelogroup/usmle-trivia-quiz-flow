
import { Zap, BookOpen, Trophy, BarChart3 } from "lucide-react";

interface QuickActionsProps {
  onNavigate: (screen: string) => void;
}

const QuickActions = ({ onNavigate }: QuickActionsProps) => {
  const actions = [
    { id: 'quiz', icon: Zap, label: 'Timed Challenge', color: 'bg-blue-600' },
    { id: 'category', icon: BookOpen, label: 'Browse Categories', color: 'bg-green-600' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', color: 'bg-yellow-600' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'bg-purple-600' },
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
              onClick={() => onNavigate(action.id)}
              className={`${action.color} hover:opacity-90 text-white p-4 rounded-xl flex flex-col items-center space-y-2 transition-opacity`}
            >
              <Icon size={24} />
              <span className="text-sm font-medium text-center">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
