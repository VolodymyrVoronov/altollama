import { useImageStorage } from "@/hooks/useImageStorage";
import { useGenerateAltTextImage } from "@/hooks/useGenerateAltTextImage";
import { useGenerateAltTextImages } from "@/hooks/useGenerateAltTextImages";

import ImageView from "./ImageView";
import { Button } from "./ui/button";

const ImagesView = () => {
  const { images, deleteImage } = useImageStorage();
  const {
    generateAltText,
    isGeneratingAltTextImage,
    generatingAltTextImageId,
    errorAltTextImage,
  } = useGenerateAltTextImage();

  const {
    generateAltTexts,
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

  const onDelete = (id: number) => deleteImage(id);

  return (
    <>
      <Button
        size="sm"
        onClick={onGenerateAltTexts}
        disabled={isGeneratingAltTextImage || isGeneratingAltTextsImage}
      >
        Process all images
      </Button>

      <div className="grid h-full grid-cols-1 content-start items-stretch gap-2 overflow-x-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((img) => (
          <ImageView
            key={img.id}
            image={img}
            onGenerateAltText={onGenerateAltText}
            onDelete={onDelete}
            disabled={isGeneratingAltTextImage || isGeneratingAltTextsImage}
            generating={
              generatingAltTextImageId === img.id ||
              generatingAltTextsImageId === img.id
            }
          />
        ))}
      </div>
    </>
  );
};

export default ImagesView;
