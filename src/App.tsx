import { Provider } from "jotai/react";

import { ThemeProvider } from "./providers/theme-provider.tsx";

import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import Settings from "./components/Settings.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const App = () => {
  return (
    <div>
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
    </div>
  );
};

export default App;
