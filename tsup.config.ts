import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  format: ["cjs", "esm"],
  env: {
    NODE_ENV: "production",
  },
});
