import { useAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";

import { db } from "@/services/db/index-db";
import { useImageStorage } from "./useImageStorage";

async function mockVisionAIRequest(imageId: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `A beautiful high-resolution image showcasing modern architecture. (${imageId})`,
      );
    }, 5000);
  });
}

const generateAltTextAtom = atomWithMutation(() => ({
  mutationFn: async ({ imageId }: { imageId: number }) => {
    const image = await db.images.get(imageId);

    if (!image || !image.file) throw new Error("Image not found");

    const altText = await mockVisionAIRequest(imageId);

    await db.images.update(imageId, { image_alt_text: altText });

    return { imageId, altText };
  },
}));

export const useGenerateAltTextImage = () => {
  const [{ mutate, status, data, error, isPending, variables }] =
    useAtom(generateAltTextAtom);
  const { refreshImages } = useImageStorage();

  const generateAltText = async (imageId: number) => {
    mutate({ imageId }, { onSuccess: async () => refreshImages() });
  };

  return {
    generateAltText,

    isGeneratingAltTextImage: isPending,
    generatingAltTextImageId: isPending ? variables?.imageId : null,
    generatedAltText: data?.altText,
    errorAltTextImage: error,
    statusAltTextImage: status,
  };
};
