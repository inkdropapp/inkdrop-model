import type { ErrorObject } from 'ajv'

function validationErrorDetail(error: ErrorObject): string {
  const { keyword, params } = error
  if (keyword === 'enum' && Array.isArray(params.allowedValues)) {
    const allowedValues = params.allowedValues
      .map(value => JSON.stringify(value))
      .join(', ')
    return `: ${allowedValues}`
  }
  if (keyword === 'additionalProperties' && params.additionalProperty) {
    return `: ${JSON.stringify(params.additionalProperty)}`
  }
  return ''
}

export function validationErrorsToMessage(errors: ErrorObject[]): string {
  if (errors instanceof Array) {
    return errors
      .map(e => {
        if (typeof e === 'object') {
          const path = e.instancePath ? `"${e.instancePath}" ` : ''
          return `${path}${e.message}${validationErrorDetail(e)}`
        } else {
          return e
        }
      })
      .join(', ')
  } else {
    return errors
  }
}
export class InvalidDataError extends Error {
  name = 'InvalidDataError'
  errors: ErrorObject[]

  constructor(message: string, errors: ErrorObject[]) {
    super(message + ' ' + validationErrorsToMessage(errors))
    this.errors = errors
  }
}

export function validateDocId(prefix: string, docId: string): boolean {
  if (!docId.startsWith(prefix) || docId.length <= 5 || docId.length > 128) {
    throw new Error('Invalid document ID')
  }
  return true
}
