import { CircleXIcon, RotateCwIcon } from "lucide-react";

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
import { Button } from "./ui/button";

export interface ISettingsOfflineMessageProps {
  statusLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  isPending: boolean;

  ping: () => void;
}

const SettingsOfflineMessage = ({
  statusLabel = "The system is offline",
  emptyTitle = "Could not reach the system",
  emptyDescription = "Please try again",
  isPending,

  ping,
}: ISettingsOfflineMessageProps) => {
  return (
    <div className="flex h-[calc(100svh-86px)] flex-col gap-2 overflow-y-auto">
      <Status status="offline" className="w-full">
        <StatusIndicator />
        <StatusLabel>{statusLabel}</StatusLabel>
      </Status>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CircleXIcon />
          </EmptyMedia>
          <EmptyTitle>{emptyTitle}</EmptyTitle>
          <EmptyDescription>{emptyDescription}</EmptyDescription>
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
    </div>
  );
};

export default SettingsOfflineMessage;
