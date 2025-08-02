import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // <- ESSA LINHA é essencial para Electron
  build: {
    outDir: "dist",
  },
});
