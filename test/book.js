// @flow
import type { Book } from '../lib'
import { BookSchema, validateBook } from '../lib'
import test from 'ava'
import Ajv from 'ajv'
const ajv = new Ajv()
let validate

test('check schema', t => {
  validate = ajv.compile(BookSchema)
  t.is(typeof validate, 'function')
})

test('basic validation', t => {
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
  t.is(valid, true)
  const valid2 = validateBook(data)
  t.is(valid2, true)
})
