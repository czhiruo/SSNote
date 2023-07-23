import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Underline from "@editorjs/underline";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import { db, auth } from "../../firebase";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

//default note
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

//editor tools

const AlignmentTuneTool = require("editorjs-text-alignment-blocktune");
const ColorPlugin = require("editorjs-text-color-plugin");

let cheatsheetData = "no data";

const EditorComponent = () => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const [initialNoteData, setInitialNoteData] = useState(null);
  const [isSavedMessageVisible, setIsSavedMessageVisible] = useState(false);

  const { noteTitle } = useParams();

  const user = auth.currentUser;
  const userId = user.uid;
  const userNotesRef = doc(db, "users", userId, "notes", noteTitle);

  const fetchNoteData = async () => {
    try {

      // Fetch the note data from Firestore using the noteTitle from the URL params
      const noteSnapshot = await getDoc(userNotesRef);
      const noteData = noteSnapshot.data();
      console.log("fetching data...", noteData.content);

      // If note data exists, set the initial data for the EditorJS instance
      if (noteData && noteData.content !== "") {
        setInitialNoteData(noteData.content);
        setPictureUrl(noteData.coverImage);
        
      }
    } catch (error) {
      console.error("Error fetching note data:", error);
    }
  };

  useEffect(() => {
    // Fetch the note data when the component mounts
    fetchNoteData();
  }, [noteTitle]); // Fetch note data whenever the noteTitle changes (i.e., when a new note is loaded)

  //saved message
  const showSavedMessage = () => {
    setIsSavedMessageVisible(true);

    // Hide the message after 5 seconds
    setTimeout(() => {
      setIsSavedMessageVisible(false);
    }, 5000);
  };

  //display picture
  const wrapperRef = useRef(null);
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowUrlInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleInput = () => {
    setShowUrlInput((prevShowUrlInput) => !prevShowUrlInput);
  };

  const handleClearUrl = () => {
    setPictureUrl(null);
    setShowUrlInput(false);

  };

  const handlePictureUrlChange = async (event) => {
    setPictureUrl(event.target.value);
  };

  const ejInstance = useRef();

  //initialise editor with tools
  const initEditor = () => {
    console.log("starting up...", initialNoteData);
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: initialNoteData !== null ? initialNoteData : DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link", "bold", "underline"],
          shortcut: "CMD+SHIFT+H",
          tunes: ["alignment"],
          config: {
            placeholder: "Enter a header",
            defaultLevel: 1,
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          tunes: ["alignment"],
        },
        list: {
          class: List,
          inlineToolbar: true,
          tunes: ["alignment"],
        },
        underline: {
          class: Underline,
          shortcut: "CMD+U",
        },
        alignment: {
          class: AlignmentTuneTool,
          config: {
            default: "left",
            blocks: {
              header: "center",
              list: "left",
              paragraph: "left",
            },
          },
        },
        highlight: {
          class: ColorPlugin,
          shortcut: "CMD+H",
          config: {
            defaultColor: "#FFBF00",
            type: "marker",
            icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
            customPicker: true,
          },
        },
        color: {
          class: ColorPlugin,
          config: {
            colorCollections: [
              "#EC7878",
              "#9C27B0",
              "#673AB7",
              "#3F51B5",
              "#0070FF",
              "#03A9F4",
              "#00BCD4",
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFF",
            ],
            defaultColor: "#000000",
            type: "text",
            customPicker: true, // add a button to allow selecting any colour
          },
        },
      },
    });
  };

  // This will run only once
  useEffect(() => {
    if (initialNoteData !== null && ejInstance.current === null) {
      initEditor();
      
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [initialNoteData]);

  // Update document to the 'notes' collection in Firestore
  const handleSaveData = async () => {
    try {
      const savedData = await ejInstance.current.save(); //data from editorjs

      console.log("Note saved to Firebase: ", savedData);
      console.log("Cover Image saved: ", pictureUrl)
      await updateDoc(userNotesRef, {
        content: savedData,
        coverImage:pictureUrl
      });
      cheatsheetData = savedData;
      showSavedMessage();
    } catch (error) {
      console.error("Error saving note to Firebase:", error);
    }
  };

  return (
    <>
      <div className="above-notes">
        <div className="return-link">
          <Link to="/dashboard">
            <AiOutlineDoubleLeft />
            Return to Dashboard
          </Link>
        </div>

        {/* Step 3: Render the button or the input field based on the flag */}
        <div ref={wrapperRef}>
          {showUrlInput ? (
            <div>
              <input
                type="text"
                value={pictureUrl}
                onChange={handlePictureUrlChange}
                placeholder="Enter picture URL"
              />
              <button onClick={handleClearUrl}>Clear URL</button>{" "}
              {/* Step 9: Add the Clear URL button */}
            </div>
          ) : (
            <div>
              <button onClick={handleToggleInput}>Insert Cover Image</button>
            </div>
          )}
        </div>
      </div>

      {/* Step 6: Render the uploaded picture */}
      {pictureUrl && (
        <div>
          <img
            src={pictureUrl}
            alt="Uploaded"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}

      <div id="editorjs"></div>

      <hr />

      <button
        onClick={handleSaveData}
        type="button"
        className="btn btn-success"
      >
        Save Note
      </button>
      {isSavedMessageVisible && (
        <div className="saved-message">Note has been saved successfully!</div>
      )}
    </>
  );
};

export { cheatsheetData };
export default EditorComponent;