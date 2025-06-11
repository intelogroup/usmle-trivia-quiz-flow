
import { Bell, Moon, Volume2, Shield, HelpCircle, LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { 
          icon: Shield, 
          label: "Profile Settings", 
          action: () => onNavigate('profile'),
          hasArrow: true
        },
        { 
          icon: LogOut, 
          label: "Sign Out", 
          action: () => console.log('Sign out'),
          hasArrow: true,
          destructive: true
        },
      ]
    },
    {
      title: "Preferences",
      items: [
        { 
          icon: Bell, 
          label: "Notifications", 
          hasToggle: true, 
          enabled: notifications,
          onToggle: setNotifications
        },
        { 
          icon: Moon, 
          label: "Dark Mode", 
          hasToggle: true, 
          enabled: darkMode,
          onToggle: setDarkMode
        },
        { 
          icon: Volume2, 
          label: "Sound Effects", 
          hasToggle: true, 
          enabled: soundEffects,
          onToggle: setSoundEffects
        },
      ]
    },
    {
      title: "Study",
      items: [
        { 
          icon: HelpCircle, 
          label: "Review Mistakes", 
          action: () => onNavigate('review'),
          hasArrow: true
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="w-16"></div> {/* Spacer for centering */}
      </div>

      <div className="p-4 pb-20 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2 py-4">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <p className="text-slate-400">Customize your learning experience</p>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-300 px-2">{group.title}</h3>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-600/30 shadow-lg">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className={`w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-all duration-200 border-b border-slate-600/30 last:border-b-0 ${
                        item.destructive ? 'hover:bg-red-500/10' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-slate-700/50 rounded-xl flex items-center justify-center">
                          <Icon className={`w-5 h-5 ${item.destructive ? 'text-red-400' : 'text-slate-400'}`} />
                        </div>
                        <span className={`font-medium text-lg ${item.destructive ? 'text-red-400' : 'text-white'}`}>
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.hasToggle ? (
                          <Switch
                            checked={item.enabled}
                            onCheckedChange={item.onToggle}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        ) : item.hasArrow ? (
                          <ChevronRight className={`w-5 h-5 ${item.destructive ? 'text-red-400' : 'text-slate-400'}`} />
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* App Info */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-600/30 shadow-lg">
          <h4 className="font-bold text-xl text-white mb-2">USMLE Trivia</h4>
          <p className="text-slate-300 text-lg mb-1">Version 1.0.0</p>
          <p className="text-slate-400 text-sm">Made with ❤️ for medical students</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
