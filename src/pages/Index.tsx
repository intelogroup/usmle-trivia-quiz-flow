
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HomeScreen from "@/components/HomeScreen";
import QuizScreen from "@/components/QuizScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import AnalyticsScreen from "@/components/AnalyticsScreen";
import CategoryScreen from "@/components/CategoryScreen";
import QuizPlayScreen from "@/components/QuizPlayScreen";

type Screen = 'home' | 'quiz' | 'leaderboard' | 'analytics' | 'category' | 'quiz-play';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentScreen('quiz-play');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'quiz':
        return <QuizScreen onNavigate={setCurrentScreen} onCategorySelect={handleCategorySelect} />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'category':
        return <CategoryScreen onCategorySelect={handleCategorySelect} />;
      case 'quiz-play':
        return <QuizPlayScreen category={selectedCategory} onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-md mx-auto bg-slate-900 min-h-screen relative">
        {renderScreen()}
        <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>
    </div>
  );
};

export default Index;
