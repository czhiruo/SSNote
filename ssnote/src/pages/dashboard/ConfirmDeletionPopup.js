// src/ConfirmDeletionPopup.js
import React, { useState } from 'react';

const ConfirmDeletionPopup = ({ onCancel, onConfirm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirmDeletion = () => {
    // Perform the deletion confirmation action here
    onConfirm({ email, password });
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span onClick={onCancel} className="close-button">
          &times;
        </span>
        <h2>Confirm Account Deletion</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br/>
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="popup-actions">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={handleConfirmDeletion}>Confirm Deletion</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmDeletionPopup;
