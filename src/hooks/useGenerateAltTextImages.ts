import { useAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";

import { db } from "@/services/db/index-db";
import { useImageStorage } from "./useImageStorage";
import { useRef, useState } from "react";

async function mockVisionAIRequest(
  imageId: number,
  signal?: AbortSignal,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () =>
        resolve(`AI Description. Test test test. Test test test. ${imageId}`),
      5000,
    );

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Operation cancelled"));
    });
  });
}
const generateAltTextsAtom = atomWithMutation(() => ({
  mutationFn: async ({
    imageId,
    signal,
  }: {
    imageId: number;
    signal?: AbortSignal;
  }) => {
    const image = await db.images.get(imageId);

    if (!image || !image.file) throw new Error("Image not found");

    const altText = await mockVisionAIRequest(imageId, signal);

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

  const generateAltTexts = async (imageIds: number[]) => {
    setIsBatchActive(true);

    controllerRef.current = new AbortController();

    for (const imageId of imageIds) {
      try {
        // mutateAsync returns a promise, allowing us to wait
        // for one to finish before starting the next.
        await mutateAsync(
          { imageId, signal: controllerRef.current?.signal },
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
