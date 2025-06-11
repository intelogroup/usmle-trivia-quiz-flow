
import { getWeakestSubjects } from "@/utils/dataStore";
import { Activity, Heart, Bone, Pill, Bug, Shield, LucideIcon } from "lucide-react";

interface WeakestSubjectsProps {
  onNavigate: (screen: string) => void;
}

const WeakestSubjects = ({ onNavigate }: WeakestSubjectsProps) => {
  const weakestSubjects = getWeakestSubjects();

  const getSubjectIcon = (subject: string): LucideIcon => {
    const iconMap: { [key: string]: LucideIcon } = {
      'Pathology': Activity,
      'Physiology': Heart,
      'Anatomy': Bone,
      'Pharmacology': Pill,
      'Microbiology': Bug,
      'Immunology': Shield
    };
    return iconMap[subject] || Activity;
  };

  const getSubjectColor = (score: number) => {
    if (score < 70) return 'bg-red-600 hover:bg-red-700';
    if (score < 80) return 'bg-yellow-600 hover:bg-yellow-700';
    return 'bg-green-600 hover:bg-green-700';
  };

  if (weakestSubjects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Areas for Improvement</h3>
      <div className="space-y-3">
        {weakestSubjects.map((subject, index) => {
          const SubjectIcon = getSubjectIcon(subject.subject);
          
          return (
            <div key={index} className="bg-slate-800/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${getSubjectColor(subject.score)} rounded-lg flex items-center justify-center shadow-sm`}>
                    <SubjectIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{subject.subject}</h4>
                    <p className="text-sm text-slate-400">{subject.score}% average • {subject.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('category')}
                  className={`${getSubjectColor(subject.score)} text-white px-3 py-1 rounded-lg text-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900`}
                  aria-label={`Practice ${subject.subject}`}
                >
                  Practice
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeakestSubjects;
