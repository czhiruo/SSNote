import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ConvertButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [orientation, setOrientation] = useState('landscape');
  const [numPages, setNumPages] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConvert = () => {
    // Perform conversion with selected orientation, number of pages, and tags
    console.log('Conversion:', orientation, numPages, selectedTags);
    setShowModal(false);
  };

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
            <Form.Group controlId="formNumPages">
              <Form.Label>Number of Pages:</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={numPages}
                onChange={(e) => setNumPages(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formTags">
              <Form.Label>Tags:</Form.Label>
              <Form.Check
                type="checkbox"
                id="definitionTag"
                label="Definition"
                value="definition"
                checked={selectedTags.includes('definition')}
                onChange={handleTagChange}
              />
              <Form.Check
                type="checkbox"
                id="formulaTag"
                label="Formula"
                value="formula"
                checked={selectedTags.includes('formula')}
                onChange={handleTagChange}
              />
              <Form.Check
                type="checkbox"
                id="theoremTag"
                label="Theorem"
                value="theorem"
                checked={selectedTags.includes('theorem')}
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
