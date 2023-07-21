import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import file1 from "./assets/math-curriculum copy.webp";
import file2 from "./assets/science.banner2 copy.png";
import { FaPlus } from "react-icons/fa"; // Import the FaPlus icon for the plus button
import { db, auth } from "../../firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, setDoc } from "firebase/firestore";

function Home() {
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup

  const user = auth.currentUser;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleTitleChange = (e) => {
    setNewNoteTitle(e.target.value);
  };

  const handleCreateNote = async () => {
    const userId = user.uid;

    // Create a reference to the user's collection of notes
    const userDocRef = doc(db, "users", userId);

    // Create a new note document with a generated ID
    await setDoc(userDocRef, {
      title: newNoteTitle,
      content: "",
    })
      .then(() => {
        console.log("Note successfully created with Title: ", newNoteTitle);
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
        <div className="file">
          <Link to="/file1">
            <img src={file1} alt="file1" />
            <br />

            <span className="file-title">File1</span>
          </Link>
        </div>

        <br />

        <div className="file">
          <Link to="/file2">
            <img src={file2} alt="file2" />
            <br />
            <span className="file-title">File2</span>
          </Link>
        </div>
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
