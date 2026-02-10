import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWriteStore } from "@/entities/board";
import { ConfirmPopup } from "@/shared/ui/Popup";
import { TopNavigationBar } from "@/widgets/Navigation";
import { NoticeTag } from "./ui/NoticeTag";
import { SCAN_NOTE, FONT_KEYCAPS } from "./assets/icons";
import { useFontRecommendation } from "@/features/font";
import { useFontRecommendStore } from "@/entities/font";

export const DashboardWriteLoadingPage = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const { content } = useWriteStore();

  const { recommendFonts, setRecommendFonts } = useFontRecommendStore();
  const { fonts, getRecommendation } = useFontRecommendation(content);

  const [showPopup, setShowPopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const keycaps = Object.values(FONT_KEYCAPS);

  useEffect(() => {
    getRecommendation();
  }, [getRecommendation]);

  useEffect(() => {
    if (fonts && fonts.length > 0) {
      setRecommendFonts(fonts);
    }
  }, [fonts, setRecommendFonts]);

  const getCurrentKeycapIndex = () => {
    if (progress <= 37) return null;
    if (progress >= 100) return null;

    if (progress > 85) return 4;
    if (progress > 70) return 3;
    if (progress > 55) return 2;
    if (progress > 45) return 1;
    return 0;
  };

  const currentIndex = getCurrentKeycapIndex();
  const CurrentKeyCap = currentIndex !== null ? keycaps[currentIndex] : null;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getLoadingText = () => {
    if (progress === 100) return "분석 완료!";
    if (progress > 37) return "딱 맞는 폰트 탐색 중...";
    return "내용 인식 중...";
  };

  const handleBackClick = () => {
    if (content.length > 0) {
      setShowPopup(true);
    } else {
      navigate(-1);
    }
  };

  const handleConfirmBack = () => {
    navigate(-1);
  };

  const isReadyToNext = progress === 100 && recommendFonts.length > 0;

  const handleNext = () => {
    if (isReadyToNext) {
      navigate(`/place/${placeId}/write/font`, { replace: true });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNavigationBar
        title="작성하기"
        onBack={handleBackClick}
        rightElement={
          <button
            onClick={handleNext}
            disabled={!isReadyToNext}
            className={`text-heading-1 font-semibold transition-colors ${
              isReadyToNext ? "text-content-primary" : "text-gray-300"
            }`}
          >
            다음
          </button>
        }
      />
      <main className="flex-1 relative flex flex-col items-center p-5">
        <div className="text-center mt-[60px] z-[20]">
          <h2 className="text-title font-semibold text-black mb-[10px]">
            {getLoadingText()}
          </h2>
          <p className="text-body-1 font-regular text-red-400">
            {progress}% 완료
          </p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[120px] h-[120px] flex items-center justify-center">
            {progress <= 37 && (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <SCAN_NOTE.Note className="w-[80px] h-auto" />
                </div>
                <div className="absolute flex flex-col items-center animate-scan-with-hold z-10">
                  <SCAN_NOTE.Scanner className="w-[110px] h-auto z-[20]" />
                  <SCAN_NOTE.Shadow className="w-[110px] h-auto animate-shadow-flip" />
                </div>
              </>
            )}
            {CurrentKeyCap && (
              <div className="absolute z-20">
                <CurrentKeyCap className="h-auto" />
              </div>
            )}

          </div>
        </div>
        <div className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[9999] w-max">
          <NoticeTag />
        </div>
      </main>
      {showPopup && (
        <ConfirmPopup
          title={<>뒤로 가면 분석한 내용이<br />모두 사라져요</>}
          onCancel={() => setShowPopup(false)}
          onConfirm={handleConfirmBack}
        />
      )}
    </div>
  );
};
