// src/DeleteAccountPopup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DeleteAccountPopup = ({ onCancel, onDelete }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span onClick={onCancel} className="close-button">
          &times;
        </span>
        <h2>Confirm Account Deletion</h2>
        <p>Are you sure you want to delete your account?</p>
        <p>This action is <b>irreversible</b>.</p>

        <form>
        <label htmlFor="email">Email</label>
        <br/>
          <input
            type="email"
            id="email-confirm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br/>
          
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password-confirm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </form>

        <br/>

        <div className="popup-actions">
          <button onClick={onCancel}>Cancel</button>
          <Link to='/account-deleted'>
            <button onClick={onDelete} id='confirm-delete'>Delete Account</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;
