import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="isolate grid h-dvh grid-rows-[minmax(0,1fr)_auto] overflow-hidden">
      <main className="scrollbar-hidden relative min-h-0 overflow-x-hidden overflow-y-auto [&_.page-container]:min-h-full">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}
