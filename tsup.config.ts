import alias from "esbuild-plugin-alias";
import path from "path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  minify: true,
  platform: "browser",
  replaceNodeEnv: true,
  shims: true,
  treeshake: true,
  format: ["cjs", "esm"],
  // inject globals onto window if required
  banner: {
    js: '!function(o){o&&(void 0===o.global&&(o.global=o),void 0===o.globalThis&&(o.globalThis=o),void 0===o.process&&(o.process={env:{NODE_ENV:"production"}}))}("undefined"!=typeof window?window:void 0);',
  },
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
