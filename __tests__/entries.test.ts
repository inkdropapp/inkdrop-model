import { createRequire } from 'node:module'
import path from 'node:path'

import { expect, test } from 'vitest'

const require = createRequire(import.meta.url)
const root = path.resolve(__dirname, '..')

function loadedModules(): string[] {
  return Object.keys(require.cache)
}

test('the main entry loads neither ajv nor the precompiled validators', () => {
  const main = require('../lib/index.js')
  expect(typeof main.isNoteId).toBe('function')
  expect(main.validateNote).toBeUndefined()
  expect(main.NoteSchema).toBeUndefined()
  const loaded = loadedModules()
  expect(loaded.some(id => id.includes(`${path.sep}ajv${path.sep}`))).toBe(
    false
  )
  expect(
    loaded.some(id => id.startsWith(path.join(root, 'ajv-validators')))
  ).toBe(false)
})

test('the validators entry exports the validators, schemas and error helpers', () => {
  const validators = require('../lib/validators.js')
  for (const name of [
    'validateNote',
    'validateBook',
    'validateTag',
    'validateFile',
    'validationErrorsToMessage'
  ]) {
    expect(typeof validators[name]).toBe('function')
  }
  expect(typeof validators.InvalidDataError).toBe('function')
  for (const name of ['NoteSchema', 'BookSchema', 'TagSchema', 'FileSchema']) {
    expect(typeof validators[name]).toBe('object')
  }
})
