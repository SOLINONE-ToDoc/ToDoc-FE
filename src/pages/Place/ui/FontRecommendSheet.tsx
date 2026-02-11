import { useState } from "react";
import { useFontRecommendStore, FONT_CATEGORY_MAP, type FontCategory } from "@/entities/font";
import { AI } from "../assets/icons";
import { useCategoryFonts } from "@/entities/font";

export const FontRecommendSheet = () => {
  const { recommendFonts, selectedFontId, setSelectedFont } = useFontRecommendStore();
  const [selectedCategory, setSelectedCategory] = useState<FontCategory | "">("");
  const { fonts: categoryFonts } = useCategoryFonts(selectedCategory);

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h3 className="text-heading-1 font-semibold text-content-primary">
            폰트 추천
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <AI.Ai />
          <p className="text-body-2 text-content-tertiary">
            AI가 작성 내용을 바탕으로 폰트를 추천했어요
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-3 overflow-x-auto py-2">
        {recommendFonts.map((font) => {
          const isSelected = selectedFontId === font.fontId;

          return (
            <button
              key={font.fontId}
              onClick={() => setSelectedFont(font)}
              style={
                isSelected
                  ? {
                    backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(51deg, #FF5546 1%, #9747FF 50%, #FF5546 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    border: '2px solid transparent',
                  }
                  : {}
              }
              className={`w-[168px] h-auto flex-shrink-0 flex flex-col gap-2 p-5 rounded-[4px] transition-all text-left 
    ${isSelected ? "" : "bg-gray-100 border-2 border-transparent"}`}
            >
              <div className="flex flex-col gap-2 ">
                <span className="text-heading-1 font-semibold text-black whitespace-nowrap truncate"
                  style={{ fontFamily: font.fontNameEng }}>
                  {font.fontName}
                </span>
                <p className="text-body-2 font-regular text-gray-400 line-clamp-2">
                  {font.reason}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 pt-5">
        <h3 className="text-heading-1 font-bold text-content-primary">폰트 탐색</h3>
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {Object.entries(FONT_CATEGORY_MAP).map(([category, name]) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as FontCategory)}
                className={`w-auto h-[36px] px-4 flex-shrink-0 flex items-center justify-center rounded-[4px] transition-all
                ${isSelected ? "bg-red-100 text-red-400 font-bold" : "border border-gray-100 text-gray-400"}`}
              >
                <span className="text-body-1 font-medium">{name}</span>
              </button>
            );
          })}
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-3 overflow-x-auto py-2 no-scrollbar">
          {categoryFonts.map((font) => {
            const isSelected = selectedFontId === font.fontId;
            return (
              <button
                key={font.fontId}
                onClick={() => setSelectedFont(font)}
                className={`w-[168px] flex-shrink-0 flex flex-col gap-1 p-4 rounded-[4px] transition-all text-left text-body-1 font-regular truncate
                ${isSelected ? "bg-[#FF5546] text-white" : "bg-gray-100"}`}
                style={{ fontFamily: font.fontNameEng }}
              >
                {font.fontName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
