import { defineConfig } from "@usehercules/vite-tanstack";
import { nitro } from "nitro/vite";

const onVercel = Boolean(process.env.VERCEL) || process.env.NITRO_PRESET === "vercel";

export default defineConfig({
  cloudflare: onVercel ? false : undefined,
  vite: {
    plugins: onVercel ? [nitro({ preset: "vercel" })] : [],
    server: {
      proxy: {
        "/api": { target: "http://localhost:3001", changeOrigin: true },
      },
    },
  },
});