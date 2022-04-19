export type EncryptionMetadata = {
  algorithm: string
  iv: string
  tag: string
}
export type EncryptedData = EncryptionMetadata & {
  content: string | Buffer
}
