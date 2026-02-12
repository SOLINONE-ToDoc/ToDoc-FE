import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopNavigationBar } from "@/widgets/Navigation";
import { ConfirmPopup } from "@/shared/ui/Popup";
import { FontCard } from "@/shared/ui/FontCard";
import { useWriteStore } from "@/entities/board";
import { useFontRecommendStore } from "@/entities/font";
import { formatDate } from "@/shared/utils";
import { Button } from "@/shared/ui/Button";
import { GUIDE_ICONS, ICONS } from "@/shared/constants";
import { usePlaceInfo } from "@/entities/place";
import { FONT_CATEGORY_MAP } from "@/entities/font";

export const BoardWriteSuccessPage = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const { selectedFont, recommendThemeUrl, reset: resetRecommend, } = useFontRecommendStore();
  const {
    content: contentWrite,
    createdAt,
    orderNumber,
    reset: resetWrite
  } = useWriteStore();
  const { placeName } = usePlaceInfo(Number(placeId));
  const [showPopup, setShowPopup] = useState(false);
  if (!selectedFont || !createdAt) return null;

  const { fontName, field, category, fontNameEng } = selectedFont;
  const displayDate = formatDate(createdAt);

  const handleDone = () => {
    resetRecommend();
    resetWrite();
    navigate(`/place/${placeId}`);
  };

  const handleBackClick = () => {
    if (contentWrite.length > 0) {
      setShowPopup(true);
      resetRecommend();
      resetWrite();
      navigate(`/place/${placeId}`, { replace: true });
    } else {
      navigate(-1);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <TopNavigationBar
        title=""
        onBack={handleBackClick}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-[44px]">
        <div className="text-center animate-fade-in-up">
          <GUIDE_ICONS.CheckKey width={40} height={60} className="w-full pb-[10px]" />
          <h2 className="text-title font-semibold mb-2">
            방명록 작성 완료!
          </h2>
          <p className="text-body-1">
            [{placeName}]에 {orderNumber}번째로 남겼어요
          </p>
          {/* 수정해야함 */}
        </div>

        <div className="animate-card-entrance">
          <FontCard
            size="xl"
            content={contentWrite}
            date={displayDate}
            bgImage={recommendThemeUrl}
            fontFamily={fontNameEng}
            company={field}
            category={FONT_CATEGORY_MAP[category as keyof typeof FONT_CATEGORY_MAP]}
            fontName={fontName}
          />
        </div>
        <Button
          variant="emphasize"
          size="pill"
          type="button" onClick={handleDone}
          rightIcon={<ICONS.Down width={24} height={24} className="-rotate-90" />}
          className="text-medium text-body-1 text-red-400 pr-[4px]"
        >
          내 방명록 보기
        </Button>
      </main>
      {showPopup && (
        <ConfirmPopup
          title={<>뒤로 가면 진행한 내용이<br />모두 사라져요</>}
          onCancel={() => setShowPopup(false)}
          onConfirm={handleBackClick}
        />
      )}
    </div>
  );
};
