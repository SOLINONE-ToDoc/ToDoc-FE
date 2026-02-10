import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlaceInfo } from "@/entities/place";
import { ICON_LOCATION } from "./assets/icons";
import { ICONS } from "@/shared/constants";

export const DashboardWritePage = () => {
  const navigate = useNavigate();
  const { placeId } = useParams<{ placeId: string }>();
  const { placeName } = usePlaceInfo(Number(placeId));

  const [content, setContent] = useState('');
  const MAX_LENGTH = 60;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setContent(e.target.value);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="sticky top-0 z-50 flex items-center h-[56px] px-5 bg-white">
        <div className="flex-1 flex items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-6 h-6 flex items-center justify-center"
          >
            <ICONS.Back width={24} height={24} />
          </button>
        </div>
        <div className="flex-[2] flex items-center justify-center">
          <h1 className="text-heading-1 font-medium whitespace-nowrap">작성하기</h1>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <button
            type="button"
            disabled={content.length === 0}
            className={`text-heading-1 font-semibold transition-colors ${content.length > 0 ? "text-content-primary" : "text-gray-300"
              }`}
          >
            다음
          </button>
        </div>
      </header>
      <div className="flex items-center h-[60px] gap-2 pt-4 px-5 pb-5 border-b border-gray-200">
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
    </div>
  );
};
