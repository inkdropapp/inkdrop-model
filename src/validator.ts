import type { ErrorObject } from 'ajv'

export function validationErrorsToMessage(errors: ErrorObject[]): string {
  if (errors instanceof Array) {
    return errors
      .map(e => {
        if (typeof e === 'object') {
          return `"${e.instancePath}" ${e.message}`
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
