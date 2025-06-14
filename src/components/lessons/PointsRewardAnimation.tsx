
import { Trophy, Zap } from 'lucide-react';

interface PointsRewardAnimationProps {
  show: boolean;
  points: number;
}

const PointsRewardAnimation = ({ show, points }: PointsRewardAnimationProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-scale-in flex items-center space-x-3">
        <Trophy className="w-6 h-6 fill-current animate-pulse" />
        <span className="font-bold text-lg">+{points} Points!</span>
        <Zap className="w-5 h-5 fill-current" />
      </div>
    </div>
  );
};

export default PointsRewardAnimation;
