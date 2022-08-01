const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Path to database file
const dbPath = path.join(__dirname, '..', 'db', 'db.json');

// Function to retrieve existing notes from db json
function getNotes() {
    // read the content of db json
    const content = fs.readFileSync(dbPath, 'utf-8');

    return JSON.parse(content) || [];


}

// Receives note content & saves it to db
function saveNote(title, text) {

    // gives the note a custom ID using uuid
    const newNote = {
        id: uuid.v4(),
        title,
        text
    }

    // add new note data to db.json

    // retrieve the existing note data
    const notes = getNotes();

    // push new note
    notes.push(newNote);

    // re-save
    fs.writeFileSync(dbPath, JSON.stringify(notes), 'utf-8');

    return newNote;
}

// Takes in note id & deletes it from db
function deleteNote(id) {

    // get the notes
    const notes = getNotes();

    // filter out the note with the given id
    const filtered = notes.filter((note) => note.id !== id);

    // re-save the notes
    fs.writeFileSync(dbPath, JSON.stringify(filtered), 'utf-8');
}

// when directed to /notes, get the previous notes
router.get('/notes', (req, res) => {

    const notes = getNotes();
    res.json(notes);
});

// creates new note
router.post('/notes', (req, res) => {

    const createdNote = saveNote(req.body.title, req.body.text);

    res.json(createdNote)
})

// deletes note based on id
router.delete('/notes/:id', (req, res) => {

    deleteNote(req.params.id);

    res.json({
        data: 'success'
    });

})

// export the router
module.exports = router;