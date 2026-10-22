import { defineConfig } from "nitro";

export default defineConfig({
  serverDir: "./server",
  routeRules: {
    "/api/**": { cors: true },
    "/assets/**": { static: true },
  },
  compatibilityDate: "2024-10-22",
  renderer: {
    handler: "./server/renderer.ts",
  },
});