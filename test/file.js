// @flow
import type { File } from '../lib'
import { FileSchema, validateFile, validationErrorsToMessage } from '../lib'
import test from 'ava'
import Ajv from 'ajv'
const ajv = new Ajv({ allowUnionTypes: true })
let validate

test('check schema', t => {
  validate = ajv.compile(FileSchema)
  t.is(typeof validate, 'function')
})

test('basic validation', t => {
  const data: File = {
    createdAt: 1503124076660,
    name: 'Dog.jpg',
    contentType: 'image/jpeg',
    contentLength: 13879,
    publicIn: ['note:Bkl_9Vubx'],
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
  const valid2 = validateFile(data)
  t.is(valid2, true)
})

test('too large image', t => {
  const data: File = {
    createdAt: 1503124076660,
    name: 'Dog.jpg',
    contentType: 'image/jpeg',
    contentLength: 1503124076660,
    publicIn: ['note:Bkl_9Vubx'],
    _attachments: {
      index: {
        digest: 'md5-j+1LGuZoOdF1G5EFuv8+xA==',
        content_type: 'image/jpeg',
        data: 'data',
        length: 1503124076660
      }
    },
    _id: 'file:By8_nQtce',
    _rev: '14-813af5085bb6a2648c3f0aca37fc821f'
  }
  const valid = validate(data)
  t.is(valid, false)
  t.deepEqual(validate.errors, [
    {
      instancePath: '/contentLength',
      keyword: 'maximum',
      message: 'must be <= 10485760',
      params: {
        comparison: '<=',
        limit: 10485760
      },
      schemaPath: '#/properties/contentLength/maximum'
    }
  ])
  const valid2 = validateFile(data)
  t.is(valid2, false)
  t.log(validateFile.errors)
  const errmsg = validationErrorsToMessage(validateFile.errors)
  t.is(errmsg, '"/contentLength" must be <= 10485760')
})
