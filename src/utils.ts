import { nanoid } from 'nanoid'

export function createDocId(prefix: string): string {
  const id = nanoid(8)
  return `${prefix}${id}`
}
