
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getUserProfile } from "@/utils/dataStore";

interface TopNavigationProps {
  onProfileClick: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ onProfileClick }) => {
  const userProfile = getUserProfile();

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 z-50">
      <div className="flex justify-between items-center py-3 px-4">
        <div className="flex items-center">
          <h1 className="text-white font-bold text-lg">MedQuiz</h1>
        </div>
        
        <button
          onClick={onProfileClick}
          className="flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          aria-label="View Profile"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face" 
              alt="Profile" 
            />
            <AvatarFallback className="text-sm bg-orange-500 text-white">
              {userProfile.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-white text-sm font-medium">{userProfile.name}</span>
        </button>
      </div>
    </div>
  );
};

export default TopNavigation;
