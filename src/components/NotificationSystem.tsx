import React, { useState, useEffect } from 'react';
import { X, Bell, Trophy, Target } from 'lucide-react';
interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'streak' | 'goal';
  title: string;
  message: string;
  icon: React.ReactNode;
  timestamp: Date;
  read: boolean;
}
interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}
const NotificationSystem = ({
  notifications,
  onMarkAsRead,
  onClearAll
}: NotificationSystemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'streak':
        return <span className="text-orange-400">🔥</span>;
      case 'goal':
        return <Target className="w-5 h-5 text-green-400" />;
      default:
        return <Bell className="w-5 h-5 text-blue-400" />;
    }
  };
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };
  return <div className="relative">
      {/* Notification Bell */}
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors my-[2px]">
        <Bell className="w-6 h-6 text-slate-300" />
        {unreadCount > 0 && <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </div>}
      </button>

      {/* Notification Panel */}
      {isOpen && <div className="absolute top-12 right-0 w-80 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 z-50">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Notifications</h3>
              <div className="flex items-center space-x-2">
                {notifications.length > 0 && <button onClick={onClearAll} className="text-sm text-blue-400 hover:text-blue-300">
                    Clear all
                  </button>}
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-700 rounded">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-400">No notifications yet</p>
                <p className="text-sm text-slate-500">We'll notify you about achievements and progress</p>
              </div> : <div className="divide-y divide-slate-700">
                {notifications.map(notification => <div key={notification.id} className={`p-4 hover:bg-slate-700/50 transition-colors cursor-pointer ${!notification.read ? 'bg-slate-700/30' : ''}`} onClick={() => onMarkAsRead(notification.id)}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white truncate">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-slate-400 flex-shrink-0 ml-2">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mt-1">
                          {notification.message}
                        </p>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>
        </div>}
    </div>;
};
export default NotificationSystem;