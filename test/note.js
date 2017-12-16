// @flow
import type { Note } from '../src'
import noteSchema from '../json-schema/note.json'
import test from 'ava'
import Ajv from 'ajv'
const ajv = new Ajv()
let validate

test('check schema', t => {
  validate = ajv.compile(noteSchema)
  t.is(typeof validate, 'function')
})

test('basic validation', t => {
  const data: Note = {
    _id: 'note:BkgOZZUJzf',
    title: 'link',
    doctype: 'markdown',
    updatedAt: 1513330812556,
    createdAt: 1513214207639,
    tags: [ 'tag:a28ca207' ],
    status: 'none',
    share: 'private',
    body: 'markdown note body',
    bookId: 'book:first',
    _rev: '38-636e505958d24f9c21614d95ea03b5a1'
  }
  const valid = validate(data)
  t.is(valid, true)
})
