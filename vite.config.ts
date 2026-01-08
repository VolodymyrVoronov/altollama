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
  base: process.env.NODE_ENV === "production" ? "/test/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          jotai: ["jotai"],
          "jotai-tanstack-query": ["jotai-tanstack-query"],
          "date-fns": ["date-fns"],
          dexie: ["dexie"],
          "react-dropzone": ["react-dropzone"],
          "react-virtuoso": ["react-virtuoso"],
          "yet-another-react-lightbox": ["yet-another-react-lightbox"],
          motion: ["motion"],
          sonner: ["sonner"],
        },
      },
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
