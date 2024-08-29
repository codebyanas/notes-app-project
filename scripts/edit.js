const textEl = document.querySelector('#note-text')
const descEL = document.querySelector('#note-desc')
const removeBtn = document.querySelector('#note-remove')
const updatedEl = document.querySelector('#note-updated')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => {
    return note.id === noteId
})

if (note === undefined) {
    location.assign('index.html')
    console.log('Note id is not defined')
}

textEl.value = note.text
descEL.value = note.desc
updatedEl.textContent = updatedNotes(note.updatedAt)

textEl.addEventListener('input', (e) => {
    note.text = e.target.value
    note.updatedAt = moment().valueOf()
    updatedEl.textContent = updatedNotes(note.updatedAt)
    savedNotes(notes)
})

descEL.addEventListener('input', (e) => {
    note.desc = e.target.value
    note.updatedAt = moment().valueOf()
    updatedEl.textContent = updatedNotes(note.updatedAt)
    savedNotes(notes)
})

removeBtn.addEventListener('click', (e) => {
    removeNote(note.id)
    savedNotes(notes)
    updatedEl.textContent = updatedNotes(note.updatedAt)
    location.assign('index.html')
})

document.querySelector('#home-btn').addEventListener('click', () => {
    location.assign('index.html')
})

document.querySelector('#note-done').addEventListener('click', () => {
    location.assign('index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => {
            return note.id === noteId
        })

        if (note === undefined) {
            location.assign('index.html')
            console.log('Note id is not defined')
        }

        textEl.value = note.text
        descEL.value = note.desc
    }
})
