import { useAppMeta } from "@/shared/context/AppMetaContext";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { favorites, query, setQuery } = useAppMeta();

  return (
    <nav className="sticky top-0 z-20 flex items-center gap-4 border-b border-outline-variant/15 bg-surface-container/60 px-6 py-3 backdrop-blur-md">
      <Link
        to="/"
        className="text-headline-sm font-bold text-on-surface transition-colors hover:text-primary"
      >
        The Lab.
      </Link>

      {favorites.size > 0 && (
        <span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-label-sm text-tertiary">
          {favorites.size}
        </span>
      )}

      <div className="relative ml-auto">
        <input
          type="text"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-40 rounded-lg border border-outline-variant/15 bg-surface-container-lowest px-3 py-1.5 text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-shadow duration-150 focus:shadow-glow-primary sm:w-56"
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
    </nav>
  );
};

export default Navbar;
