//Allowed variables
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;
let activeNote = {};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//Define Variables by query selecting from html file
if (window.location.pathname === "/notes") {
    noteTitle = document.querySelector(".note-title");
    noteText = document.querySelector(".note-textarea");
    saveNoteBtn = document.querySelector(".save-note");
    newNoteBtn = document.querySelector(".new-note");
    noteList = document.querySelector(".list-container .list-group");
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++/

//FETCH
//Function that retrieves all the notes from the db
const acquireNotes = () => 
    fetch("/api/notes", {
        method: "GET",
        headers: { "Content-Type": "application.json",
        },
    });

//Function that saves notes to the db
const saveNotes = (note) => 
    fetch("/api/notes", {
        method: "POST",
        headers: {"Content-Type": "application/json",
        },
    });

//Function that deletes notes from the db
const deleteNotes = (id) => 
    fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
        }   
    });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//RENDER
//If there are Active notes then display them, else, render them empty inputs
const renderActiveNotes = () => {
    HTMLVideoElement(saveNoteBtn);
    if (activeNote.id) {
        noteTitle.setAttribute("readonly", true);
        noteText.setAttribute("readonly", true);
        noteTitle.value = activeNote.title;
        noteText.value = activeNote.text;
    } else {
        noteTitle.removeAttribute("readonly");
        noteText.removeAttribute("readonly");
        noteTitle.value = "";
        noteText.value = "";
    }
};

//Acquires note data from the inputs, saves it to the db and updates the view output
const engageNoteSave = function () {
    const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val(),
    };
    saveNote(newNote).then(() => {
        acquireAndRenderNotes();
        renderActiveNotes()
    });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//Deletes selected note
const engageNoteDelete = (e) => {
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

    if(activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNotes(noteId).then(() => {
        acquireAndRenderNotes();
        renderActiveNotes();
    });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//Sets the "activeNote" and displays it on the page
const engageNewNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
    renderActiveNotes();
};

