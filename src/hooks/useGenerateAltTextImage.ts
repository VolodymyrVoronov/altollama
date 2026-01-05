import { useAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";

import { db } from "@/services/db/index-db";
import { useImageStorage } from "./useImageStorage";
import { useRef } from "react";

async function mockVisionAIRequest(
  imageId: number,
  signal?: AbortSignal,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => resolve(`Some kind of test. ${imageId}`),
      5000,
    );

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Operation cancelled"));
    });
  });
}

const generateAltTextAtom = atomWithMutation(() => ({
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

export const useGenerateAltTextImage = () => {
  const [{ mutate, status, data, error, isPending, variables, reset }] =
    useAtom(generateAltTextAtom);
  const { refreshImages } = useImageStorage();

  const controllerRef = useRef<AbortController | null>(null);

  const generateAltText = async (imageId: number) => {
    controllerRef.current = new AbortController();

    mutate(
      { imageId, signal: controllerRef.current?.signal },
      {
        onSuccess: async () => refreshImages(),
        onError: () => {
          reset();
        },
      },
    );
  };

  const cancelAltTextGeneration = () => {
    controllerRef.current?.abort();
  };

  return {
    generateAltText,
    cancelAltTextGeneration,

    isGeneratingAltTextImage: isPending,
    generatingAltTextImageId: isPending ? variables?.imageId : null,
    generatedAltText: data?.altText,
    errorAltTextImage: error,
    statusAltTextImage: status,
  };
};
