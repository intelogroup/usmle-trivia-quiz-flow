
import { ChevronRight } from "lucide-react";

interface CategoryScreenProps {
  onCategorySelect: (category: string) => void;
}

const CategoryScreen = ({ onCategorySelect }: CategoryScreenProps) => {
  const categories = [
    { name: "Anatomy", questions: 7, difficulty: 3 },
    { name: "Physiology", questions: 12, difficulty: 3 },
    { name: "Pharmacology", questions: 15, difficulty: 3 },
    { name: "Pathology", questions: 8, difficulty: 3 },
    { name: "Microbiology", questions: 10, difficulty: 3 },
    { name: "Immunology", questions: 6, difficulty: 3 },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Browse Categories</h1>
        <p className="text-slate-300">Select a category to start studying</p>
      </div>

      <div className="space-y-3">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category.name)}
            className="w-full bg-slate-800 hover:bg-slate-700 rounded-xl p-4 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                  📚
                </div>
                <div className="text-left">
                  <h4 className="font-semibold">{category.name}</h4>
                  <p className="text-sm text-slate-400">{category.questions} Questions 📝</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-blue-400">⭐</span>
                  ))}
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryScreen;
