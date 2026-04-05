import type { AppManifest } from "@/registry/types";
import LoveYouScreen from "./screens/LoveYouScreen";

export const manifest: AppManifest = {
  id: "love-you",
  title: "I Love You",
  description: "A little something special.",
  route: "/loveyoupage",
  icon: "❤️",
  tags: ["fun"],
  status: "stable",
  routes: [{ path: "", element: <LoveYouScreen /> }],
};
