import { useAtomValue, useSetAtom } from "jotai";
import { CircleXIcon, FolderIcon } from "lucide-react";

import { useOllamaLocalModels } from "@/hooks/useOllamaLocalModels";
import { selectedOllamaLocalModel } from "@/stores/app";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Models from "./Models";
import { Spinner } from "./ui/spinner";

const SettingsLocalModels = () => {
  const setLocalModel = useSetAtom(selectedOllamaLocalModel);
  const selectedLocalModel = useAtomValue(selectedOllamaLocalModel);

  const { models, isPending, isError, error } = useOllamaLocalModels();

  if (isPending)
    return (
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>

        <ItemContent>
          <ItemTitle className="line-clamp-1">Loading models...</ItemTitle>
        </ItemContent>
      </Item>
    );

  if (isError)
    return (
      <Item variant="muted">
        <ItemMedia>
          <CircleXIcon />
        </ItemMedia>

        <ItemContent>
          <ItemTitle className="line-clamp-1">Something went wrong</ItemTitle>
          <ItemDescription>{error?.message}</ItemDescription>
        </ItemContent>
      </Item>
    );

  if (models && models?.models?.length === 0)
    return (
      <Item variant="muted">
        <ItemMedia>
          <FolderIcon />
        </ItemMedia>

        <ItemContent>
          <ItemTitle className="line-clamp-1">No models</ItemTitle>
          <ItemDescription>Try to add a model locally</ItemDescription>
        </ItemContent>
      </Item>
    );

  return (
    <div>
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
