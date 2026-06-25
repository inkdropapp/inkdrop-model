import { defineConfig } from 'tsdown'

/**
 * The `../validators/*` modules are precompiled ajv validators shipped at the
 * package root (see the `validators` entry in `files`). They must stay external
 * so the bundle keeps the `../validators/*` requires and resolves them at
 * runtime — matching the previous Rollup build.
 *
 * `ajv` is a type-only import here (`import type { ErrorObject }`), so it never
 * reaches the JS bundle. Keeping it external also stops the `.d.ts` bundler from
 * inlining ajv's types (and its CommonJS-dts `fast-uri` dependency), emitting a
 * plain `import { ErrorObject } from 'ajv'` like the previous build did.
 */
const external = [/^\.\.\/validators\//, /^ajv(\/|$)/]

const base = {
  entry: ['src/index.ts'],
  outDir: 'lib',
  // Each config writes distinct filenames into the shared `lib/` dir, so cleaning
  // is done once by the `build:lib` script (`rm -rf lib`) instead of per config.
  clean: false,
  external
}

export default defineConfig([
  // CommonJS (package.json `main`) + the single bundled type declaration file.
  {
    ...base,
    format: ['cjs'],
    platform: 'node',
    dts: true,
    sourcemap: true,
    outExtensions: () => ({ js: '.js' })
  },
  // ESM (package.json `module`).
  {
    ...base,
    format: ['esm'],
    platform: 'node',
    dts: false,
    sourcemap: true,
    outExtensions: () => ({ js: '.esm.js' })
  },
  // UMD for CDN / `<script>` usage (package.json `unpkg`), minified.
  {
    ...base,
    format: ['umd'],
    platform: 'node',
    dts: false,
    globalName: 'InkdropModel',
    minify: true
  },
  // Browser / React Native (package.json `browser` / `react-native`). The
  // `browser` resolve condition picks nanoid's browser entry (Web Crypto
  // `crypto.getRandomValues`) over the Node entry's `node:crypto`, which
  // Metro/React Native cannot bundle. `platform: 'browser'` alone does not add
  // `browser` to the export conditions, so it is set explicitly.
  {
    ...base,
    format: ['cjs'],
    platform: 'browser',
    dts: false,
    sourcemap: true,
    inputOptions: {
      resolve: {
        conditionNames: ['browser', 'import', 'require', 'default']
      }
    },
    outExtensions: () => ({ js: '.browser.js' })
  }
])
