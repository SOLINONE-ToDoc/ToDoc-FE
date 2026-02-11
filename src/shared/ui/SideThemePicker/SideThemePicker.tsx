import { cn } from '@/shared/lib';
import type { Theme } from '@/entities/theme';
import { ICONS } from '@/shared/constants';

interface SideThemePickerProps {
  themes: Theme[];
  selectedThemeId: number | null;
  onSelect: (id: number) => void;
}

export const SideThemePicker = ({ themes, selectedThemeId, onSelect }: SideThemePickerProps) => {
  return (
    <aside className="w-[382px] h-full bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="p-[30px] h-[142px] border-b border-gray-200">
        <ICONS.Logo width={48} height={34} className='text-left'/>
        <h2 className="text-[18px] font-semibold pt-3">방명록 테마</h2>
        <p className="text-gray-400 text-[14px]">방명록에 입힐 테마를 골라주세요.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-[30px] space-y-6 scrollbar-hide">
        {themes.map((theme) => {
          const isSelected = selectedThemeId === theme.themeId;

          return (
            <div
              key={theme.themeId}
              onClick={() => onSelect(theme.themeId)}
              className={cn(
                isSelected
                ? "group cursor-pointer p-4 rounded-[8px] border border-gray-300 bg-gray-100"
                : "group cursor-pointer p-4 rounded-[8px] border border-gray-200",
              )}
            >
              <div className="flex items-center">
                {theme.themeUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "relative w-[100px] h-auto overflow-hidden pb-3",
                      idx !== 0 && "-ml-[40px]"
                    )}
                  >
                    <img
                      src={url}
                      alt={`${theme.themeName}-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className={cn(
                "font-medium text-[18px] pb-3",
              )}>
                {theme.themeName}
              </p>
              <div className="flex gap-2">
                {theme.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-200 h-[36px] text-[14px] px-4 py-2 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
