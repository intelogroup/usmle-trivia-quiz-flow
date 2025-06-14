
import React from "react";
import ModuleCard from "./ModuleCard";

interface Module {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  duration: string;
  isLocked: boolean;
  progress: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface GrandLessonDetailProps {
  grandLesson: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    color: string;
    totalModules: number;
    completedModules: number;
    totalXP: number;
    earnedXP: number;
    estimatedTime: string;
    modules: Module[];
  };
  onBack: () => void;
  onModuleClick: (moduleId: string, isLocked: boolean) => void;
  getDifficultyColor: (difficulty: string, isLocked: boolean) => string;
}

const GrandLessonDetail: React.FC<GrandLessonDetailProps> = ({
  grandLesson,
  onBack,
  onModuleClick,
  getDifficultyColor,
}) => (
  <div className="space-y-4 animate-fade-in">
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-sm font-bold text-white">
            {grandLesson.completedModules}/{grandLesson.totalModules}
          </div>
          <div className="text-xs text-slate-400">Modules</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-blue-400">
            {grandLesson.estimatedTime}
          </div>
          <div className="text-xs text-slate-400">Duration</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-green-400">
            {Math.round(
              (grandLesson.completedModules / grandLesson.totalModules) * 100
            )}
            %
          </div>
          <div className="text-xs text-slate-400">Complete</div>
        </div>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
        <div
          className={`bg-gradient-to-r ${grandLesson.color} h-2 rounded-full transition-all duration-500`}
          style={{
            width: `${
              (grandLesson.completedModules / grandLesson.totalModules) * 100
            }%`,
          }}
        />
      </div>
    </div>
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="p-4 space-y-3">
        <h4 className="text-sm font-medium text-slate-300 mb-3">
          Available Modules
        </h4>
        {grandLesson.modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onClick={onModuleClick}
            getDifficultyColor={getDifficultyColor}
          />
        ))}
      </div>
    </div>
  </div>
);

export default GrandLessonDetail;
