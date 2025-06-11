import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomeScreen from "@/components/HomeScreen";
import QuizScreen from "@/components/QuizScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import AnalyticsScreen from "@/components/AnalyticsScreen";
import CategoryScreen from "@/components/CategoryScreen";
import QuizPlayScreen from "@/components/QuizPlayScreen";
import SubjectSystemSelectionScreen from "@/components/SubjectSystemSelectionScreen";
import SettingsScreen from "@/components/SettingsScreen";
import ProfileScreen from "@/components/ProfileScreen";
import ReviewScreen from "@/components/ReviewScreen";
import LearnScreen from "@/components/LearnScreen";
import ContinueStudyingScreen from "@/components/ContinueStudyingScreen";
import QuizConfigurationScreen, { QuizConfig } from "@/components/QuizConfigurationScreen";
import ProfileModal from "@/components/ProfileModal";
import PhoneFrame from "@/components/PhoneFrame";
import { getQuestionCount } from "@/data/questionBank";

type Screen = 'home' | 'quiz' | 'leaderboard' | 'analytics' | 'category' | 'quiz-play' | 'subject-system-selection' | 'quiz-configuration' | 'settings' | 'profile' | 'review' | 'learn' | 'continue-studying';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleNavigation = (screen: string) => {
    console.log(`Navigation requested: ${screen}`);
    console.log(`Current screen: ${currentScreen}`);
    
    if (screen === 'profile') {
      setIsProfileModalOpen(true);
      return;
    }
    
    setCurrentScreen(screen as Screen);
    console.log(`Screen changed to: ${screen}`);
  };

  const handleCategorySelect = (category: string) => {
    // For backward compatibility with old category system
    setSelectedCategory(category);
    setCurrentScreen('subject-system-selection');
  };

  const handleSubjectSystemSelection = (subjects: string[], systems: string[]) => {
    setSelectedSubjects(subjects);
    setSelectedSystems(systems);
    setCurrentScreen('quiz-play');
  };

  const handlePresetSelect = (subjects: string[], systems: string[]) => {
    setSelectedSubjects(subjects);
    setSelectedSystems(systems);
    setCurrentScreen('quiz-play');
  };

  const handleQuizConfiguration = (subjects: string[], systems: string[]) => {
    setSelectedSubjects(subjects);
    setSelectedSystems(systems);
    setCurrentScreen('quiz-configuration');
  };

  const handleStartQuizWithConfig = (config: QuizConfig) => {
    setQuizConfig(config);
    setSelectedSubjects(config.subjects);
    setSelectedSystems(config.systems);
    setCurrentScreen('quiz-play');
  };

  const handleQuizRestart = (subjects: string[], systems: string[]) => {
    setSelectedSubjects(subjects);
    setSelectedSystems(systems);
    setCurrentScreen('quiz-configuration');
  };

  const renderScreen = () => {
    console.log(`Rendering screen: ${currentScreen}`);
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigation} onQuizRestart={handleQuizRestart} />;
      case 'quiz':
        return (
          <QuizScreen 
            onNavigate={handleNavigation} 
            onCategorySelect={handleCategorySelect}
            onPresetSelect={handlePresetSelect}
          />
        );
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'category':
        return <CategoryScreen onCategorySelect={handleCategorySelect} />;
      case 'subject-system-selection':
        return (
          <SubjectSystemSelectionScreen 
            onNavigate={handleNavigation} 
            onSelectionComplete={handleQuizConfiguration}
          />
        );
      case 'quiz-configuration':
        return (
          <QuizConfigurationScreen
            selectedSubjects={selectedSubjects}
            selectedSystems={selectedSystems}
            availableQuestions={getQuestionCount(selectedSubjects, selectedSystems)}
            onNavigate={handleNavigation}
            onStartQuiz={handleStartQuizWithConfig}
          />
        );
      case 'quiz-play':
        return (
          <QuizPlayScreen 
            selectedSubjects={selectedSubjects}
            selectedSystems={selectedSystems}
            quizConfig={quizConfig}
            onNavigate={handleNavigation} 
          />
        );
      case 'settings':
        return <SettingsScreen onNavigate={handleNavigation} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigation} />;
      case 'review':
        return <ReviewScreen onNavigate={handleNavigation} />;
      case 'learn':
        return <LearnScreen onNavigate={handleNavigation} />;
      case 'continue-studying':
        console.log('Rendering ContinueStudyingScreen');
        return <ContinueStudyingScreen onNavigate={handleNavigation} />;
      default:
        console.log(`Unknown screen: ${currentScreen}, defaulting to home`);
        return <HomeScreen onNavigate={handleNavigation} onQuizRestart={handleQuizRestart} />;
    }
  };

  return (
    <PhoneFrame>
      <div className="max-w-md mx-auto bg-slate-900 min-h-screen relative">
        {renderScreen()}
        <Navigation currentScreen={currentScreen} onNavigate={handleNavigation} />
        <ProfileModal 
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onNavigate={handleNavigation}
        />
      </div>
    </PhoneFrame>
  );
};

export default Index;
