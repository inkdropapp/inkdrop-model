import type { ErrorObject } from 'ajv'
import type { Note } from '../src'
import {
  InvalidDataError,
  validateNote,
  validationErrorsToMessage
} from '../src'
import { expect, test } from 'vitest'

test('enum error lists the allowed values', () => {
  const errors: ErrorObject[] = [
    {
      instancePath: '/status',
      schemaPath: '#/properties/status/enum',
      keyword: 'enum',
      params: {
        allowedValues: ['none', 'active', 'onHold', 'completed', 'dropped']
      },
      message: 'must be equal to one of the allowed values'
    }
  ]
  expect(validationErrorsToMessage(errors)).toBe(
    '"/status" must be equal to one of the allowed values: "none", "active", "onHold", "completed", "dropped"'
  )
})

test('additionalProperties error names the offending property', () => {
  const errors: ErrorObject[] = [
    {
      instancePath: '',
      schemaPath: '#/additionalProperties',
      keyword: 'additionalProperties',
      params: { additionalProperty: 'foo' },
      message: 'must NOT have additional properties'
    }
  ]
  expect(validationErrorsToMessage(errors)).toBe(
    'must NOT have additional properties: "foo"'
  )
})

test('keeps messages that already inline their params', () => {
  const errors: ErrorObject[] = [
    {
      instancePath: '/contentLength',
      schemaPath: '#/properties/contentLength/maximum',
      keyword: 'maximum',
      params: { comparison: '<=', limit: 10485760 },
      message: 'must be <= 10485760'
    }
  ]
  expect(validationErrorsToMessage(errors)).toBe(
    '"/contentLength" must be <= 10485760'
  )
})

test('omits the quoted path for top-level errors', () => {
  const errors: ErrorObject[] = [
    {
      instancePath: '',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'timestamp' },
      message: "must have required property 'timestamp'"
    }
  ]
  expect(validationErrorsToMessage(errors)).toBe(
    "must have required property 'timestamp'"
  )
})

test('joins multiple errors with a comma', () => {
  const errors: ErrorObject[] = [
    {
      instancePath: '/title',
      schemaPath: '#/properties/title/type',
      keyword: 'type',
      params: { type: 'string' },
      message: 'must be string'
    },
    {
      instancePath: '/status',
      schemaPath: '#/properties/status/enum',
      keyword: 'enum',
      params: { allowedValues: ['none', 'active'] },
      message: 'must be equal to one of the allowed values'
    }
  ]
  expect(validationErrorsToMessage(errors)).toBe(
    '"/title" must be string, "/status" must be equal to one of the allowed values: "none", "active"'
  )
})

test('reports the allowed values for an invalid note status', () => {
  const note = {
    _id: 'note:BkgOZZUJzf',
    title: 'link',
    doctype: 'markdown',
    updatedAt: 1513330812556,
    createdAt: 1513214207639,
    body: 'markdown note body',
    bookId: 'book:first',
    timestamp: 1513330812556,
    status: 'bogus'
  } as unknown as Note

  expect(validateNote(note)).toBe(false)
  const { errors } = validateNote
  expect(errors).toBeTruthy()
  if (errors) {
    expect(validationErrorsToMessage(errors)).toBe(
      '"/status" must be equal to one of the allowed values: "none", "active", "onHold", "completed", "dropped"'
    )
  }
})

test('InvalidDataError appends the formatted errors to its message', () => {
  const errors: ErrorObject[] = [
    {
      instancePath: '/share',
      schemaPath: '#/properties/share/enum',
      keyword: 'enum',
      params: { allowedValues: ['private', 'public'] },
      message: 'must be equal to one of the allowed values'
    }
  ]
  const error = new InvalidDataError('Invalid note:', errors)
  expect(error.message).toBe(
    'Invalid note: "/share" must be equal to one of the allowed values: "private", "public"'
  )
  expect(error.errors).toBe(errors)
})
