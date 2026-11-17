import { defineConfig } from "@usehercules/vite-tanstack";

export default defineConfig({
  vite: {
    server: {
      proxy: {
        "/api": { target: "http://localhost:3001", changeOrigin: true },
      },
    },
  },
});
