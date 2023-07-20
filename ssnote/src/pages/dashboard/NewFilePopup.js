import React, { useState } from 'react';

function NewFilePopup({ onClose }) {
  const [fileName, setFileName] = useState('');

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleCreateFile = () => {
    // Here, you can implement the logic to create the file with the entered fileName
    // For demonstration purposes, we'll just display the file name in the console.
    console.log('File created with name:', fileName);
    onClose(); // Close the popup after creating the file (you can adjust this behavior based on your requirements)
  };

  return (
    <div className='popup-container'>
      <h2>Create New File</h2>
      <label htmlFor='file-name'>File Name:</label>
      <input
        type='text'
        id='file-name'
        value={fileName}
        onChange={handleFileNameChange}
        placeholder='Enter file name...'
      />

      <button onClick={handleCreateFile}>Create</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default NewFilePopup;
