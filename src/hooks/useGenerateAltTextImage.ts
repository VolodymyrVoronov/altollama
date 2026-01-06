import { useAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";
import { useRef } from "react";

import { generateOllamaLocalAltText } from "@/services/api/ollama-local";
import { db } from "@/services/db/index-db";
import { useImageStorage } from "./useImageStorage";

const generateAltTextAtom = atomWithMutation(() => ({
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

export const useGenerateAltTextImage = () => {
  const [{ mutate, status, data, error, isPending, variables, reset }] =
    useAtom(generateAltTextAtom);
  const { refreshImages } = useImageStorage();

  const controllerRef = useRef<AbortController | null>(null);

  const generateAltText = async (
    imageId: number,
    userPrompt: string,
    model: string,
    selectedOllamaType: string,
  ) => {
    controllerRef.current = new AbortController();

    mutate(
      {
        imageId,
        userPrompt,
        model,
        selectedOllamaType,
        signal: controllerRef.current?.signal,
      },
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
