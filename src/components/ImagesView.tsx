import { VirtuosoGrid } from "react-virtuoso";
import { toast } from "sonner";

import { useGenerateAltTextImage } from "@/hooks/useGenerateAltTextImage";
import { useGenerateAltTextImages } from "@/hooks/useGenerateAltTextImages";
import { useImageStorage } from "@/hooks/useImageStorage";

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

        {isGeneratingAltTextsImage ? (
          <Button
            size="sm"
            variant="destructive"
            onClick={onCancelAltTextsGeneration}
            disabled={!isGeneratingAltTextImage && !isGeneratingAltTextsImage}
          >
            Stop processing all images
          </Button>
        ) : null}
      </ButtonGroup>

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
