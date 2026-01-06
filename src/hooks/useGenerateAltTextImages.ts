import { useAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";
import { useRef, useState } from "react";

import { generateOllamaLocalAltText } from "@/services/api/ollama-local";
import { db } from "@/services/db/index-db";
import { useImageStorage } from "./useImageStorage";

const generateAltTextsAtom = atomWithMutation(() => ({
  mutationFn: async ({
    imageId,
    userPrompt,
    model,
    signal,
  }: {
    imageId: number;
    userPrompt: string;
    model: string;
    signal: AbortSignal;
  }) => {
    if (!model) throw new Error("No model selected");

    const image = await db.images.get(imageId);

    if (!image || !image.file) throw new Error("Image not found");

    const response = await generateOllamaLocalAltText({
      image: image.file,
      userPrompt,
      model,
      signal,
    });

    const altText = response.message.content;

    await db.images.update(imageId, { image_alt_text: altText });

    return { imageId, altText };
  },
}));

export const useGenerateAltTextImages = () => {
  const [{ mutateAsync, status, data, error, isPending, variables, reset }] =
    useAtom(generateAltTextsAtom);
  const { refreshImages } = useImageStorage();

  const controllerRef = useRef<AbortController | null>(null);

  const [isBatchActive, setIsBatchActive] = useState(false);

  const generateAltTexts = async (
    imageIds: number[],
    userPrompt: string,
    model: string,
  ) => {
    setIsBatchActive(true);

    controllerRef.current = new AbortController();

    for (const imageId of imageIds) {
      try {
        // mutateAsync returns a promise, allowing us to wait
        // for one to finish before starting the next.
        await mutateAsync(
          { imageId, userPrompt, model, signal: controllerRef.current?.signal },
          {
            onError: () => {
              reset();
            },
          },
        );

        // Refresh UI immediately after each individual image is done
        await refreshImages();
      } catch (error) {
        // If one fails (or is aborted), we stop the loop
        console.error(`Batch failed at image ${imageId}:`, error);
        break;
      }
    }

    setIsBatchActive(false);
  };

  const cancelAltTextsGeneration = () => {
    controllerRef.current?.abort();
    setIsBatchActive(false);
  };

  return {
    generateAltTexts,
    cancelAltTextsGeneration,

    isGeneratingAltTextsImage: isPending || isBatchActive,
    generatingAltTextsImageId: isPending ? variables?.imageId : null,
    generatedAltTexts: data?.altText,
    errorAltTextsImage: error,
    statusAltTextsImage: status,
  };
};
