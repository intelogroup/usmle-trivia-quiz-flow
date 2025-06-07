
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HomeScreen from "@/components/HomeScreen";
import QuizScreen from "@/components/QuizScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import AnalyticsScreen from "@/components/AnalyticsScreen";
import CategoryScreen from "@/components/CategoryScreen";
import QuizPlayScreen from "@/components/QuizPlayScreen";
import SettingsScreen from "@/components/SettingsScreen";
import ProfileScreen from "@/components/ProfileScreen";
import ReviewScreen from "@/components/ReviewScreen";

type Screen = 'home' | 'quiz' | 'leaderboard' | 'analytics' | 'category' | 'quiz-play' | 'settings' | 'profile' | 'review';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentScreen('quiz-play');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigation} />;
      case 'quiz':
        return <QuizScreen onNavigate={handleNavigation} onCategorySelect={handleCategorySelect} />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'category':
        return <CategoryScreen onCategorySelect={handleCategorySelect} />;
      case 'quiz-play':
        return <QuizPlayScreen category={selectedCategory} onNavigate={handleNavigation} />;
      case 'settings':
        return <SettingsScreen onNavigate={handleNavigation} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigation} />;
      case 'review':
        return <ReviewScreen onNavigate={handleNavigation} />;
      default:
        return <HomeScreen onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-md mx-auto bg-slate-900 min-h-screen relative">
        {renderScreen()}
        <Navigation currentScreen={currentScreen} onNavigate={handleNavigation} />
      </div>
    </div>
  );
};

export default Index;
