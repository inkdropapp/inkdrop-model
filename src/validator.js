// @flow

export function validationErrorsToMessage(errors: Object[]): string {
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
  name: string = 'InvalidDataError'
  errors: Array<Object>

  constructor(message: string, errors: Array<Object>) {
    super(message + ' ' + validationErrorsToMessage(errors))
    this.errors = errors
  }
}
