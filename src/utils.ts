import { nanoid } from 'nanoid'

export function createDocId(prefix: string): string {
  const id = nanoid(8)
  return `${prefix}${id}`
}

/** Whether the document has conflicting revisions left by sync */
export function hasConflicts(doc: { _conflicts?: string[] | null }): boolean {
  return !!doc._conflicts && doc._conflicts.length > 0
}
