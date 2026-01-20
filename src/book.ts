import type { ValidateFunction } from 'ajv'
import BookSchema from '../json-schema/book.json'
import validator from '../validators/book'

import type { EncryptedData } from './crypto'

export type BookIconInline = {
  type: 'inline'
  svg: string
}
export type BookIconFile = {
  type: 'file'
  docId: string
}
export type BookIcon = BookIconInline | BookIconFile

export type BookMetadata = {
  _id: string
  _rev?: string
  updatedAt: number
  createdAt: number
  count?: number
  parentBookId?: null | string
  migratedBy?: string
  icon?: BookIcon
}
export type Book = BookMetadata & {
  name: string
}
export type EncryptedBook = BookMetadata & {
  encryptedData: EncryptedData
}

const validateBook: ValidateFunction<Book> = validator as any
export { BookSchema, validateBook }
