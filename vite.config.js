import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Determine entry point: use main.js if it exists, otherwise just CSS
const mainJsPath = resolve(__dirname, "src/main.js");
const hasMainJs = existsSync(mainJsPath);

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: hasMainJs ? mainJsPath : resolve(__dirname, "src/css/style.css"),
      output: {
        entryFileNames: "script.min.js",
        assetFileNames: "style.min.css",
      },
    },
    minify: "terser",
    cssMinify: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/html/*",
          dest: "html",
        },
      ],
    }),
  ],
});
