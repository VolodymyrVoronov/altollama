import { useAtomValue, useSetAtom } from "jotai";

import { useOllamaLocalModels } from "@/hooks/useOllamaLocalModels";
import { selectedOllamaLocalModelAtom } from "@/stores/app";

import Models from "./Models";
import SettingsModelsEmptyMessage from "./SettingsModelsEmptyMessage";
import SettingsModelsErrorMessage from "./SettingsModelsErrorMessage";
import SettingsModelsLoadingMessage from "./SettingsModelsLoadingMessage";
import SettingsPrompt from "./SettingsPrompt";

const SettingsLocalModels = () => {
  const selectedLocalModel = useAtomValue(selectedOllamaLocalModelAtom);
  const setLocalModel = useSetAtom(selectedOllamaLocalModelAtom);

  const { models, isPending, isError, error } = useOllamaLocalModels();

  if (isPending)
    return (
      <SettingsModelsLoadingMessage>
        Loading models...
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
        title="No models"
        description="Try to add a model locally"
      />
    );

  return (
    <div className="flex flex-col gap-2">
      <SettingsPrompt />

      <Models
        models={models?.models}
        model={selectedLocalModel}
        disabled={isPending}
        onModelChange={setLocalModel}
      />
    </div>
  );
};

export default SettingsLocalModels;
