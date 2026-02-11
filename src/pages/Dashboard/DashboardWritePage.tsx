import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlaceInfo } from "@/entities/place";
import { useWriteStore } from "@/entities/board";
import { ICON_LOCATION } from "./assets/icons";
import { ConfirmPopup } from "@/shared/ui/Popup";
import { TopNavigationBar } from "@/widgets/Navigation";

export const DashboardWritePage = () => {
  const navigate = useNavigate();
  const { placeId } = useParams<{ placeId: string }>();
  const { placeName } = usePlaceInfo(Number(placeId));

  const { content, setContent, reset, createdAt, setCreatedAt } = useWriteStore();
  const [showPopup, setShowPopup] = useState(false);
  const MAX_LENGTH = 60;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setContent(e.target.value);
    }
  };

  useEffect(() => {
    if (!createdAt) {
      setCreatedAt(new Date());
    }
  }, [createdAt, setCreatedAt]);

  const handleBackClick = () => {
    if (content.length > 0) {
      setShowPopup(true);
    } else {
      navigate(-1);
    }
  };

  const handleConfirmBack = () => {
    reset();
    navigate(-1);
  };

  const handleNext = () => {
    navigate(`/place/${placeId}/write/loading`);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNavigationBar
        title="작성하기"
        onBack={handleBackClick}
        rightElement={
          <button
            onClick={handleNext}
            disabled={content.length === 0}
            className={`text-heading-1 font-semibold ${content.length > 0 ? "text-content-primary" : "text-gray-300"
              }`}
          >
            다음
          </button>
        }
      />
      <div className="flex items-center h-[56px] gap-2 pt-3 px-5 pb-5 border-b border-gray-200">
        <ICON_LOCATION className="text-content-primary" />
        <h1 className="text-body-1 font-regular">{placeName}</h1>
        <div className="w-6" />
      </div>

      <main className="flex-1 flex flex-col p-5">
        <div className="relative flex-1 flex flex-col group">
          <textarea
            className="w-full flex-1 text-body-1 placeholder:text-gray-400 focus:outline-none resize-none bg-transparent z-10"
            placeholder="작성 내용을 바탕으로, AI가 폰트를 추천해줘요"
            value={content}
            onChange={handleChange}
            autoFocus
          />
        </div>

        <div className="flex justify-end items-center">
          <div className="text-body-1 text-gray-400">
            <span className={content.length > 0 ? "text-black" : ""}>
              {content.length}
            </span>
            <span>/{MAX_LENGTH}자</span>
          </div>

        </div>
      </main>
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
