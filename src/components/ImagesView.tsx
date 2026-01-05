import { useImageStorage } from "@/hooks/useImageStorage";

import ImageView from "./ImageView";

const ImagesView = () => {
  const { images } = useImageStorage();

  console.log("images", images);

  return (
    <div className="grid h-full grid-cols-1 content-start items-start gap-2 overflow-x-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((img) => (
        <ImageView key={img.id} image={img} />
      ))}
    </div>
  );
};

export default ImagesView;
