import type { ValidateFunction } from 'ajv'
import TagSchema from '../json-schema/tag.json'
import validator from '../validators/tag'
import type { EncryptedData } from './crypto'
import { createDocId } from './utils'
import { validateDocId } from './validator'
export type TagColor =
  | 'default'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'olive'
  | 'green'
  | 'teal'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black'
export const TAG_COLOR: Readonly<{
  DEFAULT: 'default'
  RED: 'red'
  ORANGE: 'orange'
  YELLOW: 'yellow'
  OLIVE: 'olive'
  GREEN: 'green'
  TEAL: 'teal'
  BLUE: 'blue'
  VIOLET: 'violet'
  PURPLE: 'purple'
  PINK: 'pink'
  BROWN: 'brown'
  GREY: 'grey'
  BLACK: 'black'
}> = {
  DEFAULT: 'default',
  RED: 'red',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  OLIVE: 'olive',
  GREEN: 'green',
  TEAL: 'teal',
  BLUE: 'blue',
  VIOLET: 'violet',
  PURPLE: 'purple',
  PINK: 'pink',
  BROWN: 'brown',
  GREY: 'grey',
  BLACK: 'black'
}
export type TagMetadata = {
  _id: string
  _rev?: string
  count?: number
  color: TagColor
  updatedAt: number
  createdAt: number
}
export type Tag = TagMetadata & {
  name: string
}
export type EncryptedTag = TagMetadata & {
  encryptedData: EncryptedData
}

export const TAG_DOCID_PREFIX = 'tag:'

const validateTag: ValidateFunction<Tag> = validator as any
export { TagSchema, validateTag }

export function createTagId(): string {
  return createDocId(TAG_DOCID_PREFIX)
}

export function validateTagId(docId: string): boolean {
  return validateDocId(TAG_DOCID_PREFIX, docId)
}
