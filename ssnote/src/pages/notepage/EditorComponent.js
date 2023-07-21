import React, { useEffect, useRef , useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Underline from "@editorjs/underline";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import { db, auth } from "../../firebase";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
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
  const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
  const [pictureUrl, setPictureUrl] = useState('');

  const { noteTitle } = useParams();

  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    // Step 7: Handle click outside the wrapper div to hide the URL input
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
    // Step 2: Toggle the flag when the button is clicked
    setShowUrlInput((prevShowUrlInput) => !prevShowUrlInput);
  };

  const handleClearUrl = () => {
    // Step 8: Clear the URL and hide the input field
    setPictureUrl('');
    setShowUrlInput(false);
  };

  const handlePictureUrlChange = (event) => {
    // Step 4: Update the state with the entered URL
    setPictureUrl(event.target.value);
  };

  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
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
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const handleSaveData = async () => {
    try {
      // Update document to the 'notes' collection in Firestore
      const user = auth.currentUser;
      const userId = user.uid;
      
      const savedData = await ejInstance.current.save(); //data from editorjs
      const userNotesRef = doc(db, "users", userId, "notes", noteTitle);

      console.log("Note saved to Firebase:");
      await updateDoc(userNotesRef,
        {
        "content": savedData
      });
      cheatsheetData = savedData;
    } catch (error) {
      console.error("Error saving note to Firebase:", error);
    }
  };

  return (
    
    <>
      <div className='above-notes'>
      <div className='return-link'>
        <Link to='/dashboard'>
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
            <button onClick={handleClearUrl}>Clear URL</button> {/* Step 9: Add the Clear URL button */}
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
          <img src={pictureUrl} alt="Uploaded" style={{ width: '100%', height: 'auto' }} />
        </div>
      )}

      <div id="editorjs"></div>
      <button onClick={handleSaveData} type="button" className="btn btn-success">
        Save Note
      </button>
    </>
  );
};

export { cheatsheetData };
export default EditorComponent;
