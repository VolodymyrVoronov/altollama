import { Provider } from "jotai/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "./providers/theme-provider.tsx";

import App from "./components/App.tsx";
import Header from "./components/Header.tsx";
import Settings from "./components/Settings.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <ThemeProvider>
        <div className="grid-row-[auto_1fr] grid h-svh w-full grid-cols-1 content-start gap-2 overflow-hidden p-1">
          <Header />

          <div className="grid h-svh grid-cols-[1fr_3fr] gap-2 overflow-hidden">
            <Settings />
            <App />
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
