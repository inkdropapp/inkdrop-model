import { isTemplateBookId } from './book'
import type { EncryptedData } from './crypto'
import { createDocId, isValidDocId } from './utils'
export type TrashBookId = 'trash'
export type TemplateBookId = 'template'
export type NoteStatus = 'none' | 'active' | 'onHold' | 'completed' | 'dropped'
export type NoteVisibility = 'private' | 'public'
export type NoteMetadata = {
  _id: string
  _rev?: string
  bookId: string
  doctype: string
  updatedAt: number
  createdAt: number
  tags?: string[]
  numOfTasks?: number
  numOfCheckedTasks?: number
  migratedBy?: string
  status?: NoteStatus
  share?: NoteVisibility
  pinned?: boolean
  sourceTemplateId?: string
  timestamp: number
  _conflicts?: string[]
}
export const NOTE_DOCID_PREFIX = 'note:'
export type Note = NoteMetadata & {
  title: string
  body: string
}
export type EncryptedNote = NoteMetadata & {
  encryptedData: EncryptedData
}

export const NOTE_STATUS: Readonly<{
  NONE: 'none'
  ACTIVE: 'active'
  ON_HOLD: 'onHold'
  COMPLETED: 'completed'
  DROPPED: 'dropped'
}> = {
  NONE: 'none',
  ACTIVE: 'active',
  ON_HOLD: 'onHold',
  COMPLETED: 'completed',
  DROPPED: 'dropped'
}
export const NOTE_VISIBILITY: Readonly<{
  PRIVATE: 'private'
  PUBLIC: 'public'
}> = {
  PRIVATE: 'private',
  PUBLIC: 'public'
}

export const NOTE_TITLE_MAX_LENGTH: number = 256

export function createNoteId(): string {
  return createDocId(NOTE_DOCID_PREFIX)
}

export function validateNoteId(docId: string): boolean {
  return isValidDocId(NOTE_DOCID_PREFIX, docId)
}

/**
 * Whether the document ID belongs to a note, by its `note:` prefix. A cheap
 * check for routing documents by type; use `validateNoteId()` to validate the whole ID.
 */
export function isNoteId(docId: string): boolean {
  return docId.startsWith(NOTE_DOCID_PREFIX)
}

/**
 * Whether the note is an official template bundled with the app. Official
 * templates are never stored in the database, so they have no `_rev`.
 */
export function isOfficialTemplate(
  note: Pick<NoteMetadata, 'bookId' | '_rev'>
): boolean {
  return isTemplateBookId(note.bookId) && !note._rev
}

/**
 * Whether the note is shared publicly. A missing `share` means private; any
 * other value than `'private'`, including `null`, counts as shared.
 */
export function isNoteShared(note: { share?: string | null }): boolean {
  if (typeof note.share === 'undefined') {
    return false
  } else {
    return note.share === NOTE_VISIBILITY.PUBLIC
  }
}
