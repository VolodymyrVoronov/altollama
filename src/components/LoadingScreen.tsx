import { SparklesCore } from "./ui/sparkles";
import { Spinner } from "./ui/spinner";

const LoadingScreen = () => {
  return (
    <div className="flex h-[calc(100svh-48px)] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-black">
      <h1 className="relative z-20 inline-flex items-center text-center text-3xl font-bold text-white md:text-7xl lg:text-9xl">
        <span>AltLlama</span> <Spinner className="self-start" />
      </h1>
      <div className="relative h-40 w-160">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 h-0.5 w-3/4 bg-linear-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-linear-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-60 top-0 h-1.25 w-1/4 bg-linear-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-linear-to-r from-transparent via-sky-500 to-transparent" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 h-full w-full bg-black mask-[radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
