import { Provider } from "jotai/react";

import { useIsDesktop } from "./hooks/useIsDesktop.ts";
import { ThemeProvider } from "./providers/theme-provider.tsx";

import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import Settings from "./components/Settings.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const App = () => {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return (
      <div className="flex h-svh w-full flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">
          This app is not supported on mobile.
        </h1>

        <p>Please use a desktop computer or laptop to use this app.</p>

        <small className="italic">
          Mobile support will be added in the future.
        </small>
      </div>
    );
  }

  return (
    <>
      <Provider>
        <ThemeProvider>
          <div className="grid-row-[auto_1fr] grid h-svh w-full grid-cols-1 content-start gap-2 overflow-hidden p-1">
            <Header />

            <div className="grid h-svh grid-cols-[1fr_3fr] gap-2 overflow-hidden">
              <Settings />
              <Main />
            </div>
          </div>
        </ThemeProvider>
      </Provider>
      <Toaster />
    </>
  );
};

export default App;
