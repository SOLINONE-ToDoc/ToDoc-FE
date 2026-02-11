import { useState } from 'react';
import { ICON_QR, ICON_DOWNLOAD } from '../assets/icons';

export const QrButton = ({ qrUrl }: { qrUrl: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `todo-qr-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(qrUrl);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-16 h-16 rounded-full bg-[#efefef]/80 border border-gray-200 flex items-center justify-center backdrop-blur-[60px]"
      >
        <ICON_QR className="w-8 h-8" />
      </button>

      {isOpen && (
        <div
          className="fixed right-[46px] top-[128px] z-[9999]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex items-center w-[148px] h-[202px] bg-white pt-1 rounded-[16px] shadow-[0px_0px_4px_rgba(0,0,0,0.15)] flex flex-col items-center border-[2px] border-red-400 "
            onClick={(e) => e.stopPropagation()}
          >
            <img src={qrUrl} alt="QR Code" className="w-[136px] h-[136px] object-contain" />
            <div className="flex items-center justify-center w-[116px] gap-2 w-full py-2 mr-[2px]">
              <ICON_DOWNLOAD className="w-6 h-6" />
              <button
                type="button"
                onClick={handleDownload}
              >
                다운로드
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
