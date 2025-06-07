
import { Bell, Moon, Sun, Volume2, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
  const { theme, setTheme } = useTheme();
  
  const isDarkMode = theme === "dark";

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: Shield, label: "Profile Settings", action: () => onNavigate('profile') },
        { icon: LogOut, label: "Sign Out", action: () => console.log('Sign out') },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", hasToggle: true, enabled: true },
        { 
          icon: isDarkMode ? Moon : Sun, 
          label: "Dark Mode", 
          hasToggle: true, 
          enabled: isDarkMode,
          action: toggleDarkMode
        },
        { icon: Volume2, label: "Sound Effects", hasToggle: true, enabled: false },
      ]
    },
    {
      title: "Study",
      items: [
        { icon: HelpCircle, label: "Review Mistakes", action: () => onNavigate('review') },
      ]
    }
  ];

  return (
    <div className="p-4 pb-20 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Customize your learning experience</p>
      </div>

      {/* Settings Groups */}
      <div className="space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <h3 className="text-lg font-semibold text-muted-foreground">{group.title}</h3>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.hasToggle ? (
                        <div className={`w-12 h-6 rounded-full ${item.enabled ? 'bg-primary' : 'bg-muted'} relative transition-colors`}>
                          <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </div>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="bg-card rounded-xl border border-border p-4 text-center">
        <h4 className="font-semibold mb-2 text-foreground">USMLE Trivia</h4>
        <p className="text-sm text-muted-foreground">Version 1.0.0</p>
        <p className="text-xs text-muted-foreground mt-2">Made with ❤️ for medical students</p>
      </div>
    </div>
  );
};

export default SettingsScreen;
