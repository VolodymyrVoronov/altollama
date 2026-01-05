import { useAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";

import { db } from "@/services/db/index-db";
import { useImageStorage } from "./useImageStorage";
import { useState } from "react";

async function mockVisionAIRequest(imageId: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `A beautiful high-resolution image showcasing modern architecture. (${imageId})`,
      );
    }, 3000);
  });
}

const generateAltTextsAtom = atomWithMutation(() => ({
  mutationFn: async ({ imageId }: { imageId: number }) => {
    const image = await db.images.get(imageId);

    if (!image || !image.file) throw new Error("Image not found");

    const altText = await mockVisionAIRequest(imageId);

    await db.images.update(imageId, { image_alt_text: altText });

    return { imageId, altText };
  },
}));

export const useGenerateAltTextImages = () => {
  const [{ mutateAsync, status, data, error, isPending, variables }] =
    useAtom(generateAltTextsAtom);
  const { refreshImages } = useImageStorage();

  const [isBatchActive, setIsBatchActive] = useState(false);

  const generateAltTexts = async (imageIds: number[]) => {
    setIsBatchActive(true);

    for (const imageId of imageIds) {
      try {
        // mutateAsync returns a promise, allowing us to wait
        // for one to finish before starting the next.
        await mutateAsync({ imageId });

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
