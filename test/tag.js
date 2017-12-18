// @flow
import type { Tag } from '../lib'
import { TagSchema } from '../lib'
import test from 'ava'
import Ajv from 'ajv'
const ajv = new Ajv()
let validate

test('check schema', t => {
  validate = ajv.compile(TagSchema)
  t.is(typeof validate, 'function')
})

test('basic validation', t => {
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
  t.is(valid, true)
})
