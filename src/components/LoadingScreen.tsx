
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingScreen = ({ message = "Loading...", size = "md" }: LoadingScreenProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className="min-h-screen bg-app-background flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-app-interactive`} />
        </div>
        <p className="text-app-secondary font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
