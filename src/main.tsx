import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai/react";

import App from "./App.tsx";
import Header from "./components/Header.tsx";
import Settings from "./components/Settings.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <div className="grid-row-[auto_1fr] grid h-svh w-full grid-cols-1 content-start gap-2 overflow-hidden p-1">
        <Header />

        <div className="grid h-svh grid-cols-[250px_1fr] gap-2 overflow-hidden">
          <Settings />
          <App />
        </div>
      </div>
    </Provider>
  </StrictMode>,
);
