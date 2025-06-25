
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const notificationStyles = {
  success: {
    bg: "bg-green-50 border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-600",
    titleColor: "text-green-900"
  },
  error: {
    bg: "bg-red-50 border-red-200",
    icon: AlertCircle,
    iconColor: "text-red-600",
    titleColor: "text-red-900"
  },
  warning: {
    bg: "bg-yellow-50 border-yellow-200",
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-900"
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: Info,
    iconColor: "text-blue-600",
    titleColor: "text-blue-900"
  }
};

export const Notification = ({ 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose, 
  className 
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const style = notificationStyles[type];
  const Icon = style.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <Card className={cn(
      "fixed top-4 right-4 z-50 border shadow-lg animate-in slide-in-from-top-2 duration-300",
      style.bg,
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Icon className={cn("h-5 w-5 mt-0.5", style.iconColor)} />
          <div className="flex-1 min-w-0">
            <h4 className={cn("font-semibold text-sm", style.titleColor)}>
              {title}
            </h4>
            {message && (
              <p className="text-sm text-gray-600 mt-1">{message}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-gray-200/50"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose?.(), 300);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Global notification hook
let notificationId = 0;
const notifications: Array<{ id: number; props: NotificationProps }> = [];

export const useNotification = () => {
  const [, forceUpdate] = useState({});

  const notify = (props: Omit<NotificationProps, 'onClose'>) => {
    const id = ++notificationId;
    notifications.push({
      id,
      props: {
        ...props,
        onClose: () => {
          const index = notifications.findIndex(n => n.id === id);
          if (index > -1) {
            notifications.splice(index, 1);
            forceUpdate({});
          }
        }
      }
    });
    forceUpdate({});
  };

  return {
    success: (title: string, message?: string) => notify({ type: "success", title, message }),
    error: (title: string, message?: string) => notify({ type: "error", title, message }),
    warning: (title: string, message?: string) => notify({ type: "warning", title, message }),
    info: (title: string, message?: string) => notify({ type: "info", title, message }),
    notifications
  };
};

export default Notification;
