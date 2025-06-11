
import { Home, Zap, Trophy, BarChart3, BookOpen } from "lucide-react";

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
    { id: 'learn', icon: BookOpen, label: 'Learn' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-slate-800/95 backdrop-blur-sm border-t border-slate-700">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                isActive 
                  ? 'text-blue-400 bg-blue-500/10' 
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
              }`}
              aria-label={`Navigate to ${item.label}`}
            >
              <Icon size={20} className={isActive ? 'fill-current' : ''} />
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-400' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
