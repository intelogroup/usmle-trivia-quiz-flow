
import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomeScreen from "@/components/HomeScreen";
import QuizScreen from "@/components/QuizScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import AnalyticsScreen from "@/components/AnalyticsScreen";
import LearnScreen from "@/components/LearnScreen";
import PhoneFrame from "@/components/PhoneFrame";
import ModuleSelectionScreen from "@/components/lessons/ModuleSelectionScreen";
import ModuleLessonListScreen from "@/components/lessons/ModuleLessonListScreen";
import ModuleLessonScreen from "@/components/lessons/ModuleLessonScreen";
import GrandLessonScreen from "@/components/lessons/GrandLessonScreen";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedSystem, setSelectedSystem] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');

  const handleSystemSelect = (system: string) => {
    setSelectedSystem(system);
    if (system === 'module-selection') {
      setCurrentScreen('module-selection');
    } else if (system === 'grand-lessons') {
      setCurrentScreen('grand-lessons');
    } else {
      setCurrentScreen('module-selection');
      setSelectedSystem(system);
    }
  };

  const handleGrandLessonSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
    setCurrentScreen('module-lesson-list');
  };

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
    setCurrentScreen('module-lesson-list');
  };

  const handleLessonSelect = (moduleId: string, lessonId: string) => {
    setSelectedModule(moduleId);
    setSelectedLesson(lessonId);
    setCurrentScreen('module-lesson');
  };

  const handleLessonComplete = () => {
    setCurrentScreen('module-lesson-list');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'quiz':
        return <QuizScreen onNavigate={setCurrentScreen} onCategorySelect={() => {}} />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'analytics':
        return <AnalyticsScreen onNavigate={setCurrentScreen} />;
      case 'learn':
        return <LearnScreen onNavigate={setCurrentScreen} onSystemSelect={handleSystemSelect} />;
      case 'grand-lessons':
        return (
          <GrandLessonScreen 
            onNavigate={setCurrentScreen}
            onGrandLessonSelect={handleGrandLessonSelect}
          />
        );
      case 'module-selection':
        return (
          <ModuleSelectionScreen 
            system={selectedSystem || 'Cardiovascular System'}
            onNavigate={setCurrentScreen}
            onModuleSelect={handleModuleSelect}
          />
        );
      case 'module-lesson-list':
        return (
          <ModuleLessonListScreen
            moduleId={selectedModule}
            onNavigate={setCurrentScreen}
            onLessonSelect={handleLessonSelect}
          />
        );
      case 'module-lesson':
        return (
          <ModuleLessonScreen
            moduleId={selectedModule}
            lessonId={selectedLesson}
            onNavigate={setCurrentScreen}
            onComplete={handleLessonComplete}
          />
        );
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
