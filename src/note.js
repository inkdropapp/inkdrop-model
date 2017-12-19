// @flow
export const NoteSchema = require('../json-schema/note.json')

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
  migratedBy?: string,
  status?: NoteStatus,
  share?: NoteVisibility
}
