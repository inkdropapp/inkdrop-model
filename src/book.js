// @flow

export type Book = {
  _id: string,
  _rev?: string,
  name: string,
  updatedAt: number,
  createdAt: number,
  count?: number,
  parentBookId?: null|string
}
