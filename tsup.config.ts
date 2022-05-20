import alias from "esbuild-plugin-alias";
import path from "path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  minify: true,
  platform: "browser",
  format: ["cjs", "esm"],
  esbuildPlugins: [
    alias({
      stream: path.resolve(
        __dirname,
        `node_modules/stream-browserify/index.js`,
      ),
      "magic-sdk": path.resolve(
        __dirname,
        "node_modules/magic-sdk/dist/cjs/index.js",
      ),
    }),
  ],
});
