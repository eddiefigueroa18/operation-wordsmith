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
        title: noteTitle.val(),
        text: noteText.val(),
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//Sets the "activeNote" and displays it on the page
const engageNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
    renderActiveNotes();
};

//This will set the "activeNote" to an empty object and allows user to input new notes
const engageNewNoteView = (e) => {
    activeNote = {};
    renderActiveNotes();
};

//Hides and shows the save button 
const engageRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//Render all the list note titles
const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();
    if(window.location.pathname === "/notes") {
        noteList.forEach((el) => (el.innerHTML = ""));
    }
    let noteListItems = [];


//This should return  HTML elements regardless of delete button 
    const createList = (text, delBtn = true) => {
        const listEl = document.createElement("li");
        listEl.classList.add("list-group-item");

        const spanEl = document.createElement("span");
        spanEl.classList.add("list-item-title");
        spanEl.innerText = text;
        spanEl.addEventListener("click", handleNoteView);
        listEl.append(spanEl);

        if (delBtn) {
            const delBtnEl = document.createElement("i");
            delBtnEl.classList.add(
                "fas", 
                "fa-trash-alt", 
                "float-right", 
                "text-danger", 
                "delete-note"
            );
            delBtnEl.addEventListener("click", engageNoteDelete);
            listEl.append(delBtnEl);
        }
        return listEl;
    };

    if(jsonNotes.length === 0) {
        noteListItems.push(createList("No Saved Notes", false));
    }

    jsonNotes.forEach((note) => {
        const li = createList(note.title);
        li.dataset.note = JSON.stringify(note);
        noteListItems.push(li);
    });

    if (window.location.pathname === "/notes") {
        noteListItems.forEach((note) => noteList[0].append(note));
    }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//This acquires notes from the db and then renders them into the sidebar on the page
const acquireAndRenderNotes = () => acquireNotes().then(renderNoteList);

if (window.location.pathname === "/notes") {
    saveNoteBtn.addEventListener("click", engageNoteSave);
    newNoteBtn.addEventListener("click", engageNewNoteView);
    noteTitle.addEventListener("keyup", engageRenderSaveBtn);
    noteText.addEventListener("keyup", engageRenderSaveBtn);
};

acquireAndRenderNotes();