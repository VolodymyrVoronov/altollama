import { type ListResponse } from "ollama";

import { DEFAULT_PROMPT, IS_DEV_MODE } from "@/constants";
import { fileToBase64, getOllamaClient } from "@/helpers";

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

export const generateOllamaCloudAltText = async ({
  userPrompt,
  model,
  image,
  apiKey,
}: {
  userPrompt: string;
  model: string;
  image: File;
  apiKey: string;
}) => {
  const prompt = userPrompt || DEFAULT_PROMPT;

  const client = getOllamaClient(OLLAMA_CLOUD_API_BASE, apiKey);

  // 1. Convert image using the helper
  const base64Image = await fileToBase64(image);

  // 2. Interact with the Ollama API
  try {
    const response = await client.chat({
      model: model,
      messages: [
        {
          role: "user",
          content: prompt,
          images: [base64Image],
        },
      ],
      stream: false,
      options: {
        temperature: 0.1,
      },
    });

    if (!response) {
      throw new Error("Failed to generate response from Ollama API");
    }

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate response from Ollama API");
  }
};
