import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { cheatsheetData } from "./EditorComponent";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { db } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";

const ConvertButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [orientation, setOrientation] = useState("landscape");
  const [fontSize, setFontSize] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
  }

  //convert to cheatsheet
  const handleConvert = () => {
    console.log("Conversion:", orientation, fontSize, selectedTags);
    setShowModal(false);

    //getting the data needed only for the cheatsheet
    const filteredData = {
      blocks: cheatsheetData.blocks.reduce((acc, block) => {
        if (block.data.text.includes('<b><u class="cdx-underline">')) { //filters both underline and bold
          const text = block.data.text.match(
            /<b><u class="cdx-underline">(.*?)<\/u><\/b>/ //gets string inside 
          )[1];
          acc.push({ text });
        }
        return acc;
      }, []),
    };
    console.log(filteredData);
    const ref = collection(db, "filteredStrings");
    addDoc(ref, filteredData);
    
    // generating cheatsheet and returning as an output file
    loadFile(
        'tag-example.docx',
        function (error, content) {
          
          if (error) {
            throw error;
          }
          var zip = new PizZip(content);
          var doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });
          doc.setData(filteredData);
          try {
            doc.render();
          } catch (error) {
            function replaceErrors(key, value) {
              if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(function (
                  error,
                  key
                ) {
                  error[key] = value[key];
                  return error;
                },
                {});
              }
              return value;
            }
            console.log(JSON.stringify({ error: error }, replaceErrors));

            if (error.properties && error.properties.errors instanceof Array) {
              const errorMessages = error.properties.errors
                .map(function (error) {
                  return error.properties.explanation;
                })
                .join('\n');
              console.log('errorMessages', errorMessages);
            }
            throw error;
          }
          var out = doc.getZip().generate({
            type: 'blob',
            mimeType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });
          saveAs(out, 'output.docx');
        }
      );
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
        className="btn btn-success"
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
            <Form.Group controlId="formOrientation">
              <Form.Label>Orientation:</Form.Label>
              <Form.Control
                as="select"
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
              >
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFontSize">
              <Form.Label>Font Size:</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </Form.Group>
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
              <Form.Check
                type="checkbox"
                id="formulaTag"
                label="Highligh"
                value="highlight"
                checked={selectedTags.includes('highlight')}
                onChange={handleTagChange}
              />
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
