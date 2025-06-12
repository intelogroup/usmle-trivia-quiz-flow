import { useState } from "react";
import { ChevronLeft, Clock, Target, Zap, Play } from "lucide-react";
interface QuizConfigurationScreenProps {
  selectedSubjects: string[];
  selectedSystems: string[];
  availableQuestions: number;
  onNavigate: (screen: string) => void;
  onStartQuiz: (config: QuizConfig) => void;
}
export interface QuizConfig {
  subjects: string[];
  systems: string[];
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  timeLimit: number; // in minutes, 0 for unlimited
}
const QuizConfigurationScreen = ({
  selectedSubjects,
  selectedSystems,
  availableQuestions,
  onNavigate,
  onStartQuiz
}: QuizConfigurationScreenProps) => {
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('mixed');
  const [timeLimit, setTimeLimit] = useState(0); // 0 = unlimited

  const questionOptions = [5, 10, 15, 20].filter(count => count <= availableQuestions);
  const timeLimitOptions = [{
    value: 0,
    label: 'Unlimited'
  }, {
    value: 5,
    label: '5 minutes'
  }, {
    value: 10,
    label: '10 minutes'
  }, {
    value: 15,
    label: '15 minutes'
  }, {
    value: 20,
    label: '20 minutes'
  }];
  const difficultyOptions = [{
    value: 'easy',
    label: 'Easy',
    description: 'Basic concepts',
    color: 'text-green-400 bg-green-900/30'
  }, {
    value: 'medium',
    label: 'Medium',
    description: 'Intermediate level',
    color: 'text-yellow-400 bg-yellow-900/30'
  }, {
    value: 'hard',
    label: 'Hard',
    description: 'Advanced topics',
    color: 'text-red-400 bg-red-900/30'
  }, {
    value: 'mixed',
    label: 'Mixed',
    description: 'All difficulty levels',
    color: 'text-blue-400 bg-blue-900/30'
  }];
  const handleStartQuiz = () => {
    const config: QuizConfig = {
      subjects: selectedSubjects,
      systems: selectedSystems,
      questionCount,
      difficulty,
      timeLimit
    };
    onStartQuiz(config);
  };
  const estimatedTime = timeLimit > 0 ? timeLimit : Math.ceil(questionCount * 1.2);
  return <div className="p-4 pb-20 space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => onNavigate('subject-system-selection')} className="p-2">
          <ChevronLeft className="w-6 h-6 text-slate-300" />
        </button>
        <h1 className="text-xl font-bold text-white my-[50px]">Configure Quiz</h1>
        <div className="w-10"></div>
      </div>

      {/* Selection Summary */}
      <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
        <h2 className="text-lg font-semibold text-white">Your Selection</h2>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {selectedSubjects.map(subject => <span key={subject} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                {subject}
              </span>)}
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedSystems.map(system => <span key={system} className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded-full">
                {system.split(' ')[0]}
              </span>)}
          </div>
        </div>
        <div className="text-sm text-slate-400">
          {availableQuestions} questions available
        </div>
      </div>

      {/* Question Count */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Number of Questions</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {questionOptions.map(count => <button key={count} onClick={() => setQuestionCount(count)} className={`p-4 rounded-xl border transition-colors ${questionCount === count ? 'bg-blue-600/20 border-blue-500 text-blue-300' : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm">Questions</div>
              </div>
            </button>)}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>Difficulty Level</span>
        </h3>
        <div className="space-y-2">
          {difficultyOptions.map(option => <button key={option.value} onClick={() => setDifficulty(option.value as any)} className={`w-full p-4 rounded-xl border transition-colors ${difficulty === option.value ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800/50 border-slate-600 hover:bg-slate-700/50'}`}>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="font-semibold text-white">{option.label}</div>
                  <div className="text-sm text-slate-400">{option.description}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${option.color}`}>
                  {option.label}
                </div>
              </div>
            </button>)}
        </div>
      </div>

      {/* Time Limit */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Time Limit</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {timeLimitOptions.map(option => <button key={option.value} onClick={() => setTimeLimit(option.value)} className={`p-3 rounded-xl border transition-colors ${timeLimit === option.value ? 'bg-blue-600/20 border-blue-500 text-blue-300' : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50'}`}>
              <div className="text-center text-sm">
                {option.label}
              </div>
            </button>)}
        </div>
      </div>

      {/* Quiz Summary */}
      <div className="bg-slate-800 rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-white">Quiz Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{questionCount}</div>
            <div className="text-slate-400">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">~{estimatedTime}</div>
            <div className="text-slate-400">Minutes</div>
          </div>
        </div>
      </div>

      {/* Start Quiz Button */}
      <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto">
        <button onClick={handleStartQuiz} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg flex items-center justify-center space-x-2">
          <Play className="w-5 h-5" />
          <span>Start Quiz</span>
        </button>
      </div>
    </div>;
};
export default QuizConfigurationScreen;