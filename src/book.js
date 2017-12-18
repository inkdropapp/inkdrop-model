// @flow
export const BookSchema = require('../json-schema/book.json')

export type Book = {
  _id: string,
  _rev?: string,
  name: string,
  updatedAt: number,
  createdAt: number,
  count?: number,
  parentBookId?: null|string
}
