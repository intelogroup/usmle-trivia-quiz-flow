
import { Crown, Medal, Award, Trophy, TrendingUp, Star } from "lucide-react";

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
      case 1: return "from-yellow-400 to-yellow-600";
      case 2: return "from-gray-300 to-gray-500";
      case 3: return "from-orange-400 to-orange-600";
      default: return "from-slate-600 to-slate-700";
    }
  };

  const getRankIcon = (rank: number, badge: any) => {
    if (badge) {
      const BadgeIcon = badge;
      return <BadgeIcon className={`w-6 h-6 ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : 'text-orange-400'}`} />;
    }
    return <span className={`text-lg font-bold ${rank <= 3 ? 'text-white' : 'text-slate-400'}`}>{rank}</span>;
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return "h-20";
      case 2: return "h-16";
      case 3: return "h-12";
      default: return "h-8";
    }
  };

  return (
    <div className="p-4 pb-20 space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Global Rankings
          </h1>
        </div>
        <p className="text-slate-300">Compete with medical students worldwide</p>
        
        {/* Filter Tabs */}
        <div className="flex justify-center space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">All Time</button>
          <button className="bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm">This Week</button>
          <button className="bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm">This Month</button>
        </div>
      </div>

      {/* Enhanced Podium */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-center items-end space-x-6 mb-8">
          {/* 2nd Place */}
          <div className="text-center relative">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-3 shadow-lg ring-4 ring-gray-300/30">
              <span className="text-3xl">👩‍⚕️</span>
            </div>
            <div className="bg-gradient-to-br from-gray-500 to-gray-700 text-white px-4 py-3 rounded-xl shadow-lg">
              <div className="font-bold text-sm">MedStudent2023</div>
              <div className="text-xs opacity-90">9,720 pts</div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs">91%</span>
              </div>
            </div>
            <div className={`w-16 ${getPodiumHeight(2)} bg-gradient-to-t from-gray-600 to-gray-400 mt-3 rounded-t-xl flex items-start justify-center pt-2 shadow-lg`}>
              <Medal className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-3 shadow-2xl ring-4 ring-yellow-300/50 animate-pulse">
              <span className="text-4xl">🧠</span>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white px-5 py-4 rounded-xl shadow-xl">
              <div className="font-bold text-lg">DrBrainiac</div>
              <div className="text-sm opacity-90">9,850 pts</div>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">94%</span>
              </div>
            </div>
            <div className={`w-20 ${getPodiumHeight(1)} bg-gradient-to-t from-yellow-600 to-yellow-400 mt-3 rounded-t-xl flex items-start justify-center pt-3 shadow-xl`}>
              <Crown className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center relative">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-3 shadow-lg ring-4 ring-orange-300/30">
              <span className="text-3xl">👨‍⚕️</span>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white px-4 py-3 rounded-xl shadow-lg">
              <div className="font-bold text-sm">USMLEMaster</div>
              <div className="text-xs opacity-90">9,580 pts</div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs">89%</span>
              </div>
            </div>
            <div className={`w-16 ${getPodiumHeight(3)} bg-gradient-to-t from-orange-600 to-orange-400 mt-3 rounded-t-xl flex items-start justify-center pt-2 shadow-lg`}>
              <Award className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Leaderboard */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Full Rankings</h3>
        {leaderboardData.map((player) => (
          <div key={player.rank} className={`rounded-xl p-4 transition-all duration-200 hover:scale-[1.02] ${
            player.isCurrentUser 
              ? 'bg-gradient-to-r from-blue-900/50 to-blue-800/50 ring-2 ring-blue-500/50' 
              : 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600'
          } shadow-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${getRankColor(player.rank)} shadow-lg`}>
                  {getRankIcon(player.rank, player.badge)}
                </div>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg ${
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
                      <TrendingUp className="w-3 h-3" />
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
                <div className="text-2xl">
                  {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Your Position Card */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/30">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-blue-300">Your Current Position</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-3xl font-bold text-blue-400">#7</div>
            <div className="text-sm text-slate-300">
              <div>8,750 points</div>
              <div>300 points to rank up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
