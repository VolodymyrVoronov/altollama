import { useAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";
import { useMemo, useRef, useState } from "react";

import { generateOllamaLocalAltText } from "@/services/api/ollama-local";
import { db } from "@/services/db/index-db";
import { useImageStorage } from "./useImageStorage";

const generateAltTextsAtom = atomWithMutation(() => ({
  mutationFn: async ({
    imageId,
    userPrompt,
    model,
    selectedOllamaType,
    signal,
  }: {
    imageId: number;
    userPrompt: string;
    model: string;
    selectedOllamaType: string;
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
  const [completedCount, setCompletedCount] = useState(0);
  const [totalInBatch, setTotalInBatch] = useState(0);

  const generateAltTexts = async (
    imageIds: number[],
    userPrompt: string,
    model: string,
    selectedOllamaType: string,
  ) => {
    setIsBatchActive(true);
    setCompletedCount(0);
    setTotalInBatch(imageIds.length || 0);

    controllerRef.current = new AbortController();

    for (const imageId of imageIds) {
      try {
        // mutateAsync returns a promise, allowing us to wait
        // for one to finish before starting the next.
        await mutateAsync(
          {
            imageId,
            userPrompt,
            model,
            selectedOllamaType,
            signal: controllerRef.current?.signal,
          },
          {
            onError: () => {
              reset();
            },
          },
        );

        setCompletedCount((prev) => prev + 1);

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
    setCompletedCount(0);
  };

  const progressPercentage = useMemo(() => {
    if (totalInBatch === 0) return 0;

    return Math.round((completedCount / totalInBatch) * 100);
  }, [completedCount, totalInBatch]);

  return {
    generateAltTexts,
    cancelAltTextsGeneration,

    progressPercentage,
    processedCount: completedCount,
    totalCount: totalInBatch,
    isGeneratingAltTextsImage: isPending || isBatchActive,
    generatingAltTextsImageId: isPending ? variables?.imageId : null,
    generatedAltTexts: data?.altText,
    errorAltTextsImage: error,
    statusAltTextsImage: status,
  };
};
