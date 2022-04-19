import type { Book } from '../src'
import { BookSchema, validateBook } from '../src'
import Ajv from 'ajv'
const ajv = new Ajv()
let validate: any

test('check schema', () => {
  validate = ajv.compile(BookSchema)
  expect(typeof validate).toBe('function')
})

test('basic validation', () => {
  const data: Book = {
    updatedAt: 1494489037778,
    createdAt: 1494489037778,
    count: 6,
    parentBookId: null,
    name: 'Blog',
    migratedBy: 'migrateAddingParentBookId',
    _id: 'book:9dc6a7a7-a0e4-4eeb-997c-32b385767dc2',
    _rev: '7-04b06614a08feaab9add6fc2e909148a'
  }
  const valid = validate(data)
  expect(valid).toBe(true)
  const valid2 = validateBook(data)
  expect(valid2).toBe(true)
})
