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
      className="group relative flex flex-col gap-5 rounded-xl bg-surface-container-low p-6 transition-colors duration-200 hover:bg-surface-container-high"
    >
      {/* Light bar — 2px primary accent on left edge, fades in on hover */}
      <span className="absolute inset-y-0 left-0 w-0.5 rounded-l-xl bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Icon chip */}
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-high text-xl text-primary transition-colors duration-200 group-hover:bg-surface-container-highest">
        {app.icon}
      </span>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-headline-sm text-on-surface">{app.title}</h2>
        <p className="text-body-md text-on-surface-variant">{app.description}</p>
      </div>

      {/* Footer — tags + status badge */}
      <div className="mt-auto flex flex-wrap items-center gap-2">
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-surface-container-highest px-2.5 py-0.5 text-label-sm uppercase text-on-surface-variant"
          >
            {tag}
          </span>
        ))}
        {app.status !== "stable" && (
          <span className="rounded-full px-2.5 py-0.5 text-label-sm uppercase text-tertiary">
            {app.status}
          </span>
        )}
      </div>
    </Link>
  );
};

export default AppCard;
