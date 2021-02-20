const fs = require('fs')
const chalk = require('chalk')

const fetchNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('./data/notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(err) {
    return []
  }
}

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes)
  fs.writeFileSync('./data/notes.json', notesJSON)
}

const addNote = (title, body) => {
  const notes = fetchNotes()
  const noteExists = notes.find((note) => note.title === title)
  if (noteExists) {
    console.log(chalk.red('Note already exists.'))
  } else {
    const appendedNotes = [ ...notes, { title, body } ]
    saveNotes(appendedNotes)
    console.log(chalk.green(`Note ${title} has been added!`))
  }
}

const removeNote = (title) => {
  const notes = fetchNotes()
  const noteExists = notes.find((note) => note.title === title)
  if (noteExists) {
    const filteredNotes = notes.filter((note) => note.title !== title)
    saveNotes(filteredNotes)
    console.log(chalk.red(`Note ${title} has been deleted.`))
  } else {
    console.log(chalk.red('Note does not exist.'))
  }
}

const listNotes = () => {
  const notes = fetchNotes()
  console.log(chalk.blue('Available Notes:'))
  notes.forEach(({ title }, index) => console.log(chalk.cyan(`${index + 1}. ${title}`)))
}

const readNote = (title) => {
  const notes = fetchNotes()
  const [ noteToRead ] = notes.filter((note) => note.title === title)
  if (!!noteToRead) {
    console.log(chalk.yellow(`Title: ${noteToRead.title}`))
    console.log(chalk.yellow(`Description: ${noteToRead.body}`))
  } else {
    console.log(chalk.red('Note not found!'))
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
}