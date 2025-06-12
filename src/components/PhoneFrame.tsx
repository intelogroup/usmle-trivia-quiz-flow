import React from 'react';
interface PhoneFrameProps {
  children: React.ReactNode;
}
const PhoneFrame = ({
  children
}: PhoneFrameProps) => {
  return <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-black flex items-center justify-center p-4 my-[50px]">
      {/* Phone Frame */}
      <div className="relative">
        {/* Phone Body */}
        <div className="bg-slate-900 rounded-[3rem] p-2 shadow-2xl border-4 border-slate-700">
          {/* Screen Bezel */}
          <div className="bg-black rounded-[2.5rem] p-1">
            {/* Notch */}
            <div className="relative bg-slate-900 rounded-[2rem] overflow-hidden">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10">
                {/* Camera */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-800 rounded-full"></div>
                {/* Speaker */}
                <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 translate-x-4 w-8 h-1 bg-slate-800 rounded-full"></div>
              </div>
              
              {/* Screen Content */}
              <div className="relative z-0 w-full max-w-sm mx-auto bg-slate-900 min-h-screen">
                {children}
              </div>
            </div>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full"></div>
        
        {/* Volume Buttons */}
        <div className="absolute left-0 top-32 w-1 h-12 bg-slate-600 rounded-r-lg"></div>
        <div className="absolute left-0 top-48 w-1 h-8 bg-slate-600 rounded-r-lg"></div>
        
        {/* Power Button */}
        <div className="absolute right-0 top-40 w-1 h-12 bg-slate-600 rounded-l-lg"></div>
      </div>
    </div>;
};
export default PhoneFrame;