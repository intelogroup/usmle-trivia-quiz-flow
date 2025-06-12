
import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import QuizScreen from '@/components/QuizScreen';
import ReviewScreen from '@/components/ReviewScreen';
import LeaderboardScreen from '@/components/LeaderboardScreen';
import AnalyticsScreen from '@/components/AnalyticsScreen';
import Navigation from '@/components/Navigation';
import LearnScreen from '@/components/LearnScreen';
import ModuleSelectionScreen from '@/components/lessons/ModuleSelectionScreen';
import ModuleLessonScreen from '@/components/lessons/ModuleLessonScreen';
import ModuleLessonListScreen from '@/components/lessons/ModuleLessonListScreen';
import PhoneFrame from '@/components/PhoneFrame';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [selectedSystem, setSelectedSystem] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    console.log('Category selected:', category);
    setSelectedCategory(category);
    setCurrentScreen('lesson');
  };

  const handleSubjectSystemSelect = (subjects: string[], systems: string[]) => {
    console.log('Subjects selected:', subjects, 'Systems selected:', systems);
    setSelectedSubjects(subjects);
    setSelectedSystems(systems);
    setCurrentScreen('lesson');
  };

  const handleLessonComplete = () => {
    console.log('Lesson completed, navigating back to lesson list');
    setCurrentScreen('module-lesson-list');
  };

  const handleModuleSelect = (moduleId: string) => {
    console.log('Module selected:', moduleId);
    setSelectedModuleId(moduleId);
    setCurrentScreen('module-lesson-list');
  };

  const handleLessonSelect = (moduleId: string, lessonId: string) => {
    console.log('Lesson selected:', moduleId, lessonId);
    setSelectedModuleId(moduleId);
    setSelectedLessonId(lessonId);
    setCurrentScreen('module-lesson');
  };

  const handleSystemSelect = (system: string) => {
    console.log('System selected:', system);
    setSelectedSystem(system);
    setCurrentScreen('module-selection');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'quiz':
        return <QuizScreen 
          onNavigate={setCurrentScreen} 
          onCategorySelect={handleCategorySelect}
          onPresetSelect={handleSubjectSystemSelect}
        />;
      case 'review':
        return <ReviewScreen onNavigate={setCurrentScreen} />;
      case 'leaderboard':
        return <LeaderboardScreen onNavigate={setCurrentScreen} />;
      case 'analytics':
        return <AnalyticsScreen onNavigate={setCurrentScreen} />;
      case 'learn':
        return <LearnScreen onNavigate={setCurrentScreen} onSystemSelect={handleSystemSelect} />;
      case 'module-selection':
        return (
          <ModuleSelectionScreen
            system={selectedSystem}
            onNavigate={setCurrentScreen}
            onModuleSelect={handleModuleSelect}
          />
        );
      case 'module-lesson-list':
        return (
          <ModuleLessonListScreen
            moduleId={selectedModuleId}
            onNavigate={setCurrentScreen}
            onLessonSelect={handleLessonSelect}
          />
        );
      case 'module-lesson':
        return (
          <ModuleLessonScreen
            moduleId={selectedModuleId}
            lessonId={selectedLessonId}
            onNavigate={setCurrentScreen}
            onComplete={handleLessonComplete}
          />
        );
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <PhoneFrame>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {renderScreen()}
        <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>
    </PhoneFrame>
  );
};

export default Index;
