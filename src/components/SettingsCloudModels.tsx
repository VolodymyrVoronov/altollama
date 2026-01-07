import { useAtomValue, useSetAtom } from "jotai";

import { useOllamaCloudModels } from "@/hooks/useOllamaCloudModels";
import { selectedOllamaCloudModelAtom } from "@/stores/app";

import Models from "./Models";
import SettingsAPIKey from "./SettingsAPIKey";
import SettingsModelsEmptyMessage from "./SettingsModelsEmptyMessage";
import SettingsModelsErrorMessage from "./SettingsModelsErrorMessage";
import SettingsModelsLoadingMessage from "./SettingsModelsLoadingMessage";
import SettingsPrompt from "./SettingsPrompt";

const SettingsCloudModels = () => {
  const selectedCloudModel = useAtomValue(selectedOllamaCloudModelAtom);
  const setCloudModel = useSetAtom(selectedOllamaCloudModelAtom);

  const { models, isPending, isError, error } = useOllamaCloudModels();

  if (isPending)
    return (
      <SettingsModelsLoadingMessage>
        Loading cloud models...
      </SettingsModelsLoadingMessage>
    );

  if (isError)
    return (
      <SettingsModelsErrorMessage
        title="Something went wrong"
        error={error?.message}
      />
    );

  if (models && models?.models?.length === 0)
    return (
      <SettingsModelsEmptyMessage
        title="No cloud models"
        description="Try to add a model"
      />
    );

  return (
    <div className="flex flex-col gap-2">
      <SettingsAPIKey />

      <SettingsPrompt />

      <Models
        models={models?.models}
        model={selectedCloudModel}
        disabled={isPending}
        modelsContainerClassName="h-[calc(100svh-505px)]"
        onModelChange={setCloudModel}
      />
    </div>
  );
};

export default SettingsCloudModels;
