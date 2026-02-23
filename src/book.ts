import type { ValidateFunction } from 'ajv'
import BookSchema from '../json-schema/book.json'
import validator from '../validators/book'

import type { EncryptedData } from './crypto'
import { createDocId } from './utils'
import { validateDocId } from './validator'

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
  order?: number
}
export type Book = BookMetadata & {
  name: string
}
export type EncryptedBook = BookMetadata & {
  encryptedData: EncryptedData
}

export const BOOK_DOCID_PREFIX = 'book:'

const validateBook: ValidateFunction<Book> = validator as any
export { BookSchema, validateBook }

export function createBookId(): string {
  return createDocId(BOOK_DOCID_PREFIX)
}

export function validateBookId(docId: string): boolean {
  return validateDocId(BOOK_DOCID_PREFIX, docId)
}
