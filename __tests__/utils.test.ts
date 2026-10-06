import { expect, test } from 'vitest'

import { hasConflicts, isBookId, isFileId, isNoteId, isTagId } from '../src'

test('document ID type checks', () => {
  expect(isNoteId('note:BkgOZZUJzf')).toBe(true)
  expect(isNoteId('book:first')).toBe(false)
  expect(isBookId('book:first')).toBe(true)
  expect(isBookId('note:BkgOZZUJzf')).toBe(false)
  expect(isTagId('tag:a28ca207')).toBe(true)
  expect(isTagId('notetag:a28ca207')).toBe(false)
  expect(isFileId('file:Sy3Nx2Ue')).toBe(true)
  expect(isFileId('file')).toBe(false)
})

test('hasConflicts', () => {
  expect(hasConflicts({ _conflicts: ['2-abc'] })).toBe(true)
  expect(hasConflicts({ _conflicts: [] })).toBe(false)
  expect(hasConflicts({ _conflicts: null })).toBe(false)
  expect(hasConflicts({})).toBe(false)
})
