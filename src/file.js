// @flow

export type File = {
  _id: string,
  _rev?: string,
  name: string,
  createdAt: number,
  contentType: string,
  contentLength: number,
  publicIn: string[],
  _attachments: {
    index: {
      content_type: string,
      data: Buffer | string
    }
  },
  md5digest?: string
}

/*

  _id: Joi.string().required(),
  _rev: Joi.string(),
  name: Joi.string().min(1).required(),
  createdAt: Joi.number().required(),
  contentType: Joi.string(),
  contentLength: Joi.number(),
  publicIn: Joi.array().items(Joi.string()),
  _attachments: Joi.object()
      index: {
        content_type: this.contentType,
        data: buffer.toString('base64')
      }
*/
