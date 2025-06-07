
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
      default: return <span className="text-sm font-semibold text-muted-foreground">{rank}</span>;
    }
  };

  // Get top 3 in the order: 2nd, 1st, 3rd (for podium display)
  const podiumOrder = [leaderboardData[1], leaderboardData[0], leaderboardData[2]];

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">Compete with medical students worldwide</p>
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
                  <Avatar className={`${avatarSize} ring-2 ${isFirst ? 'ring-yellow-400' : player.rank === 2 ? 'ring-gray-300' : 'ring-orange-300'} shadow-lg`}>
                    <AvatarImage src="" />
                    <AvatarFallback className={`text-white font-bold ${isFirst ? 'bg-yellow-500 text-lg' : player.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'}`}>
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Card */}
                <div className={`glass-card ${cardHeight} ${isFirst ? 'w-24' : 'w-20'} flex flex-col justify-between items-center p-4`}>
                  <div className="text-center">
                    {getRankIcon(player.rank)}
                  </div>
                  <div className="text-center">
                    <div className={`font-bold text-foreground ${isFirst ? 'text-sm' : 'text-xs'} truncate`}>
                      {player.name.length > 8 ? player.name.substring(0, 8) + '...' : player.name}
                    </div>
                    <div className={`text-muted-foreground ${isFirst ? 'text-xs' : 'text-xs'} font-medium`}>
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
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-muted/50 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Rankings</h3>
        </div>
        
        <div className="divide-y divide-border">
          {leaderboardData.map((player) => (
            <div 
              key={player.rank} 
              className={`flex items-center justify-between px-4 py-4 transition-colors ${
                player.isCurrentUser ? 'bg-accent/50' : 'hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-8 flex justify-center">
                  {player.rank <= 3 ? getRankIcon(player.rank) : (
                    <span className="text-sm font-semibold text-muted-foreground">{player.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <Avatar className="w-10 h-10 shadow-md">
                  <AvatarImage src="" />
                  <AvatarFallback className={`text-white font-medium ${
                    player.isCurrentUser ? 'bg-primary' : 'bg-muted-foreground'
                  }`}>
                    {player.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Name */}
                <div>
                  <div className={`font-semibold ${
                    player.isCurrentUser ? 'text-primary' : 'text-foreground'
                  }`}>
                    {player.name} {player.isCurrentUser && '(You)'}
                  </div>
                </div>
              </div>

              {/* Points */}
              <div className="text-right">
                <div className="font-semibold text-foreground">
                  {player.points.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Position Summary */}
      {leaderboardData.find(p => p.isCurrentUser) && (
        <div className="mt-6 glass-card rounded-xl p-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Position</h3>
            <div className="flex items-center justify-center gap-4">
              <div className="text-2xl font-bold text-primary">#7</div>
              <div className="text-sm text-muted-foreground">
                <div className="font-medium">8,750 points</div>
                <div className="text-primary">300 points to rank up</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardScreen;
