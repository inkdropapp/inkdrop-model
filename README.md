Inkdrop Model
==================

Inkdrop data model definitions in json-schema and flowtype

## Install

```sh
npm install inkdrop-model
```

## Usage

### Flowtype

```javascript
import type { Note, Book, Tag, File } from 'inkdrop-model'
```

### Json Schema

You can validate data with json schemas.
Below example uses [ava](https://github.com/avajs/ava) as a validator:

```javascript
import noteSchema from 'inkdrop-model/json-schema/note.json'
import Ajv from 'ajv'
const ajv = new Ajv()
const validate = ajv.compile(noteSchema)

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

