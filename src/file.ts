import type { EncryptionMetadata } from './crypto'
import { createDocId, isValidDocId } from './utils'
export type ImageFileType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/svg+xml'
  | 'image/gif'
  | 'image/heic'
  | 'image/heif'
export const supportedImageFileTypes: ReadonlyArray<ImageFileType> = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
  'image/gif',
  'image/heic',
  'image/heif'
]
export const SUPPORTED_IMAGE_MIME_TYPES: {
  readonly [mime: string]: ImageFileType
} = {
  ...supportedImageFileTypes.reduce(
    (hash, ft) => ({ ...hash, [ft.split('/')[1]]: ft }),
    {} as Record<string, ImageFileType>
  ),
  jpg: 'image/jpeg'
}
export const maxAttachmentFileSize: number = 10 * 1024 * 1024
export type FileAttachmentItem = {
  digest?: string
  content_type: ImageFileType
  data: Buffer | string
  length?: number
}
export type File = {
  _id: string
  _rev?: string
  name: string
  createdAt: number
  contentType: ImageFileType
  contentLength: number
  publicIn: string[]
  _attachments: {
    index: FileAttachmentItem
  }
  md5digest?: string
}
export type EncryptedFile = File & {
  encryptionData: EncryptionMetadata
}

export const FILE_DOCID_PREFIX = 'file:'

export function createFileId(): string {
  return createDocId(FILE_DOCID_PREFIX)
}

export function validateFileId(docId: string): boolean {
  return isValidDocId(FILE_DOCID_PREFIX, docId)
}

/**
 * Whether the document ID belongs to a file, by its `file:` prefix. A cheap
 * check for routing documents by type; use `validateFileId()` to validate the whole ID.
 */
export function isFileId(docId: string): boolean {
  return docId.startsWith(FILE_DOCID_PREFIX)
}
