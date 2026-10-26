import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import angular from "@analogjs/vite-plugin-angular";

export default defineConfig(({ command }) => ({
  oxc: {},
  plugins: [
    angular({
      tsconfig: "tsconfig.app.json",
      workspaceRoot: process.cwd(),
      // Dev only: fastCompile watches external templates/styles and emits
      // template HMR updates. Production keeps the full AOT + type-check path.
      fastCompile: command === "serve",
      liveReload: command === "serve",
    }),
    nitro(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    watch: {
      usePolling: process.env['CHOKIDAR_USEPOLLING'] === "true",
      interval: 300,
    },
  },
  build: {
    target: "es2022",
  },
  environments: {
    client: {
      build: { rollupOptions: { input: "./app/entry-client.ts" } },
    },
  },
}));
