import { Outlet } from "react-router-dom";
import { AppHeader } from "@/widgets/Header";

export const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
