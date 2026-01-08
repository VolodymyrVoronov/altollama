import { Provider } from "jotai/react";
import { lazy, Suspense } from "react";

import { useIsDesktop } from "./hooks/useIsDesktop.ts";
import { ThemeProvider } from "./providers/theme-provider.tsx";

import LoadingScreen from "./components/LoadingScreen.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import WarningDeviceMessage from "./components/WarningDeviceMessage.tsx";

const Header = lazy(() => import("./components/Header.tsx"));
const Main = lazy(() => import("./components/Main.tsx"));
const Settings = lazy(() => import("./components/Settings.tsx"));

const App = () => {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return <WarningDeviceMessage />;
  }

  return (
    <>
      <Provider>
        <ThemeProvider>
          <div className="grid-row-[auto_1fr] grid h-svh w-full grid-cols-1 content-start gap-2 overflow-hidden p-1">
            <Suspense fallback={<LoadingScreen />}>
              <Header />
              <div className="grid h-svh grid-cols-[1fr_3fr] gap-2 overflow-hidden">
                <Settings />
                <Main />
              </div>
            </Suspense>
          </div>
        </ThemeProvider>
      </Provider>
      <Toaster />
    </>
  );
};

export default App;
