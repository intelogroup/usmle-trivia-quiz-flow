
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
          
          {/* Header Section */}
          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className="relative">
              <Avatar className="w-20 h-20 ring-2 ring-blue-500">
                <AvatarImage src="" />
                <AvatarFallback className="text-white font-bold text-xl bg-blue-500">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1">
                <CountryFlag countryCode={user.country} size="md" />
              </div>
            </div>
            
            <div className="text-center">
              <DialogTitle className="text-xl font-bold text-white mb-1">
                {user.fullName}
              </DialogTitle>
              <p className="text-slate-400">@{user.name}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  Rank #{user.rank}
                </Badge>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  {user.points.toLocaleString()} pts
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-2">
          {/* Bio Section */}
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-slate-300 text-sm italic">"{user.bio}"</p>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Education</span>
              </div>
              <p className="text-white font-semibold">{user.university}</p>
              <p className="text-slate-400 text-sm">{user.year} Year</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-slate-300">Joined</span>
              </div>
              <p className="text-white font-semibold">{formatDate(user.dateJoined)}</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-2xl font-bold text-white">{user.accuracy}%</p>
              <p className="text-slate-400 text-xs">Accuracy</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-2xl font-bold text-white">{user.streak}</p>
              <p className="text-slate-400 text-xs">Day Streak</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">{formatStudyTime(user.totalStudyTime)}</p>
              <p className="text-slate-400 text-xs">Study Time</p>
            </div>
          </div>

          {/* Subject Strengths */}
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="font-medium text-white">Strongest Subjects</span>
            </div>
            <div className="space-y-3">
              {user.strongestSubjects.map((subject, index) => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <span className="text-slate-300">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={subject.score} className="w-20 h-2" />
                    <span className="text-sm text-white font-medium">{subject.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-white">Areas for Improvement</span>
            </div>
            <div className="space-y-3">
              {user.weakestSubjects.map((subject, index) => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <span className="text-slate-300">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={subject.score} className="w-20 h-2" />
                    <span className="text-sm text-white font-medium">{subject.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-gold-400" />
              <span className="font-medium text-white">Achievements</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Total Unlocked</span>
              <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                {user.achievements} achievements
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Follow
            </button>
            <button className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded-lg transition-colors">
              Message
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
