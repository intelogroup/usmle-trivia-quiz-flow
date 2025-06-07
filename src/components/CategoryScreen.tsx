
import { ChevronRight, BookOpen, Clock, TrendingUp, Award } from "lucide-react";

interface CategoryScreenProps {
  onCategorySelect: (category: string) => void;
}

const CategoryScreen = ({ onCategorySelect }: CategoryScreenProps) => {
  const categories = [
    { 
      name: "Anatomy", 
      questions: 7, 
      difficulty: 3,
      color: "from-red-500 to-pink-600",
      description: "Human body structure & systems",
      avgTime: "2.5 min",
      userRating: 4.2,
      trending: true
    },
    { 
      name: "Physiology", 
      questions: 12, 
      difficulty: 3,
      color: "from-blue-500 to-cyan-600",
      description: "Body functions & processes",
      avgTime: "3.1 min",
      userRating: 4.5,
      trending: false
    },
    { 
      name: "Pharmacology", 
      questions: 15, 
      difficulty: 4,
      color: "from-green-500 to-emerald-600",
      description: "Drug mechanisms & interactions",
      avgTime: "4.2 min",
      userRating: 3.8,
      trending: true
    },
    { 
      name: "Pathology", 
      questions: 8, 
      difficulty: 4,
      color: "from-purple-500 to-indigo-600",
      description: "Disease processes & diagnosis",
      avgTime: "3.8 min",
      userRating: 4.1,
      trending: false
    },
    { 
      name: "Microbiology", 
      questions: 10, 
      difficulty: 3,
      color: "from-yellow-500 to-orange-600",
      description: "Microorganisms & infections",
      avgTime: "2.8 min",
      userRating: 4.3,
      trending: true
    },
    { 
      name: "Immunology", 
      questions: 6, 
      difficulty: 4,
      color: "from-teal-500 to-blue-600",
      description: "Immune system responses",
      avgTime: "3.5 min",
      userRating: 4.0,
      trending: false
    },
  ];

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 3: return { label: 'Moderate', color: 'text-yellow-400' };
      case 4: return { label: 'Advanced', color: 'text-orange-400' };
      case 5: return { label: 'Expert', color: 'text-red-400' };
      default: return { label: 'Beginner', color: 'text-green-400' };
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-slate-600'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="p-4 pb-20 space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Browse Categories
          </h1>
          <p className="text-slate-300">Explore medical subjects and start learning</p>
        </div>
      </div>

      {/* Filter/Sort Options */}
      <div className="flex justify-center space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">All</button>
        <button className="bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm">Trending</button>
        <button className="bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm">Popular</button>
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category.name)}
            className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-xl p-5 transition-all duration-200 hover:scale-[1.01] shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Category Visual */}
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg relative`}>
                  <div className="w-6 h-6 bg-white/30 rounded-lg" />
                  {category.trending && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Category Info */}
                <div className="text-left flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors">
                      {category.name}
                    </h4>
                    {category.trending && (
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        Trending
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-2">{category.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-xs text-slate-400">
                      <BookOpen className="w-3 h-3" />
                      <span>{category.questions} Questions</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{category.avgTime} avg</span>
                    </div>
                    
                    <div className={`text-xs font-semibold ${getDifficultyLabel(category.difficulty).color}`}>
                      {getDifficultyLabel(category.difficulty).label}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex space-x-1">
                      {renderStars(category.userRating)}
                    </div>
                    <span className="text-xs text-slate-400">({category.userRating})</span>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <Award className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-500">Study</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/30">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-blue-300 flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Study Tips</span>
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Start with subjects you find most challenging</li>
            <li>• Review explanations for both correct and incorrect answers</li>
            <li>• Take breaks between study sessions for better retention</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen;
