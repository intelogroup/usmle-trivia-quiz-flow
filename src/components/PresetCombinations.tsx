
import { BookOpen, Activity, Clock, Target } from "lucide-react";

interface PresetCombinationsProps {
  onPresetSelect: (subjects: string[], systems: string[]) => void;
}

const PresetCombinations = ({ onPresetSelect }: PresetCombinationsProps) => {
  const presets = [
    {
      name: "Cardio Focus",
      description: "Heart & circulation basics",
      systems: ["Cardiovascular System"],
      subjects: ["Anatomy", "Physiology"],
      difficulty: "Beginner",
      estimatedTime: "8 min",
      color: "from-red-500 to-red-600",
      icon: "❤️",
      questionCount: 15
    },
    {
      name: "Respiratory Deep Dive", 
      description: "Breathing & lung function",
      systems: ["Respiratory System"],
      subjects: ["Anatomy", "Physiology", "Pathology"],
      difficulty: "Intermediate",
      estimatedTime: "12 min",
      color: "from-blue-500 to-blue-600",
      icon: "🫁",
      questionCount: 20
    },
    {
      name: "Neuro Essentials",
      description: "Brain & nervous system",
      systems: ["Nervous System"],
      subjects: ["Anatomy", "Physiology"],
      difficulty: "Intermediate",
      estimatedTime: "10 min", 
      color: "from-purple-500 to-purple-600",
      icon: "🧠",
      questionCount: 18
    },
    {
      name: "GI Fundamentals",
      description: "Digestive system basics",
      systems: ["Gastrointestinal System"],
      subjects: ["Anatomy", "Physiology"],
      difficulty: "Beginner",
      estimatedTime: "7 min",
      color: "from-green-500 to-green-600", 
      icon: "🫃",
      questionCount: 12
    },
    {
      name: "Multi-System Pharmacology",
      description: "Drug mechanisms across systems",
      systems: ["Cardiovascular System", "Nervous System"],
      subjects: ["Pharmacology"],
      difficulty: "Advanced",
      estimatedTime: "15 min",
      color: "from-orange-500 to-orange-600",
      icon: "💊",
      questionCount: 25
    },
    {
      name: "Pathology Review",
      description: "Disease mechanisms across systems",
      systems: ["Cardiovascular System", "Respiratory System"],
      subjects: ["Pathology"],
      difficulty: "Advanced", 
      estimatedTime: "18 min",
      color: "from-pink-500 to-pink-600",
      icon: "🔬",
      questionCount: 30
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400 bg-green-900/30";
      case "Intermediate": return "text-yellow-400 bg-yellow-900/30";
      case "Advanced": return "text-red-400 bg-red-900/30";
      default: return "text-slate-400 bg-slate-900/30";
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-white">Quick Start</h3>
        <p className="text-sm text-slate-400">Popular system + subject combinations</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => onPresetSelect(preset.subjects, preset.systems)}
            className="bg-slate-700/70 hover:bg-slate-600/70 rounded-xl p-4 transition-all duration-200 border border-transparent hover:border-slate-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${preset.color} rounded-xl flex items-center justify-center`}>
                  <span className="text-xl">{preset.icon}</span>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-white">{preset.name}</h4>
                  <p className="text-sm text-slate-400">{preset.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {preset.systems.map(system => (
                      <span key={system} className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded-full">
                        {system.split(' ')[0]}
                      </span>
                    ))}
                    {preset.subjects.map(subject => (
                      <span key={subject} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                        {subject}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(preset.difficulty)}`}>
                      {preset.difficulty}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{preset.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <Target className="w-3 h-3" />
                      <span>{preset.questionCount}Q</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetCombinations;
