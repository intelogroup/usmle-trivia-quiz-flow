
const ProgressCard = () => {
  return (
    <div className="bg-slate-800 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm">🏆</span>
          </div>
          <span className="font-semibold">Level 1</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-green-400">⭐</span>
          <span className="text-slate-300">0 XP</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">0 / 100 XP</span>
          <span className="text-blue-400">0%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
        </div>
        <p className="text-sm text-slate-400 text-center">100 XP to Level 2</p>
      </div>
    </div>
  );
};

export default ProgressCard;
