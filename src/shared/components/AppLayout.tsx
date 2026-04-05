import React from "react";
import { useNavigate } from "react-router-dom";

type AppLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <header className="flex h-14 shrink-0 items-center gap-4 border-b border-white/10 px-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm text-white/60 transition-colors hover:text-white"
        >
          ← Back
        </button>
        <h1 className="font-semibold">{title}</h1>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
};

export default AppLayout;
