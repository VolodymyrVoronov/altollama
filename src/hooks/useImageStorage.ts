import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { db } from "@/services/db/index-db";
import { imagesAtom } from "@/stores/app";
import type { ImageDisplay, ImageItem } from "@/types";

export const useImageStorage = () => {
  const [images, setImages] = useAtom(imagesAtom);

  // Helper to sync IndexedDB to Jotai state
  const refreshImages = useCallback(async () => {
    const allImages = await db.images.toArray();

    // Create object URLs for rendering
    const displayImages: ImageDisplay[] = allImages.map((img) => ({
      ...img,
      previewUrl: URL.createObjectURL(img.file),
    }));

    // Cleanup old URLs to prevent memory leaks
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));

    setImages(displayImages);
  }, [images, setImages]);

  // Load images on mount
  useEffect(() => {
    refreshImages();
  }, []);

  const uploadImages = async (files: File | File[]) => {
    // Ensure we are working with an array
    const fileArray = Array.isArray(files) ? files : [files];

    // Map files to the ImageItem schema
    const newImages: ImageItem[] = fileArray.map((file) => ({
      name: file.name,
      file,
      type: file.type,
      createdAt: Date.now(),
      image_alt_text: "",
    }));

    try {
      // bulkAdd is much more performant for multiple entries
      await db.images.bulkAdd(newImages, { allKeys: true });

      // Refresh the Jotai state once after all items are added
      await refreshImages();
    } catch (error) {
      console.error("Failed to bulk upload images:", error);
    }
  };

  const deleteImage = async (id: number) => {
    await db.images.delete(id);
    await refreshImages();
  };

  const deleteAllImages = async () => {
    await db.images.clear();
    await refreshImages();
  };

  const updateImage = useCallback(
    async (id: number, updates: Partial<Omit<ImageItem, "id">>) => {
      try {
        await db.images.update(id, updates);

        await refreshImages();

        console.log(`Image ${id} updated successfully`);
      } catch (error) {
        console.error("Failed to update image:", error);
      }
    },
    [refreshImages],
  );

  return {
    images,
    uploadImages,
    updateImage,
    deleteImage,
    deleteAllImages,
    refreshImages,
  };
};
