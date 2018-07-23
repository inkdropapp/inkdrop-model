// @flow
export const NoteSchema = require('../json-schema/note.json')
export const TRASH_BOOK_ID = 'trash'
export const NOTE_STATUS = {
  NONE: 'none',
  ACTIVE: 'active',
  ON_HOLD: 'onHold',
  COMPLETED: 'completed',
  DROPPED: 'dropped'
}
export const NOTE_VISIBILITY = {
  PRIVATE: 'private',
  PUBLIC: 'public'
}

export type NoteStatus = 'none' | 'active' | 'onHold' | 'completed' | 'dropped'
export type NoteVisibility = 'private' | 'public'

export type Note = {
  _id: string,
  _rev?: string,
  bookId: string,
  title: string,
  doctype: string,
  body: string,
  updatedAt: number,
  createdAt: number,
  tags?: string[],
  numOfTasks?: number,
  numOfCompletedTasks?: number,
  migratedBy?: string,
  status?: NoteStatus,
  share?: NoteVisibility
}
