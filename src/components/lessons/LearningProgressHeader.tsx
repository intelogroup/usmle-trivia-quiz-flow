
import React from "react";
import { CheckCircle, BookOpen, Lock, Target } from "lucide-react";

const LearningProgressHeader: React.FC = () => (
  <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-slate-700/50">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold text-white">Learning Progress</h2>
      <div className="flex items-center space-x-1 text-blue-400">
        <Target className="w-4 h-4" />
        <span className="text-sm font-medium">Level 3</span>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <div className="w-12 h-12 bg-green-600/20 border border-green-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
          <CheckCircle className="w-6 h-6 text-green-400" />
        </div>
        <div className="text-xl font-bold text-green-400">4</div>
        <div className="text-xs text-slate-400">Completed</div>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
          <BookOpen className="w-6 h-6 text-blue-400" />
        </div>
        <div className="text-xl font-bold text-blue-400">8</div>
        <div className="text-xs text-slate-400">In Progress</div>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-slate-600/20 border border-slate-600/30 rounded-xl flex items-center justify-center mx-auto mb-2">
          <Lock className="w-6 h-6 text-slate-400" />
        </div>
        <div className="text-xl font-bold text-slate-400">19</div>
        <div className="text-xs text-slate-400">Locked</div>
      </div>
    </div>
  </div>
);

export default LearningProgressHeader;
