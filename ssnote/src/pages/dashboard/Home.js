import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import file1 from "./assets/math-curriculum copy.webp";
import { FaPlus } from "react-icons/fa"; // Import the FaPlus icon for the plus button
import { db, auth } from "../../firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home() {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [userNotes, setUserNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup

  const user = auth.currentUser;
  const navigate = useNavigate();

  const fetchUserNotes = async () => {
    try {
      const userId = user.uid;
      const userNotesRef = collection(db, "users", userId, "notes");
      const notesSnapshot = await getDocs(userNotesRef);
      const notesData = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setUserNotes(notesData);
    } catch (error) {
      console.error("Error fetching user notes: ", error);
    }
  };

  useEffect(() => {
    fetchUserNotes();
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

    // Create a new note document with a generated ID
    await setDoc(userNotesRef, {
      title: newNoteTitle,
      content: DEFAULT_INITIAL_DATA,
    })
      .then(() => {
        console.log("Note successfully created with Title: ", newNoteTitle);
        navigate(`/notebook/${encodeURIComponent(newNoteTitle)}`);
      })
      .catch((error) => {
        console.error("Error adding note: ", error);
      });
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
              <img src={file1} alt="file1" />
              <br />
              <span className="file-title">{note.title}</span>
            </Link>
          </div>
        ))}
      </div>

      {/* Plus button */}
      <button id="plus-button" onClick={togglePopup}>
        <FaPlus />
      </button>

      {/* Popup container */}
      {showPopup && (
        <div className="popup-container">
          {/* Add your content/form for creating a new file here */}
          <input
            type="text"
            value={newNoteTitle}
            onChange={handleTitleChange}
            placeholder="Enter Note Title"
          />
          <button id="create-folder" onClick={handleCreateNote}>
            <h3>Create New Note</h3>
          </button>
          <br />
          {/* Add your form or content here */}
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Home;
