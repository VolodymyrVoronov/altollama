import { useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

import { fetchOllamaCouldModels } from "@/services/api/ollama-cloud";

const ollamaCloudModelsAtom = atomWithQuery(() => ({
  queryKey: ["ollama-cloud-models"],
  queryFn: fetchOllamaCouldModels,
}));

export const useOllamaCloudModels = () => {
  const [{ data: models, isPending, isError, error }] = useAtom(
    ollamaCloudModelsAtom,
  );

  return { models, isPending, isError, error };
};
