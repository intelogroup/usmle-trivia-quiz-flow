
import { Home, Zap, Trophy, BarChart3, User } from "lucide-react";

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const Navigation = ({ currentScreen, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'quiz', icon: Zap, label: 'Quiz' },
    { id: 'leaderboard', icon: Trophy, label: 'Rankings' },
    { id: 'analytics', icon: BarChart3, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-app-surface border-t border-app-border">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-400' 
                  : 'text-app-muted hover:text-app-secondary'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
