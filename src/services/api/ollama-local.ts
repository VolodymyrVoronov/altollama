import { DEFAULT_PROMPT } from "@/constants";
import { fileToBase64 } from "@/helpers";
import type { IOllamaTagsResponse, OllamaChatResponse } from "@/types";

const OLLAMA_LOCAL_API_BASE = "http://localhost:11434/api";

export const pingOllamaLocal = async (): Promise<boolean> => {
  try {
    const url = OLLAMA_LOCAL_API_BASE.replace("/api", "");

    const response = await fetch(url);

    if (response.ok) {
      const text = await response.text();

      return text.trim() === "Ollama is running";
    }

    return false;
  } catch (error) {
    console.error("Ollama is not reachable:", error);
    return false;
  }
};

export const fetchOllamaLocalModels =
  async (): Promise<IOllamaTagsResponse> => {
    try {
      const url = `${OLLAMA_LOCAL_API_BASE}/tags`;

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

export const generateOllamaLocalAltText = async ({
  userPrompt,
  model,
  image,
  signal,
}: {
  userPrompt: string;
  model: string;
  image: File;
  signal: AbortSignal;
}): Promise<OllamaChatResponse> => {
  const prompt = userPrompt || DEFAULT_PROMPT;
  const url = `${OLLAMA_LOCAL_API_BASE}/chat`;

  // 1. Convert image using the helper
  const base64Image = await fileToBase64(image);

  // 2. Build the JSON body
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
      },
      body: JSON.stringify(payload),
      signal,
    });

    const data: OllamaChatResponse = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error(data.error || "Failed to generate description");
    }

    return data;
  } catch (error) {
    console.error("Failed to generate description:", error);
    throw error;
  }
};
