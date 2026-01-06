import { SparklesCore } from "./ui/sparkles";

const WarningDeviceMessage = () => {
  return (
    <div className="relative flex h-svh w-full items-center justify-center bg-black">
      <div className="text-accent flex flex-col items-center gap-2 p-2 text-center text-pretty">
        <h1 className="text-2xl font-bold">
          This app is not supported on mobile devices.
        </h1>

        <p>Please use a desktop computer or laptop to run this app.</p>

        <small className="italic">
          Mobile support will be added in the future.
        </small>
      </div>

      <div className="absolute inset-0 h-screen w-full">
        <SparklesCore
          id="sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
};

export default WarningDeviceMessage;
