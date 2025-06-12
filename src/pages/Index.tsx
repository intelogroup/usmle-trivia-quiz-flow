
import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomeScreen from "@/components/HomeScreen";
import QuizScreen from "@/components/QuizScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import AnalyticsScreen from "@/components/AnalyticsScreen";
import LearnScreen from "@/components/LearnScreen";
import PhoneFrame from "@/components/PhoneFrame";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'quiz':
        return <QuizScreen onNavigate={setCurrentScreen} />;
      case 'leaderboard':
        return <LeaderboardScreen onNavigate={setCurrentScreen} />;
      case 'analytics':
        return <AnalyticsScreen onNavigate={setCurrentScreen} />;
      case 'learn':
        return <LearnScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <PhoneFrame>
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto">
            {renderScreen()}
          </div>
          <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default Index;
