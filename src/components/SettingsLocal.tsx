import { CircleXIcon, RotateCwIcon } from "lucide-react";

import { usePingOllamaLocal } from "@/hooks/usePingOllamaLocal";
import { cn } from "@/lib/utils";

import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/kibo-ui/status";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import SettingsLocalModels from "./SettingsLocalModels";
import { Button } from "./ui/button";

const SettingsLocal = () => {
  const { isOllamaRunning, isPending, ping } = usePingOllamaLocal();

  if (isPending) {
    return (
      <aside className="flex h-[calc(100svh-86px)] flex-col gap-2 overflow-y-auto">
        <Item variant="muted">
          <ItemMedia>
            <Spinner />
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="line-clamp-1">Loading Ollama...</ItemTitle>
          </ItemContent>
        </Item>
      </aside>
    );
  }

  if (!isOllamaRunning) {
    return (
      <aside className="flex h-[calc(100svh-86px)] flex-col gap-2 overflow-y-auto">
        <Status status="offline" className="w-full">
          <StatusIndicator />
          <StatusLabel>Ollama is offline</StatusLabel>
        </Status>

        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleXIcon />
            </EmptyMedia>
            <EmptyTitle>Could not reach Ollama</EmptyTitle>
            <EmptyDescription>Please try again</EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button onClick={() => ping()} size="icon-xs" disabled={isPending}>
              <RotateCwIcon
                className={cn({
                  "animate-spin": isPending,
                })}
              />
            </Button>
          </EmptyContent>
        </Empty>
      </aside>
    );
  }

  return (
    <div className="flex h-[calc(100svh-86px)] flex-col gap-2 overflow-y-auto">
      <Status status="online" className="w-full">
        <StatusIndicator />
        <StatusLabel>Ollama is running</StatusLabel>
      </Status>

      <SettingsLocalModels />
    </div>
  );
};

export default SettingsLocal;
