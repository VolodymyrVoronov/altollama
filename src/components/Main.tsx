import ImagesView from "./ImagesView";
import ImageUploader from "./ImageUploader";

const Main = () => {
  return (
    <main className="flex h-[calc(100svh-48px)] flex-col gap-2">
      <ImageUploader />

      <div className="flex h-full flex-col items-start gap-2 overflow-hidden">
        <ImagesView />
      </div>
    </main>
  );
};

export default Main;
