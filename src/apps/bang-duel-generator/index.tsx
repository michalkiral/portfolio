import type { AppManifest } from "@/registry/types";
import BangHomeScreen from "./screens/BangHomeScreen";
import GameGeneratorScreen from "./screens/GameGeneratorScreen";

export const manifest: AppManifest = {
  id: "bang-duel-generator",
  title: "Bang! Duel Generator",
  description: "Random character and game-type generator for the Bang! card game.",
  route: "/bangtheduelgenerator",
  icon: "🤠",
  tags: ["games", "tools"],
  status: "stable",
  color: "#c9a227",
  routes: [
    { path: "", element: <BangHomeScreen /> },
    { path: "/game-generator", element: <GameGeneratorScreen /> },
  ],
};
