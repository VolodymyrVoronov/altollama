import { useImageStorage } from "@/hooks/useImageStorage";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/kibo-ui/dropzone";

const ImageUploader = () => {
  const { uploadImages } = useImageStorage();

  const onUploadImagesChange = async (files: File[]) => {
    if (files && files.length > 0) {
      await uploadImages(files);
    }
  };

  return (
    <div>
      <Dropzone
        className="max-h-37.5"
        accept={{ "image/*": [] }}
        maxFiles={10}
        onDrop={onUploadImagesChange}
        onError={console.error}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  );
};

export default ImageUploader;
