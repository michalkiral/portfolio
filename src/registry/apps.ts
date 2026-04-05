import { manifest as bangManifest } from "@/apps/bang-duel-generator";
import { manifest as loveManifest } from "@/apps/love-you";
import type { AppManifest } from "@/registry/types";

export const appRegistry: AppManifest[] = [bangManifest, loveManifest];
