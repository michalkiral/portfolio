import type { ReactElement } from "react";

export interface AppRoute {
  /** Path relative to the app's base route. Use "" for the index. */
  path: string;
  element: ReactElement;
}

export interface AppManifest {
  /** Unique identifier used as a React key. */
  id: string;
  title: string;
  description: string;
  /** Base route, e.g. "/bangtheduelgenerator". */
  route: string;
  /** Emoji shown on the home screen card. */
  icon: string;
  tags: string[];
  status: "stable" | "beta" | "wip";
  routes: AppRoute[];
}
