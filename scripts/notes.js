let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#filter-notes').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#add-notes').addEventListener('submit', (e) => {
    const id = crypto.randomUUID()
    const timeStamp = moment().valueOf()
    e.preventDefault()
    notes.push({
        id: id,
        text: e.target.elements.addNotes.value,
        desc: '',
        createdAt: timeStamp,
        updatedAt: timeStamp
    })
    e.target.elements.addNotes.value = ''
    savedNotes(notes)
    location.assign(`edit.html#${id}`)
})

document.querySelector('#sort-notes').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
    }
    renderNotes(notes, filters)
})