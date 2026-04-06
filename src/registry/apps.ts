import { manifest as bangManifest } from "@/apps/bang-duel-generator";
import { manifest as loveManifest } from "@/apps/love-you";
import { manifest as randomizerManifest } from "@/apps/randomizer";
import type { AppManifest } from "@/registry/types";

export const appRegistry: AppManifest[] = [bangManifest, loveManifest, randomizerManifest];
