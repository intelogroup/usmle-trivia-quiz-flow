
interface ReviewScreenProps {
  onNavigate: (screen: string) => void;
}

const ReviewScreen = ({ onNavigate }: ReviewScreenProps) => {
  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Review</h1>
        <p className="text-slate-300">Review your past quizzes</p>
      </div>
      
      <div className="bg-slate-800 rounded-xl p-4">
        <p className="text-slate-300">Review functionality coming soon...</p>
      </div>
    </div>
  );
};

export default ReviewScreen;
