// @flow
import type { Note } from '../lib'
import { NoteSchema, TRASH_BOOK_ID } from '../lib'
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
  validate(data)
  t.is(validate.errors, null)
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
