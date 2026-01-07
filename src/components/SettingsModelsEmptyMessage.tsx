import { FolderIcon } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export interface ISettingsModelsEmptyMessageProps {
  title?: string;
  description?: string;
}

const SettingsModelsEmptyMessage = ({
  title = "No models",
  description = "Try to add a model",
}: ISettingsModelsEmptyMessageProps) => {
  return (
    <Item variant="muted">
      <ItemMedia>
        <FolderIcon />
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="line-clamp-1">{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default SettingsModelsEmptyMessage;
