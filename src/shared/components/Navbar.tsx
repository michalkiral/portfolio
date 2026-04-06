import { useAppMeta } from "@/shared/context/AppMetaContext";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { favorites } = useAppMeta();

  return (
    <nav className="sticky top-0 z-20 flex items-center border-b border-outline-variant/15 bg-surface-container/60 px-6 py-3 backdrop-blur-md">
      <Link
        to="/"
        className="text-headline-sm font-bold text-on-surface transition-colors hover:text-primary"
      >
        The Lab.
      </Link>

      {favorites.size > 0 && (
        <span className="ml-3 rounded-full bg-surface-container-highest px-2 py-0.5 text-label-sm text-tertiary">
          {favorites.size}
        </span>
      )}
    </nav>
  );
};

export default Navbar;
