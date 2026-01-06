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
