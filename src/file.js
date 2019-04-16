// @flow
import type { EncryptionMetadata } from './crypto'

export const FileSchema = require('../json-schema/file.json')
delete FileSchema.id

export type ImageFileType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/svg'
  | 'image/gif'
  | 'image/heic'
  | 'image/heif'
export const supportedImageFileTypes: ImageFileType[] = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/svg',
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

export type EncryptedFile = File & {
  encryptionData: EncryptionMetadata
}
