import { format } from "date-fns";
import { BanIcon, InfoIcon, SparkleIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { cn } from "@/lib/utils";
import type { ImageDisplay } from "@/types";

import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ButtonCopy from "./smoothui/button-copy";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

import "yet-another-react-lightbox/styles.css";

export interface ImageViewProps {
  image: ImageDisplay;
  disabled?: boolean;
  generating?: boolean;
  showAbortButton?: boolean;

  onGenerateAltText: (imageId: number) => void;
  onDelete: (imageId: number) => void;
  onCancelGeneration?: () => void;
}

const TIME_FORMAT = "dd/MM/yyyy HH:mm";

const ImageView = ({
  image,
  disabled,
  generating,
  showAbortButton,

  onGenerateAltText,
  onDelete,
  onCancelGeneration,
}: ImageViewProps) => {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);

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

  const onLightBoxOpenButtonClick = () => {
    setLightBoxOpen(true);
  };

  const onLightBoxCloseButtonClick = () => {
    setLightBoxOpen(false);
  };

  const onCopyButtonClick = async () => {
    if (image.id && image.image_alt_text) {
      await navigator.clipboard.writeText(image.image_alt_text);
    }
  };

  return (
    <Card className="relative h-full w-full gap-2 pt-0 pb-3">
      <CardContent className="px-0">
        <Tooltip>
          <TooltipTrigger
            asChild
            className="absolute top-2 right-2 z-10 cursor-help"
          >
            <Button variant="outline" size="icon-xs">
              <InfoIcon className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Image uploaded at {format(image.createdAt, TIME_FORMAT)}</p>
          </TooltipContent>
        </Tooltip>

        <Button
          onClick={onLightBoxOpenButtonClick}
          asChild
          className={cn("m-0 rounded-none p-0 hover:cursor-zoom-in", {
            "pointer-events-none": generating,
          })}
        >
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
        </Button>

        <Lightbox
          open={lightBoxOpen}
          close={onLightBoxCloseButtonClick}
          controller={{
            closeOnBackdropClick: true,
          }}
          slides={[
            {
              src: image.previewUrl || "",
              alt: image.name || "",
            },
          ]}
          styles={{
            navigationPrev: {
              display: "none",
            },
            navigationNext: {
              display: "none",
            },
          }}
        />
      </CardContent>

      <CardHeader className="px-3">
        <CardTitle className="truncate leading-normal" title={image.name}>
          {image.name}
        </CardTitle>
        <CardDescription className="text-pretty">
          {image.image_alt_text ? image.image_alt_text : "-"}
        </CardDescription>
      </CardHeader>

      <CardFooter className="justify-end-safe gap-2 px-3">
        {image.image_alt_text ? (
          <div className="mr-auto">
            <ButtonCopy
              duration={2000}
              loadingDuration={1000}
              onCopy={onCopyButtonClick}
              disabled={disabled}
            />
          </div>
        ) : null}

        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                disabled={disabled}
                onClick={onGenerateAltTextButtonClick}
              >
                {generating ? <Spinner /> : <SparkleIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate alt text</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                variant="destructive"
                disabled={disabled}
                onClick={onDeleteButtonClick}
              >
                <Trash2Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete image. This action is permanent</p>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>

        {showAbortButton && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                variant="destructive"
                onClick={onCancelGeneration}
              >
                <BanIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Stop generation</p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  );
};

export default ImageView;
