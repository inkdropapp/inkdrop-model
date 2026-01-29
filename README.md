# Inkdrop Model

Inkdrop data model definitions in json-schema and TypeScript

## Documentations

Human readable definitions are [here](https://github.com/inkdropapp/inkdrop-model/tree/master/docs/schema.md).

## Install

```sh
npm install inkdrop-model
```

## Models

- **Note** - A markdown document with title, body, status, tags, and visibility settings
- **Book** - A notebook for organizing notes, with support for nesting and custom icons
- **Tag** - A label for categorizing notes, with customizable colors
- **File** - An image attachment that can be embedded in notes

## Usage

### TypeScript

```typescript
import type { Note, Book, Tag, File } from 'inkdrop-model'
```

### Json Schema

```javascript
import { NoteSchema, BookSchema, TagSchema, FileSchema } from 'inkdrop-model'
```

You can validate data with json schemas.
Below example uses [ajv](https://github.com/epoberezkin/ajv) as a validator:

```javascript
import { NoteSchema } from 'inkdrop-model'
import Ajv from 'ajv'
const ajv = new Ajv()
const validate = ajv.compile(NoteSchema)

const data = {
  _id: 'note:BkgOZZUJzf',
  title: 'link',
  doctype: 'markdown',
  updatedAt: 1513330812556,
  createdAt: 1513214207639,
  tags: [],
  status: 'none',
  share: 'private',
  body: 'markdown note body',
  bookId: 'book:first',
  _rev: '38-636e505958d24f9c21614d95ea03b5a1'
}
const valid = validate(data)
console.log(valid) // => true
```
