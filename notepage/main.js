import NotesAPI from "./NotesAPI";

NotesAPI.saveNote(
    {
        title: "New Note",
        body: "content..."
    }
)

console.log(NotesAPI.getAllNotes()); 