import { useAtomValue } from "jotai";
import { BanIcon, FolderIcon, SparklesIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { toast } from "sonner";

import { useGenerateAltTextImage } from "@/hooks/useGenerateAltTextImage";
import { useGenerateAltTextImages } from "@/hooks/useGenerateAltTextImages";
import { useImageStorage } from "@/hooks/useImageStorage";
import { selectedOllamaLocalModel, userPrompt } from "@/stores/app";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ImageView from "./ImageView";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Spinner } from "./ui/spinner";

const showErrorNoModelSelected = () => {
  toast.error("Please select a model before generating alt text.", {
    richColors: true,
  });
};

const ImagesView = () => {
  const { images, deleteImage, deleteAllImages } = useImageStorage();

  const {
    generateAltText,
    cancelAltTextGeneration,
    isGeneratingAltTextImage,
    generatingAltTextImageId,
    errorAltTextImage,
  } = useGenerateAltTextImage();

  const {
    generateAltTexts,
    cancelAltTextsGeneration,
    isGeneratingAltTextsImage,
    generatingAltTextsImageId,
    errorAltTextsImage,
  } = useGenerateAltTextImages();

  const prompt = useAtomValue(userPrompt, {
    delay: 500,
  });
  const selectedLocalModel = useAtomValue(selectedOllamaLocalModel);

  const [showPopover, setShowPopover] = useState(false);

  if (!images.length) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderIcon />
            </EmptyMedia>
            <EmptyTitle>No images found</EmptyTitle>
            <EmptyDescription>
              Start uploading images to get started and generate alt text/s
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  if (errorAltTextImage || errorAltTextsImage) {
    toast.error("Error while processing images. Please try again later.", {
      richColors: true,
    });
  }

  const onGenerateAltText = (id: number) => {
    if (!selectedLocalModel) {
      showErrorNoModelSelected();

      return;
    }

    if (id && selectedLocalModel) {
      generateAltText(id, prompt, selectedLocalModel);
    }
  };

  const onGenerateAltTexts = () => {
    if (!selectedLocalModel) {
      showErrorNoModelSelected();

      return;
    }

    const imageIds = images
      .map((img) => img.id)
      .filter((id): id is number => id !== undefined);

    if (imageIds.length && selectedLocalModel) {
      generateAltTexts(imageIds, prompt, selectedLocalModel);
    }
  };

  const onCancelAltTextGeneration = () => cancelAltTextGeneration();

  const onCancelAltTextsGeneration = () => cancelAltTextsGeneration();

  const onDelete = (id: number) => deleteImage(id);

  return (
    <>
      <div className="flex w-full flex-row items-center justify-between">
        <ButtonGroup>
          <Button
            size="sm"
            onClick={onGenerateAltTexts}
            disabled={isGeneratingAltTextImage || isGeneratingAltTextsImage}
          >
            {isGeneratingAltTextImage || isGeneratingAltTextsImage ? (
              <>
                Processing...
                <Spinner />
              </>
            ) : (
              <>
                Process all images <SparklesIcon />
              </>
            )}
          </Button>

          {isGeneratingAltTextsImage ? (
            <Button
              size="sm"
              variant="destructive"
              onClick={onCancelAltTextsGeneration}
              disabled={!isGeneratingAltTextImage && !isGeneratingAltTextsImage}
            >
              Stop processing all images <BanIcon />
            </Button>
          ) : null}
        </ButtonGroup>

        <ButtonGroup>
          <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                disabled={isGeneratingAltTextImage || isGeneratingAltTextsImage}
              >
                Delete all images <Trash2Icon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <p>
                Are you sure you want to delete all images? The process is
                irreversible.
              </p>

              <ButtonGroup className="w-full">
                <Button
                  onClick={() => setShowPopover(false)}
                  size="sm"
                  className="flex-1"
                >
                  No
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteAllImages();
                    setShowPopover(false);
                  }}
                  disabled={
                    isGeneratingAltTextImage || isGeneratingAltTextsImage
                  }
                  size="sm"
                  className="flex-1"
                >
                  Yes
                </Button>
              </ButtonGroup>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </div>

      <div className="h-full w-full">
        <VirtuosoGrid
          style={{ height: "100%" }}
          listClassName="grid grid-cols-1 content-start items-stretch gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          totalCount={images?.length}
          itemContent={(index) => {
            const image = images?.[index];

            if (!image) {
              return null;
            }

            return (
              <ImageView
                key={image.id}
                image={image}
                onGenerateAltText={onGenerateAltText}
                onDelete={onDelete}
                onCancelGeneration={onCancelAltTextGeneration}
                disabled={isGeneratingAltTextImage || isGeneratingAltTextsImage}
                generating={
                  generatingAltTextImageId === image.id ||
                  generatingAltTextsImageId === image.id
                }
                showAbortButton={
                  generatingAltTextImageId === image.id &&
                  isGeneratingAltTextImage
                }
              />
            );
          }}
        />
      </div>
    </>
  );
};

export default ImagesView;
