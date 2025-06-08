
import { BookOpen, PlayCircle, FileText, Award } from "lucide-react";

interface LearnScreenProps {
  onNavigate: (screen: string) => void;
}

const LearnScreen = ({ onNavigate }: LearnScreenProps) => {
  const learningResources = [
    {
      id: 'video-lectures',
      icon: PlayCircle,
      title: 'Video Lectures',
      description: 'Watch comprehensive medical lectures',
      color: 'bg-red-600',
      action: () => console.log('Open video lectures')
    },
    {
      id: 'study-notes',
      icon: FileText,
      title: 'Study Notes',
      description: 'Access curated study materials',
      color: 'bg-blue-600',
      action: () => console.log('Open study notes')
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
