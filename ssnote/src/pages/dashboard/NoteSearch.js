import React, { useState } from "react";

const NoteSearch = ({ userNotes, navigate }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNoteClick = (noteTitle) => {
    navigate(`/notebook/${encodeURIComponent(noteTitle)}`);
  };

  const filteredNotes = userNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search notes..."
      />
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id} onClick={() => handleNoteClick(note.title)}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteSearch;
