import Images from "./ImagesView";
import ImageUploader from "./ImageUploader";

const App = () => {
  return (
    <main className="flex h-[calc(100svh-48px)] flex-col gap-2">
      <ImageUploader />

      <div className="h-full overflow-hidden">
        <Images />
      </div>
    </main>
  );
};

export default App;
