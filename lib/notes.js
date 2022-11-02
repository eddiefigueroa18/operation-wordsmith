//Node Modules
const fs = require("fs");
const path = require("path");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//CREATE NOTES FUNCTION
function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    //write the data into the "db.json" file
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), 
    JSON.stringify({notes: notesArray}, null, 2));
    return newNote;
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//DELETE NOTES FUNCTION
function deleteNewNote(id, notesArray) {
    const deleteNote = parseInt(id);
    notesArray.splice(deleteNote, 1);
    console.log(notesArray);
    //Loop for re-writing indices for the remaining notes.
    for (let i = deleteNote; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    };

    fs.writeFileSync(path.join(__dirname, "../db/db.json"),
    JSON.stringify({notes: notesArray}, null, 2), err => {
            if (err) {
                throw err;
            }
        });
};

module.exports = {
    createNewNote,
    deleteNewNote
};