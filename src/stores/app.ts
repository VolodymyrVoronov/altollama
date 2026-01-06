import { atom } from "jotai";

import type { ImageDisplay } from "@/types";
import { DEFAULT_PROMPT } from "@/constants";

export const selectedOllamaLocalModel = atom<string | undefined>(undefined);

export const userPrompt = atom<string>(DEFAULT_PROMPT);

export const imagesAtom = atom<ImageDisplay[]>([]);
