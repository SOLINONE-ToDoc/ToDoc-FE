import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopNavigationBar } from "@/widgets/Navigation";
import { useFontRecommendStore } from "@/entities/font";
import { useWriteStore } from "@/entities/board";
import { ConfirmPopup } from "@/shared/ui/Popup";
import { Note } from "@/shared/ui/Note";
import { formatDate } from "@/shared/utils";
import { BottomSheet, type BottomSheetSnap } from "@/shared/ui/BottomSheet";
import { FontRecommendSheet } from "./ui/FontRecommendSheet";
import { FontTag } from "./ui/FontTag";
import { postBoardContent } from "@/features/board";
import { useLocationStore } from '@/entities/map';
import { loadFontById } from "@/shared/lib";

export const DashboardWriteFont = () => {
  const navigate = useNavigate();
  const { placeId } = useParams<{ placeId: string }>();
  const { coords } = useLocationStore();

  const {
    content: contentRecommend,
    reset: resetRecommend,
    selectedFont,
    recommendFonts,
    selectedFontId,
    setSelectedFont,
  } = useFontRecommendStore();
  const { content: contentWrite, reset: resetWrite } = useWriteStore();

  const [showPopup, setShowPopup] = useState(false);

  const [sheetSnap, setSheetSnap] = useState<BottomSheetSnap>('min');
  const snapHeights: Record<BottomSheetSnap, number> = { min: 30, mid: 40, max: 75 };
  const currentSheetHeight = snapHeights[sheetSnap];

  useEffect(() => {
    if (selectedFontId) {
      loadFontById(selectedFontId);
    }
  }, [selectedFontId]);
  //   const mock = { lat: 37.561478, lng: 126.985707 };
  useEffect(() => {
    if (!selectedFontId && recommendFonts.length > 0) {
      setSelectedFont(recommendFonts[0]);
    }
  }, [recommendFonts, selectedFontId, setSelectedFont]);

  const displayFontName = selectedFont?.fontName || "폰트를 선택해주세요";

  const handleBackClick = () => {
    if (contentRecommend.length > 0) {
      setShowPopup(true);
    } else {
      navigate(-1);
    }
  };

  const handleConfirmBack = () => {
    resetRecommend();
    navigate(-1);
  };

  const handleNext = async () => {
    if (!placeId || !selectedFontId || !contentWrite) {
      alert("내용과 폰트를 모두 선택해주세요.");
      return;
    }

    if (!coords) {
      alert("위치 정보를 가져올 수 없습니다. GPS 설정을 확인해주세요.");
      return;
    }
    console.log(coords.lat, coords.lng);
    try {
      const payload = {
        fontId: selectedFontId,
        content: contentWrite,
        themeUrl: "",
        userLatitude: 37.561478,
        userLongitude: 126.985707,
      };

      // { lat: 37.561478, lng: 126.985707 };
      const res = await postBoardContent(placeId, payload);

      if (res.status === "SUCCESS") {
        resetRecommend();
        resetWrite();
        navigate(`/place/${placeId}`, { replace: true });
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "방명록 작성에 실패했습니다.");
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
            disabled={!selectedFontId}
            className={`text-heading-1 font-semibold ${selectedFontId ? "text-content-primary" : "text-gray-300"
              }`}
          >
            완료
          </button>
        }
      />

      <main className="flex-1 flex flex-col p-5">
        <div className="mx-auto mt-[60px]">
          <Note
            size="lg"
            content={contentWrite}
            date={formatDate(new Date())}
            baseZIndex={100}
            style={{ fontFamily: selectedFont?.fontNameEng }}
          />
        </div>
      </main>
      {showPopup && (
        <ConfirmPopup
          title={<>뒤로 가면 작성한 내용이<br />모두 사라져요</>}
          onCancel={() => setShowPopup(false)}
          onConfirm={handleConfirmBack}
        />
      )}
      <div
        className="absolute left-0 right-0 px-5 transition-all duration-300 ease-in-out z-20 flex justify-center" // flex와 justify-center 추가
        style={{ bottom: `${currentSheetHeight}%`, marginBottom: '20px' }}
      >
        <FontTag FontName={displayFontName} />
      </div>

      <BottomSheet
        snap={sheetSnap}
        onSnapChange={setSheetSnap}
        heights={snapHeights}
      >
        <div className="flex-1 overflow-y-auto">
          <FontRecommendSheet />
        </div>
      </BottomSheet>

      {showPopup && (
        <ConfirmPopup
          title={<>뒤로 가면 작성한 내용이<br />모두 사라져요</>}
          onCancel={() => setShowPopup(false)}
          onConfirm={handleConfirmBack}
        />
      )}
    </div>
  );
};
