import { appRegistry } from "@/registry/apps";
import AppCard from "@/shared/components/AppCard";
import React from "react";

const HomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface px-6 py-16 sm:px-12 lg:px-24">
      <header className="mb-16 max-w-2xl">
        <p className="mb-3 text-label-md uppercase tracking-widest text-on-surface-variant">
          Michal Kiráľ
        </p>
        <h1 className="text-display-lg font-bold text-on-surface">The Lab.</h1>
        <p className="mt-4 text-body-md text-on-surface-variant">
          A collection of experiments, tools, and things built for the fun of it.
        </p>
      </header>

      <section>
        <p className="mb-6 text-label-md uppercase tracking-widest text-on-surface-variant">
          Projects
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {appRegistry.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
