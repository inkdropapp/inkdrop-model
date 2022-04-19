import type { ValidateFunction } from 'ajv'
import FileSchema from '../json-schema/file.json'
import validator from '../validators/file'
import type { EncryptionMetadata } from './crypto'
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
const validateFile: ValidateFunction<File> = validator
export { FileSchema, validateFile }
