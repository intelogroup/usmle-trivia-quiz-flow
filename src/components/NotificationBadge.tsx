
interface NotificationBadgeProps {
  count?: number;
  show?: boolean;
  className?: string;
}

const NotificationBadge = ({ count, show = true, className = "" }: NotificationBadgeProps) => {
  if (!show) return null;

  return (
    <div className={`absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ${className}`}>
      {count && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;
