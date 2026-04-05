import type { ReactElement } from "react";

export interface AppRoute {
  path: string;
  element: ReactElement;
}

export interface AppManifest {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: string;
  tags: string[];
  status: "stable" | "beta" | "wip";
  routes: AppRoute[];
}
