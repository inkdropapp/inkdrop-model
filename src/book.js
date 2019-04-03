// @flow
import type { EncryptedData } from './crypto'

export const BookSchema = require('../json-schema/book.json')
delete BookSchema.id

export type BookMetadata = {
  _id: string,
  _rev?: string,
  updatedAt: number,
  createdAt: number,
  count?: number,
  parentBookId?: null | string
}

export type Book = BookMetadata & {
  name: string
}

export type EncryptedBook = BookMetadata & {
  encryptedData: EncryptedData
}
