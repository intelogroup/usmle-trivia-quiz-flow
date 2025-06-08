
import { Bell, Moon, Volume2, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
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
        { icon: Moon, label: "Dark Mode", hasToggle: true, enabled: true },
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
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-app-primary">Settings</h1>
        <p className="text-app-secondary">Customize your learning experience</p>
      </div>

      {/* Settings Groups */}
      <div className="space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <h3 className="text-lg font-semibold text-app-secondary">{group.title}</h3>
            <div className="bg-card rounded-xl overflow-hidden border border-border">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors border-b border-border last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-app-muted" />
                      <span className="font-medium text-app-primary">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.hasToggle ? (
                        <div className={`w-12 h-6 rounded-full ${item.enabled ? 'bg-blue-600' : 'bg-muted'} relative transition-colors`}>
                          <div className={`w-5 h-5 rounded-full bg-background absolute top-0.5 transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </div>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-app-muted" />
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
      <div className="bg-card rounded-xl p-4 text-center border border-border">
        <h4 className="font-semibold mb-2 text-app-primary">USMLE Trivia</h4>
        <p className="text-sm text-app-muted">Version 1.0.0</p>
        <p className="text-xs text-app-muted mt-2">Made with ❤️ for medical students</p>
      </div>
    </div>
  );
};

export default SettingsScreen;
