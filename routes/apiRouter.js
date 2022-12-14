//Node Modules
const router = require("express").Router();
const { notes } = require("../db/db.json");
const { createNewNote, deleteNewNote} = require("../lib/notes");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//HTTP METHODS
//get
router.get("/notes", (req, res) => {
    let results = notes;
    res.json(results);
});

//post
router.post("/notes", (req, res) => {
    req.body.id = notes.length.toString();
    let newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

//delete
router.delete("/notes/:id", (req, res) => {
    deleteNewNote(req.params.id, notes);
    res.json(notes);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

module.exports = router;

//THIS RUNS ON HEROKU WHILE THEN THE PUBLIC FOLDER FILES RUN IN THE USERS BROWSER