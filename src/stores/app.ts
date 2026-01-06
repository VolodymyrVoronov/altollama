import { atom } from "jotai";

import { DEFAULT_PROMPT } from "@/constants";
import type { ImageDisplay } from "@/types";

export const selectedOllamaTypeAtom = atom<string>("ollama-local");

export const selectedOllamaLocalModelAtom = atom<string | undefined>(undefined);
export const selectedOllamaCloudModelAtom = atom<string | undefined>(undefined);

export const userPromptAtom = atom<string>(DEFAULT_PROMPT);

export const imagesAtom = atom<ImageDisplay[]>([]);
