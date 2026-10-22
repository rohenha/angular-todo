import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const baseDir = resolve(process.cwd(), ".output");
const assetsDir = resolve(baseDir, "public/assets");

export default {
  async fetch(event) {
    let cssPath = "";
    try {
      const files = readdirSync(assetsDir);
      const cssFile = files.find(f => f.startsWith("entry-client-") && f.endsWith(".css"));
      if (cssFile) {
        cssPath = `/assets/${cssFile}`;
      }
    } catch {
      // ignore
    }

    const cssLink = cssPath ? `<link rel="stylesheet" href="${cssPath}">` : "";
    
    const html = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/nitro.svg" />
    <title>Angular Todo - Nitro + Vite</title>
    ${cssLink}
  </head>
  <body>
    <app-root />
    <script type="module" src="/app/entry-client.ts"></script>
  </body>
</html>`;
    
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }
};