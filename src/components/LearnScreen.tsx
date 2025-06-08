
import { BookOpen, FileText, Award, ChevronRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface LearnScreenProps {
  onNavigate: (screen: string) => void;
}

interface Category {
  id: string;
  name: string;
  emoji: string;
  subcategories: string[];
}

const LearnScreen = ({ onNavigate }: LearnScreenProps) => {
  const [showCategories, setShowCategories] = useState(false);

  const categories: Category[] = [
    {
      id: 'anatomy',
      name: 'Anatomy',
      emoji: '🫀',
      subcategories: ['Cardiovascular System', 'Respiratory System', 'Nervous System', 'Musculoskeletal System', 'Digestive System', 'Urogenital System', 'Endocrine System', 'Integumentary System']
    },
    {
      id: 'physiology',
      name: 'Physiology',
      emoji: '⚡',
      subcategories: ['Cardiac Physiology', 'Respiratory Physiology', 'Renal Physiology', 'Neurophysiology', 'Endocrine Physiology', 'Gastrointestinal Physiology', 'Reproductive Physiology']
    },
    {
      id: 'pathology',
      name: 'Pathology',
      emoji: '🔬',
      subcategories: ['General Pathology', 'Systemic Pathology', 'Neoplasia', 'Inflammation', 'Cell Injury', 'Genetic Disorders', 'Infectious Diseases']
    },
    {
      id: 'pharmacology',
      name: 'Pharmacology',
      emoji: '💊',
      subcategories: ['Autonomic Drugs', 'CNS Drugs', 'Cardiovascular Drugs', 'Antimicrobials', 'Endocrine Drugs', 'Anti-inflammatory Drugs', 'Chemotherapy']
    },
    {
      id: 'microbiology',
      name: 'Microbiology',
      emoji: '🦠',
      subcategories: ['Bacteriology', 'Virology', 'Mycology', 'Parasitology', 'Immunology', 'Clinical Microbiology', 'Antimicrobial Resistance']
    },
    {
      id: 'biochemistry',
      name: 'Biochemistry',
      emoji: '🧬',
      subcategories: ['Metabolism', 'Enzymes', 'Proteins', 'Carbohydrates', 'Lipids', 'Nucleic Acids', 'Vitamins & Minerals']
    },
    {
      id: 'internal-medicine',
      name: 'Internal Medicine',
      emoji: '🩺',
      subcategories: ['Cardiology', 'Pulmonology', 'Gastroenterology', 'Nephrology', 'Endocrinology', 'Hematology', 'Infectious Disease', 'Rheumatology']
    },
    {
      id: 'surgery',
      name: 'Surgery',
      emoji: '🔪',
      subcategories: ['General Surgery', 'Orthopedic Surgery', 'Neurosurgery', 'Cardiac Surgery', 'Plastic Surgery', 'Urological Surgery', 'ENT Surgery']
    },
    {
      id: 'pediatrics',
      name: 'Pediatrics',
      emoji: '👶',
      subcategories: ['Neonatology', 'Pediatric Cardiology', 'Pediatric Neurology', 'Pediatric Endocrinology', 'Pediatric Surgery', 'Developmental Pediatrics']
    },
    {
      id: 'obstetrics-gynecology',
      name: 'Obstetrics & Gynecology',
      emoji: '🤱',
      subcategories: ['Obstetrics', 'Gynecology', 'Reproductive Endocrinology', 'Maternal-Fetal Medicine', 'Gynecologic Oncology', 'Family Planning']
    },
    {
      id: 'psychiatry',
      name: 'Psychiatry',
      emoji: '🧠',
      subcategories: ['Mood Disorders', 'Anxiety Disorders', 'Psychotic Disorders', 'Substance Use Disorders', 'Personality Disorders', 'Child Psychiatry']
    },
    {
      id: 'emergency-medicine',
      name: 'Emergency Medicine',
      emoji: '🚑',
      subcategories: ['Trauma', 'Cardiac Emergencies', 'Respiratory Emergencies', 'Toxicology', 'Shock', 'Critical Care', 'Procedures']
    }
  ];

  const learningResources = [
    {
      id: 'quick-lessons',
      icon: FileText,
      title: 'Quick Lessons',
      description: 'Access curated study materials',
      color: 'bg-blue-600',
      action: () => setShowCategories(true)
    },
    {
      id: 'flashcards',
      icon: BookOpen,
      title: 'Flashcards',
      description: 'Review key concepts quickly',
      color: 'bg-green-600',
      action: () => console.log('Open flashcards')
    },
    {
      id: 'practice-tests',
      icon: Award,
      title: 'Practice Tests',
      description: 'Take comprehensive practice exams',
      color: 'bg-purple-600',
      action: () => onNavigate('quiz')
    }
  ];

  const handleSubcategoryClick = (category: string, subcategory: string) => {
    console.log(`Selected: ${category} - ${subcategory}`);
    // Here you would navigate to the specific lesson content
  };

  if (showCategories) {
    return (
      <div className="p-4 pb-20 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowCategories(false)}
            className="text-white hover:text-slate-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Quick Lessons</h1>
            <p className="text-slate-300">Choose a subject to study</p>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="bg-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                </div>
              </div>
              <div className="p-2">
                {category.subcategories.map((subcategory, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubcategoryClick(category.name, subcategory)}
                    className="w-full flex items-center justify-between p-3 hover:bg-slate-700 rounded-lg transition-colors text-left"
                  >
                    <span className="text-slate-300">{subcategory}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Learn</h1>
        <p className="text-slate-300">Expand your medical knowledge</p>
      </div>

      {/* Learning Resources */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Learning Resources</h3>
        <div className="grid grid-cols-1 gap-3">
          {learningResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <button
                key={resource.id}
                onClick={resource.action}
                className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-left transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{resource.title}</h4>
                    <p className="text-sm text-slate-400">{resource.description}</p>
                  </div>
                  {resource.id === 'quick-lessons' && (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Topics */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Continue Learning</h3>
        <div className="bg-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xl">🧬</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">Pathology</p>
              <p className="text-sm text-slate-400">Last studied 2 days ago</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('quiz')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
          >
            Continue Studying
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnScreen;
