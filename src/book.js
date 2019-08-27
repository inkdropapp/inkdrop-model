// @flow
import BookSchema from '../json-schema/book.json'
import validateBook from '../validators/book.js'
import type { EncryptedData } from './crypto'

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

export { BookSchema, validateBook }
