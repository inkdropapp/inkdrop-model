// @flow
import NoteSchema from '../json-schema/note.json'
import validateNote from '../validators/note.js'
import type { EncryptedData } from './crypto'

export type TrashBookId = 'trash'
export type NoteStatus = 'none' | 'active' | 'onHold' | 'completed' | 'dropped'
export type NoteVisibility = 'private' | 'public'

export type NoteMetadata = {
  _id: string,
  _rev?: string,
  bookId: string,
  doctype: string,
  updatedAt: number,
  createdAt: number,
  tags?: string[],
  numOfTasks?: number,
  numOfCheckedTasks?: number,
  migratedBy?: string,
  status?: NoteStatus,
  share?: NoteVisibility,
  pinned?: boolean,
  _conflicts?: string[]
}

export type Note = {
  ...$Exact<NoteMetadata>,
  title: string,
  body: string
}

export type EncryptedNote = {
  ...$Exact<NoteMetadata>,
  encryptedData: EncryptedData
}

delete NoteSchema.id
export const TRASH_BOOK_ID = 'trash'

export const NOTE_STATUS: $ReadOnly<{ [string]: NoteStatus }> = {
  NONE: 'none',
  ACTIVE: 'active',
  ON_HOLD: 'onHold',
  COMPLETED: 'completed',
  DROPPED: 'dropped'
}
export const NOTE_VISIBILITY: $ReadOnly<{ [string]: NoteVisibility }> = {
  PRIVATE: 'private',
  PUBLIC: 'public'
}

export { NoteSchema, validateNote }
