import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import file1 from "./assets/Screenshot.png";
import { FaPlus } from "react-icons/fa"; // Import the FaPlus icon for the plus button
import { db, auth } from "../../firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

function Home({navigate, fetchUserNotes, userNotes}) {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup

  const user = auth.currentUser;

  const [showFileMenu, setShowFileMenu] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

  const handleFileMenuClose = () => {
    setSelectedNote(null);
  };

  const handleFileDelete = async () => {
    if (!selectedNote) return;

    const userId = user.uid;
    const noteId = selectedNote.id;

    try {
      const userNoteRef = doc(db, "users", userId, "notes", noteId);
      const userFilterRef = doc(db, "users", userId, "filteredStrings", noteId);
      await deleteDoc(userNoteRef);
      await deleteDoc(userFilterRef);

      console.log("Note deleted successfully.");
      handleFileMenuClose();

      // After deleting the note, refresh the page to update the list of notes
      fetchUserNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleFileMenuToggle = (note, event) => {
    if (showFileMenu && selectedNote && selectedNote.id === note.id) {
      // If the same button is clicked again, close the menu
      handleFileMenuClose();
    } else {
      // Otherwise, open the menu
      setSelectedNote(note);
      console.log(note.id);
      const buttonRect = event.target.getBoundingClientRect();
      setPopupPosition({ left: buttonRect.right, top: buttonRect.bottom });
      setShowFileMenu(true);
    }
  };

  useEffect(() => {
    fetchUserNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "Title",
          level: 1,
        },
      },
    ],
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleTitleChange = (e) => {
    setNewNoteTitle(e.target.value);
  };

  const handleCreateNote = async () => {
    const userId = user.uid;

    // Create a reference to the user's collection of notes
    const userNotesRef = doc(db, "users", userId, "notes", newNoteTitle);
    const userFilterRef = doc(db, "users", userId, "filteredStrings", newNoteTitle)

    // Create a new note document with a generated ID
    await setDoc(userNotesRef, {
      title: newNoteTitle,
      coverImage: null,
      content: DEFAULT_INITIAL_DATA,
    })
      .then(() => {
        console.log("Note successfully created with Title: ", newNoteTitle);
        navigate(`/notebook/${encodeURIComponent(newNoteTitle)}`);
      })
      .catch((error) => {
        console.error("Error adding note: ", error);
      });
    
    await setDoc(userFilterRef, {
      created: true
    })
      .then(() => {
      })
      .catch((error) => {
        console.error("Error creating filtered data collection: ", error);
      });
  };

  const retrieveCoverImage = (note) => {
    console.log(note);
    return note.coverImage ? note.coverImage : file1;
  };

  return (
    <div className="home">
      <p id="dashboard-title">Dashboard</p>
      <hr />
      <div className="files">
        {/* Step 3: Dynamically render the list of files based on the user's notes data */}
        {userNotes.map((note) => (
          <div className="file" key={note.id}>
            <Link to={`/notebook/${encodeURIComponent(note.title)}`}>
              {/* You can also use different images for each file if available */}
              <img src={retrieveCoverImage(note)} alt="coverImage" />
              <br />
              <span className="file-title">{note.title}</span>
            </Link>
            <button
              className="file-menu-button"
              onClick={(event) => handleFileMenuToggle(note, event)}
            >
              <BsThreeDotsVertical />
            </button>
          </div>
        ))}
      </div>

      {/* Plus button */}
      <button id="plus-button" onClick={togglePopup}>
        <FaPlus />
      </button>

      {/* Popup container */}
      {selectedNote && (
        <div className="popup-container">
          <p>{selectedNote.title}</p>
          <button className="file-delete-button" onClick={handleFileDelete}>
            Delete Note
          </button>
          <button className="file-close-button" onClick={handleFileMenuClose}>
            {" "}
            <AiOutlineClose /> Close
          </button>{" "}
          {/* Close button */}
        </div>
      )}

      {showPopup && (
        <div className="popup-container">
          {/* Add your content/form for creating a new file here */}
          <input
            type="text"
            value={newNoteTitle}
            onChange={handleTitleChange}
            placeholder="Enter Note Title"
          />
          <br />
          <button id="create-folder" onClick={handleCreateNote}>
            <p>Create New Note</p>
          </button>
          {/* <br /> */}
          {/* Add your form or content here */}
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Home;
