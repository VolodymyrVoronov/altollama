import { BanIcon, SparklesIcon, Trash2Icon } from "lucide-react";

import type { ImageDisplay } from "@/types";

import { ImageZoom } from "@/components/kibo-ui/image-zoom";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export interface ImageViewProps {
  image: ImageDisplay;
  disabled?: boolean;
  generating?: boolean;
  showAbortButton?: boolean;

  onGenerateAltText: (imageId: number) => void;
  onDelete: (imageId: number) => void;
  onCancelGeneration?: () => void;
}

const ImageView = ({
  image,
  disabled,
  generating,
  showAbortButton,

  onGenerateAltText,
  onDelete,
  onCancelGeneration,
}: ImageViewProps) => {
  const onGenerateAltTextButtonClick = () => {
    if (image.id) {
      onGenerateAltText(image.id);
    }
  };

  const onDeleteButtonClick = () => {
    if (image.id) {
      onDelete(image.id);
    }
  };

  return (
    <Card className="w-full gap-2 pt-0 pb-3">
      <CardContent className="px-0">
        <ImageZoom isDisabled={generating}>
          <img
            src={image.previewUrl || ""}
            alt={image.name || ""}
            className={cn(
              "aspect-video h-56 rounded-t-xl object-cover sm:h-50",
              {
                "animate-pulse": generating,
              },
            )}
          />
        </ImageZoom>
      </CardContent>

      <CardHeader className="px-3">
        <CardTitle className="truncate leading-normal">{image.name}</CardTitle>
        <CardDescription>
          {image.image_alt_text ? image.image_alt_text : "No alt text yet."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="justify-end-safe gap-2 px-3">
        <ButtonGroup>
          <Button
            size="icon-sm"
            disabled={disabled}
            onClick={onGenerateAltTextButtonClick}
          >
            {generating ? <Spinner /> : <SparklesIcon />}
          </Button>

          <Button
            size="icon-sm"
            variant="destructive"
            disabled={disabled}
            onClick={onDeleteButtonClick}
          >
            <Trash2Icon />
          </Button>
        </ButtonGroup>

        {showAbortButton && (
          <Button
            size="icon-sm"
            variant="destructive"
            onClick={onCancelGeneration}
          >
            <BanIcon />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ImageView;
