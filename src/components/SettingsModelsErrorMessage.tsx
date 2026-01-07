import { CircleXIcon } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export interface ISettingsModelsErrorMessageProps {
  title: string;
  error?: string;
}

const SettingsModelsErrorMessage = ({
  title = "Something went wrong",
  error = "Unknown error",
}: ISettingsModelsErrorMessageProps) => {
  return (
    <Item variant="muted">
      <ItemMedia>
        <CircleXIcon />
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="line-clamp-1">{title}</ItemTitle>
        <ItemDescription>{error}</ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default SettingsModelsErrorMessage;
