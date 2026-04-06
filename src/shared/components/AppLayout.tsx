import React from "react";
import { useNavigate } from "react-router-dom";

type AppLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="grid h-full grid-rows-[auto_1fr] text-on-surface">
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-outline-variant/15 bg-surface-container/60 px-6 py-3 backdrop-blur-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border border-outline-variant/15 px-3 py-1.5 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
        >
          ← Back
        </button>
        <h1 className="text-headline-sm text-on-surface">{title}</h1>
      </header>
      <main className="overflow-auto">{children}</main>
    </div>
  );
};

export default AppLayout;
