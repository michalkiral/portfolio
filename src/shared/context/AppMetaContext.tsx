import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import React, { createContext, useContext, useMemo } from "react";

interface AppMetaContextValue {
  favorites: Set<string>;
  toggleFavorite: (appId: string) => void;
  isFavorite: (appId: string) => boolean;
}

const AppMetaContext = createContext<AppMetaContextValue | null>(null);

export const AppMetaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useLocalStorage<string[]>(
    "portfolio:favorites",
    [],
  );

  const favorites = useMemo(() => new Set(storedFavorites), [storedFavorites]);

  const toggleFavorite = (appId: string) => {
    setStoredFavorites((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId],
    );
  };

  const isFavorite = (appId: string) => favorites.has(appId);

  return (
    <AppMetaContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </AppMetaContext.Provider>
  );
};

export const useAppMeta = (): AppMetaContextValue => {
  const ctx = useContext(AppMetaContext);
  if (!ctx) throw new Error("useAppMeta must be used within AppMetaProvider");
  return ctx;
};
