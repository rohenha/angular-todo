import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["app/**/*.{spec,test}.ts"],
    setupFiles: [
      "@analogjs/vite-plugin-angular/setup-vitest",
      "app/test-setup.ts"
    ],
  },
});