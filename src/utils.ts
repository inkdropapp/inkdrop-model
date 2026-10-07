import { nanoid } from 'nanoid'

export function createDocId(prefix: string): string {
  const id = nanoid(8)
  return `${prefix}${id}`
}

/**
 * Whether the document has conflicting revisions left by sync. Narrows
 * `_conflicts` to `string[]`, so it can be iterated directly.
 */
export function hasConflicts<T extends { _conflicts?: string[] | null }>(
  doc: T
): doc is T & { _conflicts: string[] } {
  return !!doc._conflicts && doc._conflicts.length > 0
}
