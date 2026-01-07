import { type ReactNode } from "react";

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "./ui/spinner";

export interface ISettingsModelsLoadingMessageProps {
  children?: ReactNode;
}

const SettingsModelsLoadingMessage = ({
  children,
}: ISettingsModelsLoadingMessageProps) => {
  return (
    <Item variant="muted">
      <ItemMedia>
        <Spinner />
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="line-clamp-1">
          {children || "Loading models..."}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
};

export default SettingsModelsLoadingMessage;
