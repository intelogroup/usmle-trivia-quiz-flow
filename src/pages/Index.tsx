
import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomeScreen from "@/components/HomeScreen";
import QuizScreen from "@/components/QuizScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import AnalyticsScreen from "@/components/AnalyticsScreen";
import ProfileScreen from "@/components/ProfileScreen";
import SettingsScreen from "@/components/SettingsScreen";
import CategoryScreen from "@/components/CategoryScreen";
import ReviewScreen from "@/components/ReviewScreen";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleQuizStart = (subjects: string[], systems: string[]) => {
    setSelectedSubjects(subjects);
    setSelectedSystems(systems);
    setCurrentScreen('quiz');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} onQuizRestart={handleQuizStart} />;
      case 'quiz':
        return <QuizScreen subjects={selectedSubjects} systems={selectedSystems} onNavigate={handleNavigate} />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'analytics':
        return <AnalyticsScreen onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsScreen onNavigate={handleNavigate} />;
      case 'category':
        return <CategoryScreen onQuizStart={handleQuizStart} />;
      case 'review':
        return <ReviewScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onQuizRestart={handleQuizStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-surface min-h-screen">
        {renderScreen()}
        <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default Index;
