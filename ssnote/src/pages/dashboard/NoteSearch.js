import React, { useState } from "react";
import './styles/SearchBar.css';

const NoteSearch = ({ userNotes, navigate }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNoteClick = (noteTitle) => {
    navigate(`/notebook/${encodeURIComponent(noteTitle)}`);
  };

  // Check if userNotes exists and is an array before using the filter method
  const filteredNotes =
    userNotes && Array.isArray(userNotes)
      ? userNotes.filter((note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  return (
    <div className='search-box'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search notes..."
        className='search-input'
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
