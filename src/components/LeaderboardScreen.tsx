
import { Crown, Medal, Award, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const LeaderboardScreen = () => {
  const leaderboardData = [
    { rank: 1, name: "DrBrainiac", points: 9850, avatar: "DB", badge: Crown, streak: 15, accuracy: 94 },
    { rank: 2, name: "MedStudent2023", points: 9720, avatar: "MS", badge: Medal, streak: 12, accuracy: 91 },
    { rank: 3, name: "USMLEMaster", points: 9580, avatar: "UM", badge: Award, streak: 8, accuracy: 89 },
    { rank: 4, name: "FutureMD", points: 9350, avatar: "FM", badge: null, streak: 6, accuracy: 87 },
    { rank: 5, name: "PathologyPro", points: 9200, avatar: "PP", badge: null, streak: 10, accuracy: 85 },
    { rank: 6, name: "AnatomyAce", points: 9050, avatar: "AA", badge: null, streak: 4, accuracy: 83 },
    { rank: 7, name: "You", points: 8750, avatar: "JK", badge: null, streak: 7, accuracy: 82, isCurrentUser: true },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-4 h-4 text-yellow-500" />;
      case 2: return <Medal className="w-4 h-4 text-gray-400" />;
      case 3: return <Award className="w-4 h-4 text-orange-400" />;
      default: return <span className="text-sm font-semibold text-gray-600">{rank}</span>;
    }
  };

  // Get top 3 in the order: 2nd, 1st, 3rd (for podium display)
  const podiumOrder = [leaderboardData[1], leaderboardData[0], leaderboardData[2]];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">Compete with medical students worldwide</p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <div className="flex justify-center items-end gap-4 mb-6">
          {podiumOrder.map((player, index) => {
            const isFirst = player.rank === 1;
            const cardHeight = isFirst ? "h-32" : "h-24";
            const avatarSize = isFirst ? "w-16 h-16" : "w-12 h-12";
            
            return (
              <div key={player.rank} className="flex flex-col items-center">
                {/* Avatar */}
                <div className="mb-3">
                  <Avatar className={`${avatarSize} ring-2 ${isFirst ? 'ring-yellow-400' : player.rank === 2 ? 'ring-gray-300' : 'ring-orange-300'}`}>
                    <AvatarImage src="" />
                    <AvatarFallback className={`text-white font-bold ${isFirst ? 'bg-yellow-500 text-lg' : player.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'}`}>
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Card */}
                <div className={`bg-white rounded-lg shadow-sm border p-4 ${cardHeight} ${isFirst ? 'w-24' : 'w-20'} flex flex-col justify-between items-center`}>
                  <div className="text-center">
                    {getRankIcon(player.rank)}
                  </div>
                  <div className="text-center">
                    <div className={`font-bold text-gray-900 ${isFirst ? 'text-sm' : 'text-xs'} truncate`}>
                      {player.name.length > 8 ? player.name.substring(0, 8) + '...' : player.name}
                    </div>
                    <div className={`text-gray-600 ${isFirst ? 'text-xs' : 'text-xs'} font-medium`}>
                      {player.points.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Rankings */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Rankings</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaderboardData.map((player) => (
            <div 
              key={player.rank} 
              className={`flex items-center justify-between px-4 py-4 ${
                player.isCurrentUser ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-8 flex justify-center">
                  {player.rank <= 3 ? getRankIcon(player.rank) : (
                    <span className="text-sm font-semibold text-gray-600">{player.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" />
                  <AvatarFallback className={`text-white font-medium ${
                    player.isCurrentUser ? 'bg-blue-500' : 'bg-gray-500'
                  }`}>
                    {player.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Name */}
                <div>
                  <div className={`font-semibold ${
                    player.isCurrentUser ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {player.name} {player.isCurrentUser && '(You)'}
                  </div>
                </div>
              </div>

              {/* Points */}
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {player.points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Position Summary */}
      {leaderboardData.find(p => p.isCurrentUser) && (
        <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Position</h3>
            <div className="flex items-center justify-center gap-4">
              <div className="text-2xl font-bold text-blue-600">#7</div>
              <div className="text-sm text-blue-700">
                <div className="font-medium">8,750 points</div>
                <div className="text-blue-600">300 points to rank up</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardScreen;
