import type { ValidateFunction } from 'ajv'
import NoteSchema from '../json-schema/note.json'
import validator from '../validators/note'
import type { EncryptedData } from './crypto'
export type TrashBookId = 'trash'
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
  timestamp: number
  _conflicts?: string[]
}
export type Note = NoteMetadata & {
  title: string
  body: string
}
export type EncryptedNote = NoteMetadata & {
  encryptedData: EncryptedData
}
export const TRASH_BOOK_ID = 'trash'

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
const validateNote: ValidateFunction<Note> = validator as any
export { NoteSchema, validateNote }
