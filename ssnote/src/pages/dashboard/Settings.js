import React, { useState } from 'react';
import Sidebar from './SideBar';
import './styles/Settings.css';
import { Link } from 'react-router-dom';
import LogoutPopup from './LogoutPopup';
import DeleteAccountPopup from './DeleteAccountPopup';

// import LoginPage from './pages/loginpage/LoginPage';

function Settings() {
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);

  const handleLogoutPopupToggle = () => {
    setLogoutPopupOpen((prevIsLogoutPopupOpen) => !prevIsLogoutPopupOpen);
  };

  const handleLogoutConfirm = () => {
    // Perform logout actions here
    console.log("Performing log out actions...");
    handleLogoutPopupToggle(); // Close the pop-up after log out actions
  };

  const [isDeleteAccountPopupOpen, setDeleteAccountPopupOpen] = useState(false);

  const handleDeleteAccountPopupToggle = () => {
    setDeleteAccountPopupOpen((prevIsDeleteAccountPopupOpen) => !prevIsDeleteAccountPopupOpen);
  };

  const handleDeleteAccountConfirm = () => {
    // Perform delete account actions here
    console.log("Performing delete account actions...");
    handleDeleteAccountPopupToggle(); // Close the pop-up after delete account actions
  };

  return (
    <div>
      <Sidebar />
      <div className='settings'>
        <p id='settings-title'>Settings</p>
        <hr />

        <span id='email'>
          <span id='email-text'>
            Email
            {/* <br /> */}
            <span id='curr-email'>
              kristaxyeo@gmail.com
            </span>
          </span>
          <button id='email-button'>
            Change Email
          </button>
        </span>
        <hr className='sub-hr' />

        <span id='password'>
          Password
          <button id='password-button'>
            Change Password
          </button>
        </span>
        <hr className='sub-hr' />

        <button id='logout' onClick={handleLogoutPopupToggle}>
          Log Out
        </button>
        
        {isLogoutPopupOpen && <LogoutPopup onCancel={handleLogoutPopupToggle} onConfirm={handleLogoutConfirm} />}
        
        <button id='delete-account' onClick={handleDeleteAccountPopupToggle}>
          Delete Account
        </button>
        {isDeleteAccountPopupOpen && <DeleteAccountPopup onCancel={handleDeleteAccountPopupToggle} onDelete={handleDeleteAccountConfirm} />}

      </div>
    </div>
  )
}

export default Settings;
