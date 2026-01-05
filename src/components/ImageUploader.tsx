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
