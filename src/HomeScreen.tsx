import { appRegistry } from "@/registry/apps";
import AppCard from "@/shared/components/AppCard";
import { useAppMeta } from "@/shared/context/AppMetaContext";
import { useAppFilter } from "@/shared/hooks/useAppFilter";
import React from "react";

const HomeScreen: React.FC = () => {
  const { favorites } = useAppMeta();
  const { filterMode, setFilterMode, query, setQuery, selectedTags, toggleTag, filtered, allTags } =
    useAppFilter(appRegistry, favorites);

  return (
    <div className="relative min-h-screen overflow-hidden bg-surface px-6 py-16 sm:px-12 lg:px-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[600px] w-full bg-[radial-gradient(ellipse_at_top_left,_rgba(192,193,255,0.05),_transparent_60%)]"
      />

      <header className="relative mb-16 max-w-2xl">
        <p className="mb-3 text-label-md uppercase tracking-widest text-tertiary">Selected Work</p>
        <p className="max-w-md text-body-md text-on-surface-variant">
          A collection of experiments, tools, and things built for the fun of it.
        </p>
      </header>

      <section className="relative lg:pl-12">
        <div className="mb-4 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className={`text-label-md uppercase tracking-widest transition-colors duration-150 ${
              filterMode === "all"
                ? "text-on-surface"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("favorites")}
            className={`flex items-center gap-2 text-label-md uppercase tracking-widest transition-colors duration-150 ${
              filterMode === "favorites"
                ? "text-on-surface"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Favorites
            {favorites.size > 0 && (
              <span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-label-sm text-tertiary">
                {favorites.size}
              </span>
            )}
          </button>

          <div className="relative ml-auto">
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-48 rounded-lg border border-outline-variant/15 bg-surface-container-lowest px-3 py-1.5 text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-shadow duration-150 focus:shadow-glow-primary sm:w-64"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-0.5 text-label-sm uppercase tracking-widest transition-colors duration-150 ${
                selectedTags.has(tag)
                  ? "bg-primary/20 text-primary"
                  : "bg-surface-container-highest text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {filterMode === "favorites" && favorites.size === 0 ? (
          <p className="text-body-md text-on-surface-variant">
            No favorites yet — click the star on any card.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-body-md text-on-surface-variant">No apps match your search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;
