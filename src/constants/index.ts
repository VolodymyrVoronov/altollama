export const DEFAULT_PROMPT = `Act as an Accessibility Specialist. Your task is to write alternative text (alt-text) for the provided image to assist users of screen readers.

  Please provide 5 distinct variations of alt-text, following these rules:
    1. Conciseness: Keep each description under 150 characters.
    2. No Redundancy: Do NOT start with "Image of," "Photo of," or "Graphic of." 
    3. Informative: Focus on the most important visual elements and the context of the scene.
    4. Variety: Provide a range of detail—from a basic summary to a more descriptive version.
    5. Format: List them as 1 through 5, with each variant on its own line.

  Provide only the list of variants.
`;

export const IS_DEV_MODE = process.env.NODE_ENV === "development";

export const OLLAMA_CLOUD_API_KEY_STORAGE_KEY =
  "alt-text-generator-2-ollama-cloud-api-key";
