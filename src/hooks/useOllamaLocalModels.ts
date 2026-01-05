import { useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

import { fetchOllamaLocalModels } from "@/services/api/ollama-local";

const ollamaLocalModelsAtom = atomWithQuery(() => ({
  queryKey: ["ollama-local-models"],
  queryFn: fetchOllamaLocalModels,
}));

export const useOllamaLocalModels = () => {
  const [{ data: models, isPending, isError, error }] = useAtom(
    ollamaLocalModelsAtom,
  );

  return { models, isPending, isError, error };
};
