// src/LogoutPopup.js
import React from 'react';
import { Link } from 'react-router-dom';

const LogoutPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <span onClick={onCancel} className="close-button">
          &times;
        </span>
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className="popup-actions">
          <button onClick={onCancel}>Cancel</button>
          <Link to='/'>
            <button onClick={onConfirm}>Log Out</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
