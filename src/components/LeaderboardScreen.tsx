
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
      return <BadgeIcon className={`w-5 h-5 ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : 'text-orange-400'}`} />;
    }
    return <span className={`text-sm font-bold ${rank <= 3 ? 'text-white' : 'text-slate-400'}`}>{rank}</span>;
  };

  return (
    <div className="p-4 pb-20 space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Leaderboard
          </h1>
        </div>
        <p className="text-slate-400 text-sm">Compete with medical students worldwide</p>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex justify-center items-end space-x-4">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
              <span className="text-2xl">👩‍⚕️</span>
            </div>
            <div className="bg-slate-700 text-white px-3 py-2 rounded-lg text-center">
              <div className="font-semibold text-sm">MedStudent2023</div>
              <div className="text-xs text-slate-300">9,720 pts</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-t from-gray-600 to-gray-400 mt-2 rounded-t-lg flex items-center justify-center">
              <Medal className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2 shadow-xl ring-2 ring-yellow-300/50">
              <span className="text-3xl">🧠</span>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white px-4 py-3 rounded-lg text-center">
              <div className="font-bold">DrBrainiac</div>
              <div className="text-sm">9,850 pts</div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-t from-yellow-600 to-yellow-400 mt-2 rounded-t-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <div className="bg-slate-700 text-white px-3 py-2 rounded-lg text-center">
              <div className="font-semibold text-sm">USMLEMaster</div>
              <div className="text-xs text-slate-300">9,580 pts</div>
            </div>
            <div className="w-12 h-10 bg-gradient-to-t from-orange-600 to-orange-400 mt-2 rounded-t-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Full Rankings */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-200">Rankings</h3>
        {leaderboardData.map((player) => (
          <div key={player.rank} className={`rounded-xl p-4 transition-all duration-200 ${
            player.isCurrentUser 
              ? 'bg-blue-900/30 ring-1 ring-blue-500/50' 
              : 'bg-slate-800/50 hover:bg-slate-700/50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${getRankColor(player.rank)}`}>
                  {getRankIcon(player.rank, player.badge)}
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
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

      {/* Your Position Summary */}
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
