import type { Note } from '../lib'
import { NoteSchema, TRASH_BOOK_ID, validateNote } from '../src'
import Ajv from 'ajv'

const ajv = new Ajv()
let validate: any

test('check schema', () => {
  validate = ajv.compile(NoteSchema)
  expect(typeof validate).toBe('function')
})

test('basic validation', () => {
  const data: Note = {
    _id: 'note:BkgOZZUJzf',
    title: 'link',
    doctype: 'markdown',
    updatedAt: 1513330812556,
    createdAt: 1513214207639,
    tags: ['tag:a28ca207'],
    status: 'none',
    share: 'private',
    body: 'markdown note body',
    bookId: 'book:first',
    numOfTasks: 0,
    numOfCheckedTasks: 0,
    pinned: false,
    _rev: '38-636e505958d24f9c21614d95ea03b5a1'
  }
  const valid = validate(data)
  expect(valid).toBe(true)
  expect(validate.errors).toBe(null)
  const valid2 = validateNote(data)
  expect(valid2).toBe(true)
})

test('failure validation', () => {
  const data: Object = {
    _id: 'invalid-note:BkgOZZUJzf',
    title: 0,
    doctype: 'not-markdown',
    updatedAt: 'a',
    createdAt: 'b',
    tags: ['tag:a28ca207'],
    status: 'none',
    share: 'private',
    body: 'markdown note body',
    bookId: 'book:first',
    numOfTasks: 0,
    numOfCheckedTasks: 0,
    pinned: true,
    _rev: '38-636e505958d24f9c21614d95ea03b5a1'
  }
  validateNote(data)
  expect(validateNote.errors).toEqual([
    {
      instancePath: '/_id',
      keyword: 'pattern',
      message: 'must match pattern "^note:"',
      params: {
        pattern: '^note:'
      },
      schemaPath: '#/properties/_id/pattern'
    }
  ])
})

test('trashed note', () => {
  const data: Note = {
    _id: 'note:BkgOZZUJzf',
    title: 'link',
    doctype: 'markdown',
    updatedAt: 1513330812556,
    createdAt: 1513214207639,
    tags: ['tag:a28ca207'],
    status: 'none',
    share: 'private',
    body: 'markdown note body',
    bookId: TRASH_BOOK_ID,
    numOfTasks: 0,
    numOfCheckedTasks: 0,
    _rev: '38-636e505958d24f9c21614d95ea03b5a1'
  }
  validate(data)
  expect(validate.errors).toBe(null)
})
