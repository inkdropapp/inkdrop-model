// @flow
import type { EncryptedData } from './crypto'

export const TagSchema = require('../json-schema/tag.json')
delete TagSchema.id
export const TAG_COLOR = {
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

export type TagMetadata = {
  _id: string,
  _rev?: string,
  count?: number,
  color: TagColor,
  updatedAt: number,
  createdAt: number
}

export type Tag = TagMetadata & {
  name: string
}

export type EncryptedTag = TagMetadata & {
  encryptedData: EncryptedData
}
