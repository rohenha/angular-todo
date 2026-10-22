import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import angular from "@analogjs/vite-plugin-angular";

export default defineConfig({
  plugins: [
    angular({
      tsconfig: "tsconfig.app.json",
      workspaceRoot: process.cwd(),
    }),
    nitro(),
  ],
  resolve: {
    tsconfigPaths: true
  },
  build: {
    target: "es2022",
  },
  environments: {
    client: {
      build: { rollupOptions: { input: "./app/entry-client.ts" } },
    },
  },
});