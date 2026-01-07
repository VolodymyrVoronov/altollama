import type { ReactNode } from "react";

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "./ui/spinner";

export interface ISettingsLoadingMessageProps {
  children?: ReactNode;
}

const SettingsLoadingMessage = ({ children }: ISettingsLoadingMessageProps) => {
  return (
    <div className="flex h-[calc(100svh-86px)] flex-col gap-2 overflow-y-auto">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>

        <ItemContent>
          <ItemTitle className="line-clamp-1">
            {children || "Loading..."}
          </ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
};

export default SettingsLoadingMessage;
