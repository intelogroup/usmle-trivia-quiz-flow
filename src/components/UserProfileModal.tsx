
import React from 'react';
import { X, Calendar, Clock, Trophy, Target, BookOpen, TrendingUp, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import CountryFlag from './CountryFlag';
import { LeaderboardEntry } from '@/utils/types';

interface UserProfileModalProps {
  user: LeaderboardEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Safety checks for undefined arrays
  const strongestSubjects = user.strongestSubjects || [];
  const weakestSubjects = user.weakestSubjects || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-600/50 shadow-2xl">
        <DialogHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <X className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
          
          {/* Header Section */}
          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className="relative group">
              <Avatar className="w-20 h-20 ring-4 ring-blue-500/50 shadow-lg transition-transform duration-300 group-hover:scale-105">
                <AvatarImage src="" />
                <AvatarFallback className="text-white font-bold text-xl bg-gradient-to-br from-blue-500 to-blue-600">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 transition-transform duration-300 group-hover:scale-110">
                <CountryFlag countryCode={user.country} size="md" />
              </div>
            </div>
            
            <div className="text-center">
              <DialogTitle className="text-xl font-bold text-white mb-1">
                {user.fullName}
              </DialogTitle>
              <p className="text-slate-400">@{user.name}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Badge variant="outline" className="text-blue-400 border-blue-400/50 bg-blue-400/10 hover:bg-blue-400/20 transition-colors">
                  Rank #{user.rank}
                </Badge>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 bg-yellow-400/10 hover:bg-yellow-400/20 transition-colors">
                  {user.points.toLocaleString()} pts
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-2">
          {/* Bio Section */}
          <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30 backdrop-blur-sm">
            <p className="text-slate-300 text-sm italic">"{user.bio}"</p>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30 backdrop-blur-sm hover:bg-slate-700/70 transition-all duration-200">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Education</span>
              </div>
              <p className="text-white font-semibold">{user.university}</p>
              <p className="text-slate-400 text-sm">{user.year} Year</p>
            </div>

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30 backdrop-blur-sm hover:bg-slate-700/70 transition-all duration-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-slate-300">Joined</span>
              </div>
              <p className="text-white font-semibold">{formatDate(user.dateJoined)}</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 text-center border border-slate-600/30 backdrop-blur-sm hover:bg-slate-700/70 transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-2xl font-bold text-white">{user.accuracy}%</p>
              <p className="text-slate-400 text-xs">Accuracy</p>
            </div>

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 text-center border border-slate-600/30 backdrop-blur-sm hover:bg-slate-700/70 transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-2xl font-bold text-white">{user.streak}</p>
              <p className="text-slate-400 text-xs">Day Streak</p>
            </div>

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 text-center border border-slate-600/30 backdrop-blur-sm hover:bg-slate-700/70 transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">{formatStudyTime(user.totalStudyTime)}</p>
              <p className="text-slate-400 text-xs">Study Time</p>
            </div>
          </div>

          {/* Subject Strengths */}
          {strongestSubjects.length > 0 && (
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-white">Strongest Subjects</span>
              </div>
              <div className="space-y-3">
                {strongestSubjects.map((subject, index) => (
                  <div key={subject.subject} className="flex items-center justify-between hover:bg-slate-600/30 rounded-lg p-2 transition-colors duration-200">
                    <span className="text-slate-300">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={subject.score} className="w-20 h-2" />
                      <span className="text-sm text-white font-medium">{subject.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Areas for Improvement */}
          {weakestSubjects.length > 0 && (
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white">Areas for Improvement</span>
              </div>
              <div className="space-y-3">
                {weakestSubjects.map((subject, index) => (
                  <div key={subject.subject} className="flex items-center justify-between hover:bg-slate-600/30 rounded-lg p-2 transition-colors duration-200">
                    <span className="text-slate-300">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={subject.score} className="w-20 h-2" />
                      <span className="text-sm text-white font-medium">{subject.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-lg p-4 border border-slate-600/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="font-medium text-white">Achievements</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Total Unlocked</span>
              <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 bg-yellow-400/10">
                {user.achievements} achievements
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium">
              Follow
            </button>
            <button className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium">
              Message
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
