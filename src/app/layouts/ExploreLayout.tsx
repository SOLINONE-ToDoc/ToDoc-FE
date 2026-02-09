import { Outlet } from "react-router-dom";
import { ExploreHeader } from "@/widgets/Header";

export const ExploreLayout = () => {
  return (
    <>
      <ExploreHeader />
      <Outlet />
    </>
  );
};
