import type { File } from '../src'
import { FileSchema, validateFile, validationErrorsToMessage } from '../src'
import Ajv from 'ajv'
const ajv = new Ajv({ allowUnionTypes: true })
let validate: any

test('check schema', () => {
  validate = ajv.compile(FileSchema)
  expect(typeof validate).toBe('function')
})

test('basic validation', () => {
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
  expect(valid).toBe(true)
  const valid2 = validateFile(data)
  expect(valid2).toBe(true)
})

test('too large image', () => {
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
  expect(valid).toBe(false)
  expect(validate.errors).toEqual([
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
  expect(valid2).toBe(false)
  const { errors } = validateFile
  expect(typeof errors).toBe('object')
  if (errors) {
    const errmsg = validationErrorsToMessage(errors)
    expect(errmsg).toBe('"/contentLength" must be <= 10485760')
  }
})
