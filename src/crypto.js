// @flow

export type EncryptionMetadata = {
  algorithm: string,
  iv: string,
  tag: string
}

export type EncryptedData = {
  ...$Exact<EncryptionMetadata>,
  content: string | Buffer
}
