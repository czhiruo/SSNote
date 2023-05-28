export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem(allNotes) || "[]");

        //array is returned
        return notes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {

        const notes = NotesAPI.getAllNotes();

        //for localSptorage and not server
        noteToSave.id = Math.floor(Math.random() * 1000000);
        noteToSave.updated = new Date().toISOString();
        notes.push(noteToSave);

        
        localStorage.setItem("allNotes", JSON.stringify(notes));


    }

    static deleteNote(id) {

    }
}