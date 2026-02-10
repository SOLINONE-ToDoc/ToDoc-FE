import { useEffect, useState } from "react";
import type { FontCategory, FontRecommend } from "../model/types";
import { getFontsByCategory } from "../services/getFontsByCategory";

export const useCategoryFonts = (selectedCategory: FontCategory | "") => {
  const [fonts, setFonts] = useState<FontRecommend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedCategory) {
      setFonts([]);
      return;
    }

    const fetchFonts = async () => {
      setIsLoading(true);
      try {
        const res = await getFontsByCategory(selectedCategory);
        setFonts(res.data);
      } catch (error) {
        console.error("폰트 탐색 실패:", error);
        setFonts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFonts();
  }, [selectedCategory]);

  return { fonts, isLoading };
};
