import type { ValidateFunction } from 'ajv'
import TagSchema from '../json-schema/tag.json'
import validator from '../validators/tag'
import type { EncryptedData } from './crypto'
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
const validateTag: ValidateFunction<Tag> = validator as any
export { TagSchema, validateTag }
