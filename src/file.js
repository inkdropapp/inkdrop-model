// @flow
export const FileSchema = require('../json-schema/file.json')

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
