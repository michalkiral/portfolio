import React from "react";
import { appRegistry } from "./registry/apps";
import AppCard from "./shared/components/AppCard";

const HomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="mb-2 text-3xl font-bold text-white">Portfolio</h1>
      <p className="mb-8 text-white/50">Pick an app to get started.</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {appRegistry.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
