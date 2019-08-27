// @flow
import type { Note } from '../lib'
import { NoteSchema, TRASH_BOOK_ID, validateNote } from '../lib'
import test from 'ava'
import Ajv from 'ajv'
const ajv = new Ajv()
let validate

test('check schema', t => {
  validate = ajv.compile(NoteSchema)
  t.is(typeof validate, 'function')
})

test('basic validation', t => {
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
    _rev: '38-636e505958d24f9c21614d95ea03b5a1'
  }
  const valid = validate(data)
  t.is(valid, true)
  t.is(validate.errors, null)
  const valid2 = validateNote(data)
  t.is(valid2, true)
})

test('failure validation', t => {
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
    _rev: '38-636e505958d24f9c21614d95ea03b5a1'
  }
  validateNote(data)
  t.deepEqual(validateNote.errors, [
    {
      dataPath: '._id',
      keyword: 'pattern',
      message: 'should match pattern "^note:"',
      params: {
        pattern: '^note:'
      },
      schemaPath: '#/properties/_id/pattern'
    }
  ])
})

test('trashed note', t => {
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
  t.is(validate.errors, null)
})
