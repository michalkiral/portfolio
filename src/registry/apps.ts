import { manifest as bangManifest } from "@/apps/bang-duel-generator";
import { manifest as loveManifest } from "@/apps/love-you";
import type { AppManifest } from "@/registry/types";

/**
 * Central registry of all apps.
 * To add a new app: create its folder under src/apps/, export a manifest from its index.tsx,
 * then add one line here. HomeScreen and the router update themselves automatically.
 */
export const appRegistry: AppManifest[] = [bangManifest, loveManifest];
