import path from 'path'
import packageJson from './package.json'
import typescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
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
    external: [
      '../validators/note',
      '../validators/book',
      '../validators/tag',
      '../validators/file'
    ],
    plugins: [json(), typescript(CONFIG_TYPESCRIPT)]
  }
]
