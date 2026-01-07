import { usePingOllamaCloud } from "@/hooks/usePingOllamaCloud";

import SettingsLoadingMessage from "./SettingsLoadingMessage";
import SettingsOfflineMessage from "./SettingsOfflineMessage";
import SettingsOnlineMessage from "./SettingsOnlineMessage";

const SettingsCloud = () => {
  const { isOllamaRunning, isPending, ping } = usePingOllamaCloud();

  if (isPending) {
    return (
      <SettingsLoadingMessage>Loading Ollama Cloud...</SettingsLoadingMessage>
    );
  }

  if (!isOllamaRunning) {
    return (
      <SettingsOfflineMessage
        statusLabel="Ollama Cloud is offline"
        emptyTitle="Could not reach Ollama Cloud"
        emptyDescription="Please try again"
        ping={ping}
        isPending={isPending}
      />
    );
  }

  return (
    <div className="flex h-[calc(100svh-86px)] flex-col gap-2 overflow-y-auto">
      <SettingsOnlineMessage>Ollama Cloud is running</SettingsOnlineMessage>

      {/* <SettingsLocalModels /> */}
    </div>
  );
};

export default SettingsCloud;
