// @flow
export const TagSchema = require('../json-schema/tag.json')

export type Tag = {
  _id: string,
  _rev?: string,
  name: string,
  count?: number,
  color: 'default' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'black',
  updatedAt: number,
  createdAt: number
}
