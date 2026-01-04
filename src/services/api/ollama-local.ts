import type { IOllamaTagsResponse } from "@/types";

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
