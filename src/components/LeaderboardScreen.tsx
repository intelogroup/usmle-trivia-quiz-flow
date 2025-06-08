
import React, { useState } from "react";
import { Crown, Medal, Award, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getLeaderboard, getUserProfile } from "@/utils/dataStore";
import CountryFlag from "./CountryFlag";
import UserProfileModal from "./UserProfileModal";
import { LeaderboardEntry } from "@/utils/types";

const LeaderboardScreen = () => {
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const leaderboardData = getLeaderboard();
  const userProfile = getUserProfile();
  const currentUser = leaderboardData.find(player => player.isCurrentUser);

  const handleUserClick = (user: LeaderboardEntry) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-4 h-4 text-yellow-500" />;
      case 2: return <Medal className="w-4 h-4 text-gray-400" />;
      case 3: return <Award className="w-4 h-4 text-orange-400" />;
      default: return <span className="text-sm font-semibold text-slate-400">{rank}</span>;
    }
  };

  // Get top 3 in the order: 2nd, 1st, 3rd (for podium display)
  const podiumOrder = [leaderboardData[1], leaderboardData[0], leaderboardData[2]].filter(Boolean);

  const pointsToNextRank = currentUser && currentUser.rank > 1 
    ? leaderboardData[currentUser.rank - 2].points - currentUser.points 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-4 pb-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-slate-400">Compete with medical students worldwide</p>
      </div>

      {/* Top 3 Podium */}
      {podiumOrder.length === 3 && (
        <div className="mb-8">
          <div className="flex justify-center items-end gap-4 mb-6">
            {podiumOrder.map((player, index) => {
              const isFirst = player.rank === 1;
              const cardHeight = isFirst ? "h-36" : "h-28";
              const avatarSize = isFirst ? "w-16 h-16" : "w-12 h-12";
              
              return (
                <div 
                  key={player.rank} 
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 group"
                  onClick={() => handleUserClick(player)}
                >
                  {/* Avatar */}
                  <div className="mb-3 relative">
                    <Avatar className={`${avatarSize} ring-4 ${isFirst ? 'ring-yellow-400/50' : player.rank === 2 ? 'ring-gray-300/50' : 'ring-orange-300/50'} shadow-lg transition-all duration-300 group-hover:ring-4`}>
                      <AvatarImage src="" />
                      <AvatarFallback className={`text-white font-bold ${isFirst ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-lg' : player.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500' : 'bg-gradient-to-br from-orange-400 to-orange-500'}`}>
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 transition-transform duration-300 group-hover:scale-110">
                      <CountryFlag countryCode={player.country} size="sm" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-lg border border-slate-600/30 p-4 ${cardHeight} ${isFirst ? 'w-28' : 'w-24'} flex flex-col justify-between items-center hover:bg-slate-700/90 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                    <div className="text-center">
                      {getRankIcon(player.rank)}
                    </div>
                    <div className="text-center">
                      <div className={`font-bold text-white ${isFirst ? 'text-sm' : 'text-xs'} truncate`}>
                        {player.name.length > 8 ? player.name.substring(0, 8) + '...' : player.name}
                      </div>
                      <div className={`text-slate-400 ${isFirst ? 'text-xs' : 'text-xs'} font-medium`}>
                        {player.points.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full Rankings */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-lg border border-slate-600/30 overflow-hidden shadow-xl">
        <div className="px-4 py-4 bg-gradient-to-r from-slate-700/80 to-slate-600/80 border-b border-slate-600/30">
          <h3 className="text-lg font-semibold text-white">Rankings</h3>
        </div>
        
        <div className="divide-y divide-slate-600/30">
          {leaderboardData.map((player) => (
            <div 
              key={player.rank} 
              className={`flex items-center justify-between px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                player.isCurrentUser ? 'bg-blue-900/50 hover:bg-blue-800/60 border-l-4 border-blue-400' : 'hover:bg-slate-700/50'
              }`}
              onClick={() => handleUserClick(player)}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-8 flex justify-center">
                  {player.rank <= 3 ? getRankIcon(player.rank) : (
                    <span className="text-sm font-semibold text-slate-400">{player.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="relative group">
                  <Avatar className="w-10 h-10 ring-2 ring-slate-600/50 transition-all duration-200 group-hover:ring-blue-400/50">
                    <AvatarImage src="" />
                    <AvatarFallback className={`text-white font-medium transition-all duration-200 ${
                      player.isCurrentUser ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-slate-600 to-slate-700'
                    }`}>
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 transition-transform duration-200 group-hover:scale-110">
                    <CountryFlag countryCode={player.country} size="sm" />
                  </div>
                </div>

                {/* Name and Info */}
                <div>
                  <div className={`font-semibold transition-colors duration-200 ${
                    player.isCurrentUser ? 'text-blue-300' : 'text-white'
                  }`}>
                    {player.name} {player.isCurrentUser && '(You)'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {player.university} • {player.year} Year
                  </div>
                </div>
              </div>

              {/* Points and Stats */}
              <div className="text-right">
                <div className="font-semibold text-white">
                  {player.points.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>{player.accuracy}% acc</span>
                  <span>•</span>
                  <span>{player.streak}d streak</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Position Summary */}
      {currentUser && (
        <div className="mt-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-lg border border-blue-500/30 p-4 shadow-xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Your Position</h3>
            <div className="flex items-center justify-center gap-4">
              <div className="text-2xl font-bold text-blue-400">#{currentUser.rank}</div>
              <div className="text-sm text-blue-300">
                <div className="font-medium">{currentUser.points.toLocaleString()} points</div>
                {pointsToNextRank > 0 && (
                  <div className="text-blue-400">{pointsToNextRank.toLocaleString()} points to rank up</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      <UserProfileModal 
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LeaderboardScreen;
