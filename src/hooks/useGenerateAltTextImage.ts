import { useAtom, useAtomValue } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";
import { useRef } from "react";

import { generateOllamaLocalAltText } from "@/services/api/ollama-local";
import { db } from "@/services/db/index-db";
import { apiKeyInputAtom } from "@/stores/app";
import { useImageStorage } from "./useImageStorage";
import { generateOllamaCloudAltText } from "@/services/api/ollama-cloud";

const generateAltTextAtom = atomWithMutation(() => ({
  mutationFn: async ({
    imageId,
    userPrompt,
    model,
    selectedOllamaType,
    signal,
    apiKey,
  }: {
    imageId: number;
    userPrompt: string;
    model: string;
    selectedOllamaType: string;
    signal: AbortSignal;
    apiKey: string;
  }) => {
    if (!model) throw new Error("No model selected");

    const image = await db.images.get(imageId);

    if (!image || !image.file) throw new Error("Image not found");

    const isOllamaLocal = selectedOllamaType === "ollama-local";

    const response = isOllamaLocal
      ? await generateOllamaLocalAltText({
          image: image.file,
          userPrompt,
          model,
          signal,
        })
      : await generateOllamaCloudAltText({
          userPrompt,
          model,
          image: image.file,
          signal,
          apiKey,
        });

    const altText = response.message.content;

    await db.images.update(imageId, { image_alt_text: altText });

    return { imageId, altText };
  },
}));

export const useGenerateAltTextImage = () => {
  const apiKey = useAtomValue(apiKeyInputAtom);
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
        apiKey,
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
