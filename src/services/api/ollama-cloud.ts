import { Ollama, type GenerateResponse, type ListResponse } from "ollama";

import { DEFAULT_PROMPT, IS_DEV_MODE } from "@/constants";
import { fileToBase64, getOllamaClient } from "@/helpers";
import type { IOllamaTagsResponse, OllamaChatResponse } from "@/types";

const OLLAMA_CLOUD_API_BASE = IS_DEV_MODE
  ? "http://localhost:5173/api-proxy"
  : "https://ollama.com";

export const pingOllamaCloud = async (): Promise<boolean> => {
  try {
    const url = OLLAMA_CLOUD_API_BASE;

    const response = await fetch(url);

    if (response.ok && response.status === 200) {
      const text = response.statusText;

      return text.trim() === "OK";
    }

    return false;
  } catch (error) {
    console.error("Ollama Cloud is not reachable:", error);
    return false;
  }
};

export const fetchOllamaCouldModels = async (): Promise<ListResponse> => {
  const client = getOllamaClient(OLLAMA_CLOUD_API_BASE);

  const response = await client.list();

  if (!response.models) {
    console.warn(response);
    throw new Error("Failed to fetch models");
  }

  return response;
};
