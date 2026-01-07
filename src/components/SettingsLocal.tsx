import { usePingOllamaLocal } from "@/hooks/usePingOllamaLocal";

import SettingsLoadingMessage from "./SettingsLoadingMessage";
import SettingsLocalModels from "./SettingsLocalModels";
import SettingsOfflineMessage from "./SettingsOfflineMessage";
import SettingsOnlineMessage from "./SettingsOnlineMessage";

const SettingsLocal = () => {
  const { isOllamaRunning, isPending, ping } = usePingOllamaLocal();

  if (isPending) {
    return <SettingsLoadingMessage>Loading Ollama...</SettingsLoadingMessage>;
  }

  if (!isOllamaRunning) {
    return (
      <SettingsOfflineMessage
        statusLabel="Ollama is offline"
        emptyTitle="Could not reach Ollama"
        emptyDescription="Please try again"
        ping={ping}
        isPending={isPending}
      />
    );
  }

  return (
    <div className="flex h-[calc(100svh-86px)] flex-col gap-2 overflow-y-auto">
      <SettingsOnlineMessage>Ollama is running</SettingsOnlineMessage>

      <SettingsLocalModels />
    </div>
  );
};

export default SettingsLocal;
