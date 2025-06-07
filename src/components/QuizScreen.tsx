import { ChevronRight, Target, BookOpen, Activity, Users, Zap } from "lucide-react";

interface QuizScreenProps {
  onNavigate: (screen: string) => void;
  onCategorySelect: (category: string) => void;
}

const QuizScreen = ({ onNavigate, onCategorySelect }: QuizScreenProps) => {
  const categories = [
    { 
      name: "Anatomy", 
      questions: 7, 
      difficulty: 3, 
      color: "from-red-500 to-pink-600",
      description: "Human body structure",
      completion: 85,
      recentActivity: true
    },
    { 
      name: "Physiology", 
      questions: 12, 
      difficulty: 3, 
      color: "from-blue-500 to-cyan-600",
      description: "Body functions & processes",
      completion: 72,
      recentActivity: false
    },
    { 
      name: "Pathology", 
      questions: 15, 
      difficulty: 4, 
      color: "from-purple-500 to-indigo-600",
      description: "Disease mechanisms",
      completion: 45,
      recentActivity: true
    },
    { 
      name: "Pharmacology", 
      questions: 8, 
      difficulty: 4, 
      color: "from-green-500 to-emerald-600",
      description: "Drug actions & effects",
      completion: 60,
      recentActivity: false
    },
    { 
      name: "Microbiology", 
      questions: 10, 
      difficulty: 3, 
      color: "from-yellow-500 to-orange-600",
      description: "Microorganisms & infections",
      completion: 38,
      recentActivity: true
    },
    { 
      name: "Immunology", 
      questions: 6, 
      difficulty: 4, 
      color: "from-teal-500 to-blue-600",
      description: "Immune system responses",
      completion: 92,
      recentActivity: false
    },
  ];

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} className={`w-2 h-2 rounded-full ${
        i < difficulty ? 'bg-yellow-400' : 'bg-slate-600'
      }`} />
    ));
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'text-green-400';
    if (completion >= 60) return 'text-yellow-400';
    if (completion >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const handleCreateCustomQuiz = () => {
    onNavigate('subject-system-selection');
  };

  return (
    <div className="p-4 pb-20 space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Choose Your Challenge
          </h1>
          <p className="text-slate-300">Master USMLE subjects with targeted practice</p>
        </div>

        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <BookOpen className="w-4 h-4" />
            <span>{categories.reduce((acc, cat) => acc + cat.questions, 0)} Questions</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Users className="w-4 h-4" />
            <span>6 Subjects</span>
          </div>
        </div>
      </div>

      {/* Create Custom Quiz Button */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
        <div className="text-center space-y-3">
          <h3 className="text-xl font-semibold text-white">Create Custom Quiz</h3>
          <p className="text-sm text-blue-100">Select specific subjects and body systems for targeted practice</p>
          <button 
            onClick={handleCreateCustomQuiz}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
          >
            <Target className="w-4 h-4" />
            <span>Create Custom Quiz</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">73%</div>
          <div className="text-sm text-slate-400">Overall Progress</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">12</div>
          <div className="text-sm text-slate-400">Day Streak</div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-200">Quick Start Templates</h3>
          <div className="flex items-center space-x-1 text-sm text-slate-400">
            <Activity className="w-4 h-4" />
            <span>Popular</span>
          </div>
        </div>
        
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category.name)}
            className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-xl p-5 transition-all duration-200 hover:scale-[1.02] shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Subject Visual */}
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm" />
                    </div>
                  </div>
                  {category.recentActivity && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Zap className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Subject Info */}
                <div className="text-left flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors">
                      {category.name}
                    </h4>
                    {category.recentActivity && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-2">{category.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-400">{category.questions} Questions</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <span className="text-slate-400">Difficulty:</span>
                      <div className="flex space-x-1">
                        {getDifficultyStars(category.difficulty)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Progress</span>
                      <span className={`text-xs font-semibold ${getCompletionColor(category.completion)}`}>
                        {category.completion}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-300`}
                        style={{ width: `${category.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Arrow and Quick Actions */}
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <div className="text-sm font-semibold text-slate-300">
                    {Math.round(category.questions * (category.completion / 100))}
                  </div>
                  <div className="text-xs text-slate-500">completed</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Start Button */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4">
        <div className="text-center space-y-3">
          <h3 className="text-lg font-semibold text-white">Ready to Begin?</h3>
          <p className="text-sm text-blue-100">Start with your weakest subject for maximum improvement</p>
          <button 
            onClick={() => onCategorySelect('Pathology')}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
          >
            <Target className="w-4 h-4" />
            <span>Practice Weakest Subject</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
