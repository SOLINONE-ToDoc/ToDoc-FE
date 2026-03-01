import { useEffect } from "react";
import { cn } from "@/shared/lib";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
  className?: string;
}

export const Toast = ({
  message,
  duration = 2000,
  onClose,
  className,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-[120px] left-1/2 -translate-x-1/2 z-[11000] pointer-events-none",
        "animate-in fade-in slide-in-from-bottom-2 duration-300",
        className,
      )}
    >
      <div className="flex items-center justify-center h-[40px] px-5 rounded-full bg-black/80 backdrop-blur-md select-none shadow-lg">
        <span className="text-[14px] font-regular text-white whitespace-nowrap leading-none">
          {message}
        </span>
      </div>
    </div>
  );
};
