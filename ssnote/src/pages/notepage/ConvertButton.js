import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { auth, db } from "../../firebase";
import { getDoc, doc, updateDoc } from "@firebase/firestore";
import "./Note.css";
import { useNavigate } from "react-router-dom";

const ConvertButton = ({ noteTitle, setFilteredData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();

  //convert to cheatsheet
  const handleConvert = async () => {
    const user = auth.currentUser;
    const userId = user.uid;
    const userNotesRef = doc(db, "users", userId, "notes", noteTitle);
    const noteSnapshot = await getDoc(userNotesRef);
    const noteData = noteSnapshot.data().content;

    console.log("Conversion:", selectedTags);
    setShowModal(false);

    let filteredData = {
      blocks: [],
    };

    if (selectedTags.length === 1) {
      // If only one tag is selected, filter the noteData based on that tag
      const tagName = selectedTags[0];
      console.log(tagName);
      if (tagName === "Bold") {
        filteredData = {
          blocks: noteData.blocks.reduce((acc, block) => {
            if (
              block.data.text.includes("<b>") &&
              !block.data.text.includes('<u class="cdx-underline">')
            ) {
              //filters blocks that are bolded
              const text = block.data.text.match(
                /<b>(.*?)<\/b>/ //gets string inside
              )[1];
              acc.push({ text });
            }
            return acc;
          }, []),
        };
      }
      if (tagName === "Underline") {
        filteredData = {
          blocks: noteData.blocks.reduce((acc, block) => {
            if (
              block.data.text.includes('<u class="cdx-underline">') &&
              !block.data.text.includes("<b>")
            ) {
              //filters underlined blocks only
              const text = block.data.text.match(
                /<u class="cdx-underline">(.*?)<\/u>/ //gets string inside
              )[1];
              acc.push({ text });
            }
            return acc;
          }, []),
        };
      }
    } else if (selectedTags.length === 2) {
      // If both bold and underline tags are selected, filter the noteData based on both tags
      const filteredTextSet = new Set(); // Using Set to avoid duplicates
      noteData.blocks.forEach((block) => {
        // Capture bolded text in <b> tags
        const boldRegex = /<b>(.*?)<\/b>/g;
        let boldMatch;
        while ((boldMatch = boldRegex.exec(block.data.text)) !== null) {
          const text = boldMatch[1].replace(/<[^>]+>/g, ""); // Remove any remaining tags
          filteredTextSet.add(text);
        }

        // Capture underlined text in <u class="cdx-underline"> tags
        const underlineRegex = /<u class="cdx-underline">(.*?)<\/u>/g;
        let underlineMatch;
        while (
          (underlineMatch = underlineRegex.exec(block.data.text)) !== null
        ) {
          const text = underlineMatch[1].replace(/<[^>]+>/g, ""); // Remove any remaining tags
          filteredTextSet.add(text);
        }

        // Capture bolded text in <u class="cdx-underline"><b> tags
        const underlineBoldRegex =
          /<u class="cdx-underline"><b>(.*?)<\/b><\/u>/g;
        let underlineBoldMatch;
        while (
          (underlineBoldMatch = underlineBoldRegex.exec(block.data.text)) !==
          null
        ) {
          const text = underlineBoldMatch[1].replace(/<[^>]+>/g, ""); // Remove any remaining tags
          filteredTextSet.add(text);
        }

        // Capture underlined text in <b><u class="cdx-underline"> tags
        const boldUnderlineRegex =
          /<b><u class="cdx-underline">(.*?)<\/u><\/b>/g;
        let boldUnderlineMatch;
        while (
          (boldUnderlineMatch = boldUnderlineRegex.exec(block.data.text)) !==
          null
        ) {
          const text = boldUnderlineMatch[1].replace(/<[^>]+>/g, ""); // Remove any remaining tags
          filteredTextSet.add(text);
        }
      });

      // Convert the Set back to an array
      const filteredTextArray = Array.from(filteredTextSet);

      // Create the filteredData object with the array of filtered texts
      filteredData = {
        blocks: filteredTextArray.map((text) => ({ text })),
      };
    }

    //data is filtered
    console.log("filtering data...", filteredData);
    const userFilteredRef = doc(
      db,
      "users",
      userId,
      "filteredStrings",
      noteTitle
    );
    await updateDoc(userFilteredRef, filteredData);
    setFilteredData(filteredData);
    // navigate(`/filteredData/${noteTitle}`)
  };

  //choose tags
  const handleTagChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTags([...selectedTags, value]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    }
  };

  return (
    <>
      <Button
        type="button"
        id="cheatsheet-convert"
        className="btn-success"
        onClick={() => setShowModal(true)}
      >
        Convert to Cheatsheet
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Convert Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTags">
              <Form.Label>Tags:</Form.Label>
              <Form.Check
                type="checkbox"
                id="boldTag"
                label="Bold"
                value="Bold"
                checked={selectedTags.includes("Bold")}
                onChange={handleTagChange}
              />
              <Form.Check
                type="checkbox"
                id="underlineTag"
                label="Underline"
                value="Underline"
                checked={selectedTags.includes("Underline")}
                onChange={handleTagChange}
              />
              {/* <Form.Check
                type="checkbox"
                id="italicsTag"
                label="Italics"
                value="Italics"
                checked={selectedTags.includes("Italics")}
                onChange={handleTagChange}
              /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConvert}>
            Convert
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConvertButton;
