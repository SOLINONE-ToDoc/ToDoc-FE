import { ICONS } from "@/shared/constants";
import { cn } from "@/shared/lib";

interface TopNavigationBarProps {
  title?: string;
  rightElement?: React.ReactNode;
  onBack?: () => void;
  hasBack?: boolean;
}

export const TopNavigationBar = ({
  title,
  rightElement,
  onBack,
  hasBack = true,
}: TopNavigationBarProps) => {
  return (
    <header className={cn(
      "sticky top-0 z-50 flex items-center h-[56px] px-5 bg-white shrink-0",
    )}>
      <div className="flex-1 flex items-center">
        {hasBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-6 h-6 flex items-center justify-center active:opacity-50"
          >
            <ICONS.Back width={24} height={24} />
          </button>
        )}
      </div>

      <div className="flex-[2] flex items-center justify-center">
        {title && (
          <h1 className="text-heading-1 font-medium whitespace-nowrap truncate">
            {title}
          </h1>
        )}
      </div>

      <div className="flex-1 flex items-center justify-end">
        {rightElement}
      </div>
    </header>
  );
};
