// @flow
export const FileSchema = require('../json-schema/file.json')
export const SUPPORTED_FILE_CONTENT_TYPES = {
  IMAGE_PNG: 'image/png',
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_JPG: 'image/jpg',
  IMAGE_SVG: 'image/svg',
  IMAGE_GIF: 'image/gif'
}

export type FileAttachmentItem = {
  content_type: string,
  data: Buffer | string
}

export type File = {
  _id: string,
  _rev?: string,
  name: string,
  createdAt: number,
  contentType: string,
  contentLength: number,
  publicIn: string[],
  _attachments: {
    index: FileAttachmentItem
  },
  md5digest?: string
}
