import alias from "esbuild-plugin-alias";
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
      stream: `${__dirname}/node_modules/stream-browserify/index.js`,
    }),
  ],
});
