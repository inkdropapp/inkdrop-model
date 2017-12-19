// @flow
export const TagSchema = require('../json-schema/tag.json')

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
