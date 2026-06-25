import path from 'path'
import packageJson from './package.json'
import typescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import localTypescript from 'typescript'

const CONFIG_TYPESCRIPT = {
  tsconfig: 'tsconfig.json',
  typescript: localTypescript
}

const kebabCaseToPascalCase = (string = '') => {
  return string.replace(/(^\w|-\w)/g, replaceString =>
    replaceString.replace(/-/, '').toUpperCase()
  )
}

const baseName = path.join('lib', 'index')

const external = [
  '../validators/note',
  '../validators/book',
  '../validators/tag',
  '../validators/file'
]

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `${baseName}.js`,
        format: 'cjs',
        strict: true,
        sourcemap: true,
        exports: 'auto'
      },
      {
        file: `${baseName}.esm.js`,
        format: 'esm',
        strict: true,
        sourcemap: true
      },
      {
        file: `${baseName}.umd.js`,
        format: 'umd',
        strict: true,
        sourcemap: false,
        name: kebabCaseToPascalCase(packageJson.name),
        plugins: [terser()]
      }
    ],
    external,
    plugins: [resolve(), json(), typescript(CONFIG_TYPESCRIPT)]
  },
  // Browser / React Native build. Resolves `nanoid` to its browser entry,
  // which uses the Web Crypto `crypto.getRandomValues` API instead of the
  // Node entry's `node:crypto` import. The latter gets inlined into the main
  // bundle and breaks Metro/React Native, which cannot resolve `node:crypto`.
  // Consumed via the `browser`/`react-native` fields in package.json.
  {
    input: 'src/index.ts',
    output: [
      {
        file: `${baseName}.browser.js`,
        format: 'cjs',
        strict: true,
        sourcemap: true,
        exports: 'auto'
      }
    ],
    external,
    plugins: [
      resolve({ browser: true, exportConditions: ['browser'] }),
      json(),
      typescript({
        ...CONFIG_TYPESCRIPT,
        cacheRoot: './node_modules/.cache/rts2-browser',
        tsconfigOverride: {
          compilerOptions: { declaration: false, declarationMap: false }
        }
      })
    ]
  }
]
