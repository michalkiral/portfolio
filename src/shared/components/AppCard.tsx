import type { AppManifest } from "@/registry/types";
import { useAppMeta } from "@/shared/context/AppMetaContext";
import React from "react";
import { Link } from "react-router-dom";

type AppCardProps = {
  app: AppManifest;
};

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) =>
  filled ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const accent = app.color ?? undefined;
  const { toggleFavorite, isFavorite } = useAppMeta();
  const favorited = isFavorite(app.id);

  return (
    <Link
      to={app.route}
      className="group relative flex flex-col gap-5 rounded-xl bg-surface-container-low p-6 transition-colors duration-200 hover:bg-surface-container-high"
    >
      <span
        style={accent ? { backgroundColor: accent } : undefined}
        className="absolute inset-y-0 left-0 w-0.5 rounded-l-xl bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />

      <button
        type="button"
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(app.id);
        }}
        className={`absolute right-4 top-4 transition-colors duration-200 ${
          favorited ? "text-tertiary" : "text-on-surface-variant opacity-0 group-hover:opacity-100"
        }`}
      >
        <StarIcon filled={favorited} />
      </button>

      {app.thumbnail ? (
        <img src={app.thumbnail} alt="" className="h-32 w-full rounded-lg object-cover" />
      ) : (
        <span
          style={accent ? { color: accent } : undefined}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-high text-xl text-primary transition-colors duration-200 group-hover:bg-surface-container-highest"
        >
          {app.icon}
        </span>
      )}

      <div className="flex flex-col gap-1.5">
        <h2 className="text-headline-sm text-on-surface">{app.title}</h2>
        <p className="text-body-md text-on-surface-variant">{app.description}</p>
      </div>

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
