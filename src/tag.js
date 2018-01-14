// @flow
export const TagSchema = require('../json-schema/tag.json')
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

export type TagColor = 'default' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'black'

export type Tag = {
  _id: string,
  _rev?: string,
  name: string,
  count?: number,
  color: TagColor,
  updatedAt: number,
  createdAt: number
}
