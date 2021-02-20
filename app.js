const {
  version,
  command,
  parse,
} = require('yargs')
const {
  addNote,
  removeNote,
  listNotes,
  readNote,
} = require('./note-utils')

version('1.0.0')

command({
  command: 'add',
  description: 'Add a new note',
  builder: {
    title: { describe: 'Note title', demandOption: true, type: 'string' },
    body: { describe: 'Note details', demandOption: true, type: 'string' },
  },
  handler: ({ title, body }) => addNote(title, body)
})

command({
  command: 'remove',
  description: 'Remove existing note',
  builder: { title: { describe: 'Note title', demandOption: true, type: 'string' } },
  handler: ({ title }) => removeNote(title)
})

command({
  command: 'list',
  description: 'List existing notes',
  handler: listNotes,
})

command({
  command: 'read',
  description: 'Read note details',
  builder: { title: { describe: 'Note title', demandOption: true, type: 'string' } },
  handler: ({ title }) => readNote(title)
})

parse()