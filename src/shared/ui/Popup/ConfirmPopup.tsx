interface ConfirmPopupProps {
  title: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmPopup = ({
  title,
  cancelText = "취소",
  confirmText = "삭제",
  onCancel,
  onConfirm,
}: ConfirmPopupProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-overlay px-6">
      <div className="flex flex-col justify-between bg-white h-[156px] rounded-[16px] w-[292px] overflow-hidden p-4">
        <div className="h-[72px] flex items-center justify-center text-center">
          <h3 className="text-heading-1 font-medium leading-snug">
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-center gap-[10px]">
          <button
            onClick={onCancel}
            className="h-10 w-full bg-surface-secondary text-caption font-medium active:bg-gray-50 rounded-[4px]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="h-10 w-full bg-red-400 text-white text-caption font-medium active:bg-red-500 rounded-[4px]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
