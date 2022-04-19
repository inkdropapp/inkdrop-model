import type { Tag } from '../lib'
import { TagSchema, validateTag } from '../lib'
import Ajv from 'ajv'

const ajv = new Ajv()
let validate: any

test('check schema', () => {
  validate = ajv.compile(TagSchema)
  expect(typeof validate).toBe('function')
})

test('basic validation', () => {
  const data: Tag = {
    count: 3,
    color: 'green',
    createdAt: 1482130519215,
    updatedAt: 1493014639273,
    name: 'Admin',
    _id: 'tag:0ebd717b-ba17-49f7-a014-c89caea418f3',
    _rev: '5-caf95ffd831665119f6d4f01113cdab4'
  }
  const valid = validate(data)
  expect(valid).toBe(true)
  const valid2 = validateTag(data)
  expect(valid2).toBe(true)
})
