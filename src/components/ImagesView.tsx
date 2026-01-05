import { toast } from "sonner";

import { useGenerateAltTextImage } from "@/hooks/useGenerateAltTextImage";
import { useGenerateAltTextImages } from "@/hooks/useGenerateAltTextImages";
import { useImageStorage } from "@/hooks/useImageStorage";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageView from "./ImageView";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Spinner } from "./ui/spinner";

const ImagesView = () => {
  const { images, deleteImage } = useImageStorage();
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

  console.log("images", images);

  const onGenerateAltText = (id: number) => {
    if (id) {
      generateAltText(id);
    }
  };

  const onGenerateAltTexts = () => {
    const imageIds = images
      .map((img) => img.id)
      .filter((id): id is number => id !== undefined);

    if (imageIds.length) {
      generateAltTexts(imageIds);
    }
  };

  const onCancelAltTextGeneration = () => cancelAltTextGeneration();

  const onCancelAltTextsGeneration = () => cancelAltTextsGeneration();

  const onDelete = (id: number) => deleteImage(id);

  if (errorAltTextImage || errorAltTextsImage) {
    toast.error("Error while processing images. Please try again later.", {
      richColors: true,
    });
  }

  return (
    <>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
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
                <>Process all images</>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Generate alt text for all images</p>
          </TooltipContent>
        </Tooltip>

        {isGeneratingAltTextsImage ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                onClick={onCancelAltTextsGeneration}
                disabled={
                  !isGeneratingAltTextImage && !isGeneratingAltTextsImage
                }
              >
                Stop processing {}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Stop processing all images</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </ButtonGroup>

      <div className="grid h-full grid-cols-1 content-start items-stretch gap-2 overflow-x-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((img) => (
          <ImageView
            key={img.id}
            image={img}
            onGenerateAltText={onGenerateAltText}
            onDelete={onDelete}
            onCancelGeneration={onCancelAltTextGeneration}
            disabled={isGeneratingAltTextImage || isGeneratingAltTextsImage}
            generating={
              generatingAltTextImageId === img.id ||
              generatingAltTextsImageId === img.id
            }
            showAbortButton={
              generatingAltTextImageId === img.id && isGeneratingAltTextImage
            }
          />
        ))}
      </div>
    </>
  );
};

export default ImagesView;
