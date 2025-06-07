
import { Crown, Medal, Award, Trophy, Star } from "lucide-react";

const LeaderboardScreen = () => {
  const leaderboardData = [
    { rank: 1, name: "DrBrainiac", points: 9850, avatar: "🧠", badge: Crown, streak: 15, accuracy: 94 },
    { rank: 2, name: "MedStudent2023", points: 9720, avatar: "👩‍⚕️", badge: Medal, streak: 12, accuracy: 91 },
    { rank: 3, name: "USMLEMaster", points: 9580, avatar: "👨‍⚕️", badge: Award, streak: 8, accuracy: 89 },
    { rank: 4, name: "FutureMD", points: 9350, avatar: "👩‍🎓", badge: null, streak: 6, accuracy: 87 },
    { rank: 5, name: "PathologyPro", points: 9200, avatar: "🔬", badge: null, streak: 10, accuracy: 85 },
    { rank: 6, name: "AnatomyAce", points: 9050, avatar: "🦴", badge: null, streak: 4, accuracy: 83 },
    { rank: 7, name: "You", points: 8750, avatar: "JK", badge: null, streak: 7, accuracy: 82, isCurrentUser: true },
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
      return <BadgeIcon className={`w-5 h-5 ${getRankColor(rank)}`} />;
    }
    return <span className={`text-sm font-bold ${getRankColor(rank)}`}>{rank}</span>;
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-slate-400">Compete with medical students worldwide</p>
      </div>

      {/* Enhanced Podium */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5"></div>
        
        <div className="relative flex justify-center items-end space-x-4 mb-4">
          {/* 2nd Place */}
          <div className="text-center transform transition-transform hover:scale-105">
            {/* Avatar */}
            <div className="relative mb-3">
              <div className="w-16 h-16 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-300">
                <span className="text-2xl">👩‍⚕️</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <Medal className="w-4 h-4 text-gray-700" />
              </div>
            </div>
            
            {/* Info Card */}
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 px-3 py-2 rounded-lg shadow-md mb-2 min-w-[100px]">
              <div className="font-bold text-sm">MedStudent2023</div>
              <div className="text-xs text-gray-600">9,720 pts</div>
            </div>
            
            {/* Podium Base */}
            <div className="w-20 h-16 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-xl shadow-lg flex items-center justify-center border-t-2 border-gray-200">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
          </div>

          {/* 1st Place - Taller */}
          <div className="text-center transform transition-transform hover:scale-105">
            {/* Avatar */}
            <div className="relative mb-3">
              <div className="w-20 h-20 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl border-3 border-yellow-300 ring-2 ring-yellow-200">
                <span className="text-3xl">🧠</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-5 h-5 text-yellow-800" />
              </div>
            </div>
            
            {/* Info Card */}
            <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 text-yellow-900 px-4 py-3 rounded-lg shadow-lg mb-2 min-w-[120px]">
              <div className="font-black text-base">DrBrainiac</div>
              <div className="text-sm font-semibold">9,850 pts</div>
            </div>
            
            {/* Podium Base - Tallest */}
            <div className="w-24 h-20 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-xl shadow-xl flex items-center justify-center border-t-3 border-yellow-300">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center transform transition-transform hover:scale-105">
            {/* Avatar */}
            <div className="relative mb-3">
              <div className="w-16 h-16 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-orange-300">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-orange-800" />
              </div>
            </div>
            
            {/* Info Card */}
            <div className="bg-gradient-to-b from-orange-100 to-orange-200 text-orange-800 px-3 py-2 rounded-lg shadow-md mb-2 min-w-[100px]">
              <div className="font-bold text-sm">USMLEMaster</div>
              <div className="text-xs text-orange-600">9,580 pts</div>
            </div>
            
            {/* Podium Base - Shortest */}
            <div className="w-20 h-12 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-xl shadow-lg flex items-center justify-center border-t-2 border-orange-300">
              <span className="text-xl font-bold text-white">3</span>
            </div>
          </div>
        </div>

        {/* Podium Floor */}
        <div className="h-3 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-b-lg shadow-inner"></div>
      </div>

      {/* Full Rankings */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">All Rankings</h3>
        {leaderboardData.map((player) => (
          <div key={player.rank} className={`rounded-xl p-4 ${
            player.isCurrentUser 
              ? 'bg-blue-900/30 border border-blue-500/30' 
              : 'bg-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                  {getRankIcon(player.rank, player.badge)}
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  player.isCurrentUser ? 'bg-blue-600 text-white font-bold' : 'bg-slate-600'
                }`}>
                  {player.isCurrentUser ? player.avatar : <span>{player.avatar}</span>}
                </div>
                <div>
                  <h3 className={`font-semibold ${player.isCurrentUser ? 'text-blue-300' : 'text-white'}`}>
                    {player.name} {player.isCurrentUser && '(You)'}
                  </h3>
                  <div className="flex items-center space-x-3 text-sm text-slate-400">
                    <span>{player.points.toLocaleString()} pts</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span>{player.accuracy}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-orange-400">🔥</span>
                      <span>{player.streak}</span>
                    </div>
                  </div>
                </div>
              </div>
              {player.rank <= 3 && (
                <div className="text-xl">
                  {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Your Position */}
      <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-blue-300">Your Position</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-2xl font-bold text-blue-400">#7</div>
            <div className="text-sm text-slate-300">
              <div>8,750 points</div>
              <div className="text-xs text-slate-400">300 points to rank up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
