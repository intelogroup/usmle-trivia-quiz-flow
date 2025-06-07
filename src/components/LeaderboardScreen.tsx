
import { Crown, Medal, Award, Trophy } from "lucide-react";

const LeaderboardScreen = () => {
  const leaderboardData = [
    { rank: 1, name: "DrBrainiac", points: 9850, avatar: "🧠", badge: Crown },
    { rank: 2, name: "MedStudent2023", points: 9720, avatar: "👩‍⚕️", badge: Medal },
    { rank: 3, name: "USMLEMaster", points: 9580, avatar: "👨‍⚕️", badge: Award },
    { rank: 4, name: "FutureMD", points: 9350, avatar: "👩‍🎓", badge: null },
    { rank: 5, name: "PathologyPro", points: 9200, avatar: "🔬", badge: null },
    { rank: 6, name: "AnatomyAce", points: 9050, avatar: "🦴", badge: null },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-400";
      case 2: return "text-gray-300";
      case 3: return "text-orange-400";
      default: return "text-slate-400";
    }
  };

  const getRankIcon = (rank: number, badge: any) => {
    if (badge) {
      const BadgeIcon = badge;
      return <BadgeIcon className={`w-6 h-6 ${getRankColor(rank)}`} />;
    }
    return <span className={`text-lg font-bold ${getRankColor(rank)}`}>{rank}</span>;
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl font-bold">Global Rankings</h1>
        </div>
        <p className="text-slate-300">Compete with players worldwide</p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end space-x-4 mb-8">
        {/* 2nd Place */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl">👩‍⚕️</span>
          </div>
          <div className="bg-gray-600 text-white px-3 py-2 rounded-lg">
            <div className="text-sm font-semibold">MedStudent2023</div>
            <div className="text-xs">9,720 pts</div>
          </div>
          <div className="w-12 h-8 bg-gray-500 mt-2 rounded-t-lg flex items-center justify-center">
            <span className="text-white font-bold">2</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="text-center">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
            <span className="text-3xl">🧠</span>
          </div>
          <div className="bg-yellow-500 text-white px-3 py-2 rounded-lg">
            <div className="font-semibold">DrBrainiac</div>
            <div className="text-sm">9,850 pts</div>
          </div>
          <div className="w-12 h-12 bg-yellow-400 mt-2 rounded-t-lg flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* 3rd Place */}
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl">👨‍⚕️</span>
          </div>
          <div className="bg-orange-600 text-white px-3 py-2 rounded-lg">
            <div className="text-sm font-semibold">USMLEMaster</div>
            <div className="text-xs">9,580 pts</div>
          </div>
          <div className="w-12 h-6 bg-orange-500 mt-2 rounded-t-lg flex items-center justify-center">
            <span className="text-white font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="space-y-3">
        {leaderboardData.map((player) => (
          <div key={player.rank} className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  {getRankIcon(player.rank, player.badge)}
                </div>
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-xl">{player.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{player.name}</h3>
                  <p className="text-sm text-slate-400">{player.points.toLocaleString()} pts</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardScreen;
