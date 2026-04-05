import React from "react";
import { useNavigate } from "react-router-dom";

type AppLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-gray-900 text-white">
      <header className="flex items-center gap-4 border-b border-white/10 px-6 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded border border-white/20 px-3 py-1 text-sm text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          ← Back
        </button>
        <h1 className="font-semibold">{title}</h1>
      </header>
      <main className="overflow-auto">{children}</main>
    </div>
  );
};

export default AppLayout;
