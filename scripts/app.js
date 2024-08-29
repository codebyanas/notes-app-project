// Saved Notes in Local Storage 
const getSavedNotes = () => {
    const dataJSON = localStorage.getItem('notes')

    try {
        if (dataJSON !== null) {
            return JSON.parse(dataJSON)
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}

// Saved Notes
const savedNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// DOM Manipulation
const notesDOM = (note) => {
    const noteEl = document.createElement('a')
    const paraEl = document.createElement('p')
    const edited = document.createElement('p')

    if (note.text.length <= 0) {
        paraEl.textContent = 'Unnammed Note'
    } else {
        paraEl.textContent = note.text
    }

    paraEl.classList.add('box-title')
    // noteEl.appendChild(buttonEl)

    // Link
    noteEl.setAttribute('href', `edit.html#${note.id}`)
    
    noteEl.appendChild(paraEl)
    noteEl.classList.add('box-sub')

    // Last Edited Message
    edited.textContent = updatedNotes(note.updatedAt)
    edited.classList.add('box-edited')
    noteEl.appendChild(edited)

    return noteEl
}

// Sorting Notes 
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) {
                return -1
            } else if (a.updatedAt > b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetically') {
        return notes.sort((a, b) => {
            if (a.text.toLowerCase() < b.text.toLowerCase()) {
                return -1
            } else if (a.text.toLowerCase() > b.text.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// Render Notes
const renderNotes = (notes, filters) => {
    sort = sortNotes(notes, filters.sortBy)
    notesSelector = document.querySelector('#notes')
    const filteredNotes = notes.filter((note) => {
        return note.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesSelector.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = notesDOM(note)
            notesSelector.appendChild(noteEl)
        })
    } else {
        const noMessage = document.createElement('p')
        noMessage.textContent = 'No notes. Add Notes to save your notes...'
        noMessage.classList.add('notes-form')
        notesSelector.appendChild(noMessage)
    }
    
}

// Remove Note
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Updated Notes
const updatedNotes = (timeStamp) => {
    return `Last edited ${moment(timeStamp).fromNow()}`
}