
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="min-h-screen bg-gradient-phone flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative">
        {/* Phone Body */}
        <div className="bg-phone-body rounded-[3rem] p-2 shadow-2xl border-4 border-app-border-secondary">
          {/* Screen Bezel */}
          <div className="bg-phone-bezel rounded-[2.5rem] p-1">
            {/* Notch */}
            <div className="relative bg-phone-screen rounded-[2rem] overflow-hidden">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-phone-bezel rounded-b-2xl z-10">
                {/* Camera */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-app-surface-tertiary rounded-full"></div>
                {/* Speaker */}
                <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 translate-x-4 w-8 h-1 bg-app-surface-tertiary rounded-full"></div>
              </div>
              
              {/* Screen Content */}
              <div className="relative z-0 w-full max-w-sm mx-auto bg-app-background min-h-screen">
                {children}
              </div>
            </div>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-phone-indicator rounded-full"></div>
        
        {/* Volume Buttons */}
        <div className="absolute left-0 top-32 w-1 h-12 bg-phone-buttons rounded-r-lg"></div>
        <div className="absolute left-0 top-48 w-1 h-8 bg-phone-buttons rounded-r-lg"></div>
        
        {/* Power Button */}
        <div className="absolute right-0 top-40 w-1 h-12 bg-phone-buttons rounded-l-lg"></div>
      </div>
    </div>
  );
};

export default PhoneFrame;
