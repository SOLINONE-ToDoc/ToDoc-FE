import { Outlet } from "react-router-dom";
import { AppHeader } from "@/widgets/Header";
import { ExploreHeader } from "@/widgets/Header";

export const ExploreWithLayout = () => {
  return (
    <>
      <AppHeader />
      <ExploreHeader />
      <Outlet />
    </>
  );
};
