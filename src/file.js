// @flow
import FileSchema from '../json-schema/file.json'
import validateFile from '../validators/file.js'
import type { EncryptionMetadata } from './crypto'

delete FileSchema.id

export type ImageFileType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/svg+xml'
  | 'image/gif'
  | 'image/heic'
  | 'image/heif'
export const supportedImageFileTypes: ImageFileType[] = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
  'image/gif',
  'image/heic',
  'image/heif'
]
export const SUPPORTED_IMAGE_MIME_TYPES: {
  [string]: ImageFileType
} = {
  ...supportedImageFileTypes.reduce(
    (hash, ft) => ({ ...hash, [ft.split('/')[1]]: ft }),
    {}
  ),
  jpg: 'image/jpeg'
}
export const maxAttachmentFileSize: number = 10 * 1024 * 1024

export type FileAttachmentItem = {
  content_type: ImageFileType,
  data: Buffer | string
}

export type File = {
  _id: string,
  _rev?: string,
  name: string,
  createdAt: number,
  contentType: ImageFileType,
  contentLength: number,
  publicIn: string[],
  _attachments: {
    index: FileAttachmentItem
  },
  md5digest?: string
}

export type EncryptedFile = {
  ...$Exact<File>,
  encryptionData: EncryptionMetadata
}

export { FileSchema, validateFile }
