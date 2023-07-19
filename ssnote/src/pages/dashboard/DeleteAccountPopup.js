// src/DeleteAccountPopup.js
import React from 'react';

const DeleteAccountPopup = ({ onCancel, onDelete }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <span onClick={onCancel} className="close-button">
          &times;
        </span>
        <h2>Confirm Account Deletion</h2>
        <p>Are you sure you want to delete your account?</p>
        <p>This action is <b>irreversible</b>.</p>
        <div className="popup-actions">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onDelete} id='confirm-delete'>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;
