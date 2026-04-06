import type { AppManifest } from "@/registry/types";
import RandomizerScreen from "./screens/RandomizerScreen";

export const manifest: AppManifest = {
  id: "randomizer",
  title: "Randomizer",
  description: "Shuffle, pick, pair, and roll — multiple randomizer modes in one place.",
  route: "/randomizer",
  icon: "🎲",
  tags: ["tools", "games"],
  status: "wip",
  routes: [{ path: "", element: <RandomizerScreen /> }],
};
