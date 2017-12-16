// @flow
import type { File } from '../src'
import fileSchema from '../json-schema/file.json'
import test from 'ava'
import Ajv from 'ajv'
const ajv = new Ajv()
let validate

test('check schema', t => {
  validate = ajv.compile(fileSchema)
  t.is(typeof validate, 'function')
})

test('basic validation', t => {
  const data: File = {
    createdAt: 1503124076660,
    name: 'Dog.jpg',
    contentType: 'image/jpeg',
    contentLength: 13879,
    publicIn: [ 'note:Bkl_9Vubx' ],
    _attachments: {
      index: {
        digest: 'md5-j+1LGuZoOdF1G5EFuv8+xA==',
        content_type: 'image/jpeg',
        data: 'data',
        length: 13879
      }
    },
    _id: 'file:By8_nQtce',
    _rev: '14-813af5085bb6a2648c3f0aca37fc821f'
  }
  const valid = validate(data)
  t.is(valid, true)
})
