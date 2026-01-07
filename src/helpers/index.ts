import { Ollama } from "ollama";

/**
 * Converts a File object to a Base64 string stripped of the data URL prefix.
 * Required for Ollama API image processing.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      if (result) {
        // Split on comma to remove "data:image/png;base64,"
        const base64String = result.split(",")[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Converts bytes to a human-readable format
 */
export const renderBytes = (bytes: number): string => {
  if (bytes === 0) return "0B";

  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)}${units[unitIndex]}`;
};

/**
 * Creates a new Ollama client with the provided host and API key.
 */
export const getOllamaClient = (host: string, apiKey?: string) => {
  if (!apiKey) return new Ollama({ host });

  return new Ollama({
    host: host,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
};
