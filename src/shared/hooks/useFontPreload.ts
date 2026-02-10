import { useEffect } from "react";
import { loadFontById } from "../lib";

export function useFontPreload(fontIds: number[]) {
  useEffect(() => {
    const uniqueIds = Array.from(new Set(fontIds));
    uniqueIds.forEach((id) => loadFontById(id));
  }, [fontIds]);
}
