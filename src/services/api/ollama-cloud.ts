import { DEFAULT_PROMPT, IS_DEV_MODE } from "@/constants";
import { fileToBase64 } from "@/helpers";
import type { IOllamaTagsResponse } from "@/types";

const OLLAMA_CLOUD_API_BASE = IS_DEV_MODE
  ? "http://localhost:5173/api-proxy"
  : "https://ollama.com/api";

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

export const fetchOllamaCouldModels =
  async (): Promise<IOllamaTagsResponse> => {
    try {
      const url = `${OLLAMA_CLOUD_API_BASE}/api/tags`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.error("Failed to fetch Ollama models:", error);
      throw error;
    }
  };

export const generateOllamaCloudAltText = async ({
  userPrompt,
  model,
  image,
  signal,
  apiKey,
}: {
  userPrompt: string;
  model: string;
  image: File;
  signal: AbortSignal;
  apiKey: string;
}) => {
  const prompt = userPrompt || DEFAULT_PROMPT;
  const url = `${OLLAMA_CLOUD_API_BASE}/api/chat`;

  const base64Image = await fileToBase64(image);

  const payload = {
    model,
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
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("Failed to generate response from Ollama API:", error);
    throw error;
  }
};
