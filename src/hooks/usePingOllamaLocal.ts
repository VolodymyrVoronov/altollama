import { atomWithQuery } from "jotai-tanstack-query";
import { useAtom } from "jotai";

import { pingOllamaLocal } from "@/services/api/ollama-local";

const pingOllamaLocalAtom = atomWithQuery(() => ({
  queryKey: ["ping-ollama-local"],
  queryFn: pingOllamaLocal,
}));

export const usePingOllamaLocal = () => {
  const [{ data: isOllamaRunning, isPending, refetch: ping }] =
    useAtom(pingOllamaLocalAtom);

  return { isOllamaRunning, isPending, ping };
};
