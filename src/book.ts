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
  /** @deprecated */
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
export const TRASH_BOOK_ID = 'trash'
export const TEMPLATE_BOOK_ID = 'template'

const validateBook: ValidateFunction<Book> = validator as any
export { BookSchema, validateBook }

export function createBookId(): string {
  return createDocId(BOOK_DOCID_PREFIX)
}

export function validateBookId(docId: string): boolean {
  return validateDocId(BOOK_DOCID_PREFIX, docId)
}

/**
 * Whether the document ID belongs to a notebook, by its `book:` prefix. A cheap
 * check for routing documents by type; use `validateBookId()` to validate the whole ID.
 */
export function isBookId(docId: string): boolean {
  return docId.startsWith(BOOK_DOCID_PREFIX)
}

/** Whether the notebook ID is the trash pseudo-notebook */
export function isTrashBookId(bookId: string): boolean {
  return bookId === TRASH_BOOK_ID
}

/** Whether the notebook ID is the template pseudo-notebook */
export function isTemplateBookId(bookId: string): boolean {
  return bookId === TEMPLATE_BOOK_ID
}
