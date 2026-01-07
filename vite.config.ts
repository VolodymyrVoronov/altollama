import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:
    process.env.NODE_ENV === "development"
      ? {
          proxy: {
            "/api-proxy": {
              target: "https://ollama.com",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api-proxy/, ""),
            },
          },
        }
      : undefined,
});
