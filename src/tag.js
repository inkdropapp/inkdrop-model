// @flow
import TagSchema from '../json-schema/tag.json'
import validateTag from '../validators/tag.js'
import type { EncryptedData } from './crypto'

delete TagSchema.id

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

export const TAG_COLOR: $ReadOnly<{ [string]: TagColor }> = {
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
  _id: string,
  _rev?: string,
  count?: number,
  color: TagColor,
  updatedAt: number,
  createdAt: number
}

export type Tag = {
  ...$Exact<TagMetadata>,
  name: string
}

export type EncryptedTag = {
  ...$Exact<TagMetadata>,
  encryptedData: EncryptedData
}

export { TagSchema, validateTag }
