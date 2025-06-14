
import React from "react";
import { Lock, CheckCircle, BookOpen, Clock } from "lucide-react";

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string;
    lessonCount: number;
    duration: string;
    isLocked: boolean;
    progress: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
  };
  onClick: (moduleId: string, isLocked: boolean) => void;
  getDifficultyColor: (difficulty: string, isLocked: boolean) => string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onClick,
  getDifficultyColor,
}) => (
  <button
    key={module.id}
    onClick={() => onClick(module.id, module.isLocked)}
    disabled={module.isLocked}
    className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
      module.isLocked
        ? "bg-slate-800/20 border-slate-700/20 cursor-not-allowed opacity-50"
        : module.progress === 100
        ? "bg-gradient-to-r from-green-600/20 to-green-500/10 border-green-600/30 hover:border-green-500/50"
        : module.progress > 0
        ? "bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-blue-600/30 hover:border-blue-500/50 hover:scale-[1.02]"
        : "bg-gradient-to-r from-slate-700/30 to-slate-600/20 border-slate-600/30 hover:border-slate-500/50 hover:scale-[1.02]"
    }`}
  >
    <div className="flex items-center space-x-4">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          module.isLocked
            ? "bg-slate-700/30 text-slate-500"
            : module.progress === 100
            ? "bg-green-600/20 text-green-400"
            : module.progress > 0
            ? "bg-blue-600/20 text-blue-400"
            : "bg-slate-600/20 text-slate-400"
        }`}
      >
        {module.isLocked ? (
          <Lock className="w-5 h-5" />
        ) : module.progress === 100 ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <BookOpen className="w-5 h-5" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-1">
          <h5
            className={`font-medium ${
              module.isLocked ? "text-slate-500" : "text-white"
            }`}
          >
            {module.title}
          </h5>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
              module.difficulty,
              module.isLocked
            )}`}
          >
            {module.difficulty}
          </div>
        </div>
        <p
          className={`text-sm mb-2 ${
            module.isLocked ? "text-slate-600" : "text-slate-300"
          }`}
        >
          {module.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs">
            <div
              className={`flex items-center space-x-1 ${
                module.isLocked ? "text-slate-600" : "text-slate-400"
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>{module.lessonCount} lessons</span>
            </div>
            <div
              className={`flex items-center space-x-1 ${
                module.isLocked ? "text-slate-600" : "text-slate-400"
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>{module.duration}</span>
            </div>
          </div>
          {module.progress > 0 && !module.isLocked && (
            <div className="text-xs text-slate-400">
              {module.progress}% complete
            </div>
          )}
        </div>
        {!module.isLocked && module.progress > 0 && (
          <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                module.progress === 100 ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${module.progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  </button>
);

export default ModuleCard;
