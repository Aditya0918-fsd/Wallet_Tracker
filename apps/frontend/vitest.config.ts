import { defineVitestConfig } from "@usehercules/vite-tanstack/vitest";
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
// ...keep your existing imports

export default defineConfig({
  plugins: [
    // ...keep your existing plugins (tanstackStart, viteReact, etc.)
    nitro({ preset: 'vercel' }),
  ],
})