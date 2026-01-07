import { atomWithQuery } from "jotai-tanstack-query";
import { useAtom } from "jotai";

import { pingOllamaCloud } from "@/services/api/ollama-cloud";

const pingOllamaCloudAtom = atomWithQuery(() => ({
  queryKey: ["ping-ollama-cloud"],
  queryFn: pingOllamaCloud,
}));

export const usePingOllamaCloud = () => {
  const [{ data: isOllamaRunning, isPending, refetch: ping }] =
    useAtom(pingOllamaCloudAtom);

  return { isOllamaRunning, isPending, ping };
};
