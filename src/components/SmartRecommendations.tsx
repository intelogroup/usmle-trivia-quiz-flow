import { TrendingUp, Users, Brain, Clock } from "lucide-react";

interface SmartRecommendationsProps {
  onRecommendationSelect: (subjects: string[], systems: string[]) => void;
}

const SmartRecommendations = ({ onRecommendationSelect }: SmartRecommendationsProps) => {
  const recommendations = [
    {
      type: "weakness",
      title: "Strengthen Your Weak Areas",
      description: "Based on your recent performance",
      combinations: [
        {
          name: "Pathology Boost",
          subjects: ["Pathology"],
          systems: ["Cardiovascular System", "Respiratory System"],
          reason: "68% average score - needs focus",
          icon: "🎯",
          color: "from-red-500 to-red-600"
        }
      ]
    },
    {
      type: "popular",
      title: "Popular This Week",
      description: "What other students are practicing",
      combinations: [
        {
          name: "Cardio + Anatomy", 
          subjects: ["Anatomy", "Physiology"],
          systems: ["Cardiovascular System"],
          reason: "Trending among USMLE prep students",
          icon: "🔥",
          color: "from-orange-500 to-orange-600"
        },
        {
          name: "Neuro Fundamentals",
          subjects: ["Anatomy", "Physiology"],
          systems: ["Nervous System"],
          reason: "Most attempted combination",
          icon: "⭐",
          color: "from-purple-500 to-purple-600"
        }
      ]
    },
    {
      type: "learning-path",
      title: "Continue Your Learning Path",
      description: "Recommended next steps",
      combinations: [
        {
          name: "Advanced Physiology",
          subjects: ["Physiology", "Pathology"],
          systems: ["Endocrine System", "Nervous System"],
          reason: "Build on your anatomy foundation",
          icon: "📈",
          color: "from-blue-500 to-blue-600"
        }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "weakness": return <Brain className="w-4 h-4" />;
      case "popular": return <TrendingUp className="w-4 h-4" />;
      case "learning-path": return <Users className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "weakness": return "text-red-400";
      case "popular": return "text-orange-400";
      case "learning-path": return "text-blue-400";
      default: return "text-slate-400";
    }
  };

  return (
    <div className="space-y-6">
      {recommendations.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className={getTypeColor(section.type)}>
              {getTypeIcon(section.type)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <p className="text-sm text-slate-400">{section.description}</p>
            </div>
          </div>

          <div className="space-y-2">
            {section.combinations.map((combo, comboIndex) => (
              <button
                key={comboIndex}
                onClick={() => onRecommendationSelect(combo.subjects, combo.systems)}
                className="w-full bg-slate-700/70 hover:bg-slate-600/70 rounded-xl p-4 transition-all duration-200 border border-transparent hover:border-slate-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${combo.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-lg">{combo.icon}</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-white">{combo.name}</h4>
                      <p className="text-sm text-slate-400">{combo.reason}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {combo.subjects.map(subject => (
                          <span key={subject} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                            {subject}
                          </span>
                        ))}
                        {combo.systems.map(system => (
                          <span key={system} className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded-full">
                            {system.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartRecommendations;
