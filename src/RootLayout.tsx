import Navbar from "@/shared/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] bg-surface text-on-surface">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
