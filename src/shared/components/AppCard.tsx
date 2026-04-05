import type { AppManifest } from "@/registry/types";
import React from "react";
import { Link } from "react-router-dom";

type AppCardProps = {
  app: AppManifest;
};

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <Link
      to={app.route}
      className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30 hover:bg-white/10"
    >
      <span className="text-4xl">{app.icon}</span>
      <div>
        <h2 className="text-lg font-semibold text-white">{app.title}</h2>
        <p className="mt-1 text-sm text-white/60">{app.description}</p>
      </div>
      {app.status !== "stable" && (
        <span className="w-fit rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-300">
          {app.status}
        </span>
      )}
    </Link>
  );
};

export default AppCard;
