import type { ValidateFunction } from 'ajv'
import bookValidator from '../ajv-validators/book'
import fileValidator from '../ajv-validators/file'
import noteValidator from '../ajv-validators/note'
import tagValidator from '../ajv-validators/tag'
import BookSchema from '../json-schema/book'
import FileSchema from '../json-schema/file'
import NoteSchema from '../json-schema/note'
import TagSchema from '../json-schema/tag'
import type { Book } from './book'
import type { File } from './file'
import type { Note } from './note'
import type { Tag } from './tag'

const validateBook: ValidateFunction<Book> = bookValidator as any
const validateFile: ValidateFunction<File> = fileValidator as any
const validateNote: ValidateFunction<Note> = noteValidator as any
const validateTag: ValidateFunction<Tag> = tagValidator as any

export { BookSchema, FileSchema, NoteSchema, TagSchema }
export { validateBook, validateFile, validateNote, validateTag }
export {
  InvalidDataError,
  validationErrorsToMessage
} from './validation-errors'
