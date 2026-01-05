import type { ImageDisplay } from "@/types";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ImageZoom } from "@/components/kibo-ui/image-zoom";

export interface ImageViewProps {
  image: ImageDisplay;
  disabled?: boolean;
}

const ImageView = ({ image }: ImageViewProps) => {
  return (
    <Card className="w-full gap-2 pt-0 pb-3">
      <CardContent className="px-0">
        <ImageZoom>
          <img
            src={image.previewUrl}
            alt={image.name}
            className="aspect-video h-56 rounded-t-xl object-cover sm:h-50"
          />
        </ImageZoom>
      </CardContent>

      <CardHeader className="px-3">
        <CardTitle className="truncate">{image.name}</CardTitle>
        <CardDescription>
          {image.image_alt_text ? image.image_alt_text : "No alt text yet."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="px-3">
        <ButtonGroup>
          <Button size="sm">Explore More</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ImageView;
